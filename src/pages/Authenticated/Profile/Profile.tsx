import React, { useState } from "react";
import { 
    Box,
    Typography,
    Button,
    TextField,
    Grid,
    Stack,
    ButtonBase,
    ListItem,
    List,
    ListItemText,
    Divider,
    Tabs,
} from "@mui/material";
import dayjs from 'dayjs'
import { Controller, useForm } from "react-hook-form";
// import { updateUser } from "../../../app/features/auth/authSlice";
import { updateLoggedInUser } from "../../../app/features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/encored-store-hooks";
import { FixMeLater } from "../../../types/FixMeLater";

const Profile = () => {
    const [page, setPage] = React.useState(0);

    const handleChange = (event: FixMeLater, newValue: FixMeLater) => {
        setPage(newValue);
    };

    const editUserDispatch = useAppDispatch()

    const navigate = useNavigate()

    const role = useAppSelector(state => state.role)
    const institution = useAppSelector(state => state.institution.data)
    const user = useAppSelector(state => state.authentication.data)

    const [editProfile, setEditProfile] = useState(false)

    const {handleSubmit, reset, control, getValues, setError, formState: {errors}} = useForm({
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            userName: user.userName,
            password: "",
            confirmPassword: ""
        }
    }); 

    const handleEditProfile = (e: FixMeLater) => {
        e.preventDefault()

        setEditProfile(true)
    }

    const submitEdit = (data: FixMeLater) => {
        const {firstName, lastName, userName, email, password} = data

        const input = {
            id: user.email,
            firstName,
            lastName,
            email,
            password
        }

        // WHAT IF SAME EMAIL?
        // editUserDispatch(updateUser(input)).unwrap()
        //     .then(() => {
        //         editUserDispatch(updateLoggedInUser({firstName, lastName, email, password, userName, displayName: `${firstName} ${lastName}`}))
        //         navigate(0)
        //         setEditProfile(false)
        //         reset()
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
    }

    const cancelEdit = (e: FixMeLater) => {
        e.preventDefault()

        reset();

        setEditProfile(false)
    }

    const inputs = [
        {key: 'firstName', label: "First name", type: "text", rows: 0, error: errors.firstName, rules: {required: "First name is required"}},
        {key: 'lastName', label: "Last name", type: "text", rows: 0, error: errors.lastName, rules: {required: "Last name is required"}},
        {key: 'email', label: "Email", type: "email", rows: 0, error: errors.email, rules: {required: "Email is required"}},
        {key: 'userName', label: "Username", type: "text", rows: 0, error: errors.userName, rules: {required: "Username is required"}},
        {key: 'password', label: "New Password", type: "password", rows: 0, error: errors.password},
        {key: 'confirmPassword', label: "Confirm New Password", type: "password", rows: 0, error: errors.confirmPassword, rules: { validate: (value: FixMeLater) => value === getValues('password') || "Passwords does not match." }}, 
    ]

    return(
        <>
            <Grid spacing={3} container>
                <Grid xs={3} item>
                    <Stack gap={1}>
                        <ButtonBase onClick={() => {alert("WIP (Moves to Profile Page)")}} sx={{padding: 1, paddingLeft: 2, border: 1, borderRadius: 2, justifyContent: 'flex-start'}}>
                            <Typography variant="h6" component='h6'>Profile</Typography>
                        </ButtonBase>

                        <ButtonBase onClick={() => {alert("WIP (Moves to Notification Page)")}} sx={{padding: 1, paddingLeft: 2, border: 1, borderRadius: 2, justifyContent: 'flex-start'}}>
                            <Typography variant="h6" component='h6'>Notifications</Typography>
                        </ButtonBase>
                    </Stack>
                </Grid>

                <Grid xs={9} item>
                    {/* Banner Cover */}
                    <Box height={256} sx={{backgroundColor: '#A9C5E1'}} /> {/* onChange={setPage} */}

                    <Box display={"flex"} flexDirection={"column"} marginTop={-14} marginBottom={2} sx={{justifyContent: 'center', alignItems: 'center'}}>
                        <Box sx={{borderRadius: 360}}>
                            <img width={160} height={160} src="/assets/profilepic.png"/>
                        </Box>
                        <Typography variant="h4" fontWeight={700}>{`${user?.firstName} ${user?.lastName}`}</Typography>
                    </Box>

                    <Box display={editProfile ? 'none' : 'block'}>
                        <Grid container marginBottom={2} sx={{backgroundColor: '#F6F5FF', borderRadius: 4, padding: 2}}>
                            <Grid item xs={12}>
                                <Typography variant="h6" fontWeight={700} marginBottom={1}>Details</Typography>
                            </Grid>

                            <Grid item xs={6} marginBottom={2}>
                                <Typography variant="body1" fontWeight={700}>Email:</Typography>
                                <Typography variant="body1">{user.email}</Typography>
                            </Grid>
                            
                            <Grid item xs={6} marginBottom={2}>
                                <Typography variant="body1" fontWeight={700}>Joined Date:</Typography>
                                <Typography variant="body1">{dayjs(user.joinDate).format("MMMM D, YYYY")}</Typography>
                            </Grid>


                            {/* {!role.data.find(data => data._systemRole._superAdmin) && (
                                <>
                                    <Grid item xs={6} marginBottom={2}>
                                        <Typography variant="body1" fontWeight={700}>Institution:</Typography>
                                        <Typography variant="body1">{institution.name}</Typography>
                                    </Grid>

                                    <Grid item xs={6} marginBottom={2}>
                                        <Typography variant="body1" fontWeight={700}>Added By:</Typography>
                                        <Typography variant="body1">{user.addedBy}</Typography>
                                    </Grid>
                                </>
                            )} */}

                            <Grid item xs={6} marginBottom={2}>
                                <Typography variant="body1" fontWeight={700}>Username:</Typography>
                                <Typography variant="body1">{user.userName}</Typography>
                            </Grid>
                        </Grid>

                        {/* <Grid container marginBottom={2} sx={{backgroundColor: '#F6F5FF', borderRadius: 4, padding: 2}}>
                            <Grid item xs={12}>
                                <Typography variant="h5" fontWeight={700}>Role: {role.data.status === "Open"}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <List>
                                    {role.data.map((el: FixMeLater, ind: FixMeLater) => (
                                        <ListItem key={ind}>
                                            <ListItemText
                                            primary={`${el._institutionalRole._name.charAt(0).toUpperCase()}${el._institutionalRole._name.slice(1)}`}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Grid>
                        </Grid> */}

                        <Box display={'flex'} flexDirection={"row-reverse"}>
                            <Button onClick={handleEditProfile} variant="contained">EDIT PROFILE</Button>
                        </Box>
                    </Box>

                    {/* And then this is going to another User Form Hook ffs */}
                    <Box display={editProfile ? 'block' : 'none'} paddingX={12}>
                        <Typography variant="h5"  fontWeight={700} marginBottom={2}>Edit User</Typography>
                        
                        {/* <Divider textAlign="left" sx={{marginBottom: 1}}>Details</Divider> */}

                        <Grid component={'form'} onSubmit={handleSubmit(submitEdit)} onReset={cancelEdit} container spacing={2}>

                            {inputs.map((el, ind) => {
                                return(
                                    <Grid item xs={el.key === "firstName" || el.key === "lastName" ? 6 : 12}>
                                        {/* <Controller
                                        name={el.key}
                                        control={control}
                                        rules={{
                                            required: (el.key !== 'password' && el.key !== 'confirmPassword') && `${el.label} is required`,
                                            minLength: el.key === "password" ? {
                                                value: 8,
                                                message: "Password must be 8 characters long"
                                            } : null
                                        }} //-Give each controller the error
                                        render={({field}) => (
                                            <TextField
                                            fullWidth
                                            label={el.label}
                                            type={el.type}
                                            error={el.error ? true : false}
                                            helperText={el.error ? el.error.message : null}
                                            {...field}/>
                                        )}/> */}
                                    </Grid>
                                )
                            })}

                            {/* Assign to Group */}

                            <Grid item xs={12}>
                                <Stack flexDirection={"row-reverse"} gap={2}>
                                    <Button type="reset" variant="contained" color="secondary">CANCEL</Button>
                                    <Button type="submit" variant="contained" color="primary">SUBMIT</Button>
                                </Stack>
                            </Grid>
                        </Grid>

                    </Box>
                </Grid>
                
            </Grid>
        </>
    )
}

export default Profile