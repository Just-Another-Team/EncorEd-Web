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
} from "@mui/material";
import dayjs from 'dayjs'
import { FieldValues, useForm } from "react-hook-form";
// import { updateUser } from "../../../app/features/auth/authSlice";
// import { updateLoggedInUser } from "../../../app/features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/encored-store-hooks";
import { FixMeLater } from "../../../types/FixMeLater";
import FormInputTextField from "../../../components/TextField/FormInputTextField";
import { RegisterFormCredential } from "../../../types/RegisterFormCredential";
import { getUser, register, signIn, updateUser } from "../../../app/features/auth/authSlice";
import { getInstitution } from "../../../app/features/institution/authInstitutionSlice";
import { getAssignedRoles } from "../../../app/features/role/authRoleSlice";
import { auth } from "../../../app/firebase/authentication";
import LoadingDialog from "../../../components/DialogLoading";

const Profile = () => {
    const [page, setPage] = React.useState(0);

    const handleChange = (event: FixMeLater, newValue: FixMeLater) => {
        setPage(newValue);
    };

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const roles = useAppSelector(state => state.assignRole)
    const institution = useAppSelector(state => state.institution)
    const user = useAppSelector(state => state.authentication)

    const [editProfile, setEditProfile] = useState(false)

    const {handleSubmit, reset, control, getValues, setError, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            firstName: user.data.firstName,
            lastName: user.data.lastName,
            email: user.data.email,
            userName: user.data.userName,
            password: "",
            newPassword: "",
            confirmPassword: ""
        }
    }); 

    const handleEditProfile = (e: FixMeLater) => {
        e.preventDefault()

        setEditProfile(true)
    }

    const submitEdit = (data: RegisterFormCredential) => {
        const {firstName, lastName, userName, email, password} = data

        dispatch(updateUser({id: user.data.id, ...data, newPassword: data.newPassword?.trim().length !== 0 ? data.newPassword?.trim() : undefined})).unwrap()
            .then(() => {
                dispatch(getUser(data)).unwrap()
                    .then((dbResult) => {
                        
                        let email = auth.currentUser?.email !== data.email ? data.email : auth.currentUser?.email
                        let password = data.newPassword?.trim().length !== 0 ? data.newPassword?.trim() : data.password

                        return dispatch(signIn({email: email, password: password})).unwrap()
                            .then(() => Promise.resolve(dbResult))
                            .catch((error) => Promise.reject(error))
                    })
                    .then((dbResult) => {
                        //get Institution   
                        return dispatch(getInstitution(dbResult.data.institution)).unwrap()
                            .then(() => Promise.resolve(dbResult))
                            .catch(error => Promise.reject(error))
                    })
                    .then((dbResult) => {
                        //get Roles
                        return dispatch(getAssignedRoles(dbResult.data.id)).unwrap()
                            .then(() => Promise.resolve(dbResult))
                            .catch(error => Promise.reject(error))
                    })
                    .then((dbResult) => {
                        dispatch(register(dbResult))

                        navigate(0)
                        setEditProfile(false)
                        reset()
                    })
                    .catch((error) => Promise.reject(error))
            })
            .catch((error) => {
                console.error(error)
                alert(`Error Occured:\n${error}`)
            })
    }

    const cancelEdit = (e: FixMeLater) => {
        e.preventDefault()

        reset();

        setEditProfile(false)
    }

    const inputs = [
        {key: 'firstName', label: "First name", type: "text", rows: 0,  rules: {required: "First name is required"}},
        {key: 'lastName', label: "Last name", type: "text", rows: 0, rules: {required: "Last name is required"}},
        {key: 'email', label: "Email", type: "email", rows: 0, rules: {required: "Email is required"}},
        {key: 'userName', label: "Username", type: "text", rows: 0, rules: {required: "Username is required"}},
        {key: 'password', label: "Old Password", type: "password", rows: 0, rules: {required: "Password is required"}},
        {key: 'newPassword', label: "New Password", type: "password", rows: 0, rules: {}},
        {key: 'confirmPassword', label: "Confirm New Password", type: "password", rows: 0, error: errors.confirmPassword, rules: { validate: (value: FixMeLater) => value === getValues('newPassword') || "Passwords does not match." }}, 
    ]

    return(
        <>
            <Grid spacing={3} container>
                <Grid xs={3} item>
                    <Stack gap={1}>
                        <ButtonBase
                        onClick={() => {alert("WIP (Moves to Profile Page)")}}
                        sx={{padding: 1, paddingLeft: 2, border: 1, borderRadius: 2, justifyContent: 'flex-start'}}>
                            <Typography variant="h6" component='h6'>Profile</Typography>
                        </ButtonBase>

                        <ButtonBase
                        onClick={() => {alert("WIP (Moves to Notification Page)")}}
                        sx={{padding: 1, paddingLeft: 2, border: 1, borderRadius: 2, justifyContent: 'flex-start'}}>
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
                        <Typography variant="h4" fontWeight={700}>{`${user.data.firstName} ${user.data.lastName}`}</Typography>
                    </Box>

                    <Box display={editProfile ? 'none' : 'block'}>
                        <Grid container marginBottom={2} sx={{backgroundColor: '#F6F5FF', borderRadius: 4, padding: 2}}>
                            <Grid item xs={12}>
                                <Typography variant="h6" fontWeight={700} marginBottom={1}>Details</Typography>
                            </Grid>

                            <Grid item xs={12} marginBottom={2}>
                                <Typography variant="body1" fontWeight={700}>Email:</Typography>
                                <Typography variant="body1">{user.data.email}</Typography>
                            </Grid>
                            
                            <Grid item xs={12} marginBottom={2}>
                                <Typography variant="body1" fontWeight={700}>Joined Date:</Typography>
                                <Typography variant="body1">{dayjs(user.data.joinDate).format("MMMM D, YYYY")}</Typography>
                            </Grid>

                            {roles.data.appAdmin && (
                                <>
                                    <Grid item xs={12} marginBottom={2}>
                                        <Typography variant="body1" fontWeight={700}>Institution:</Typography>
                                        <Typography variant="body1">{institution.data.name}</Typography>
                                    </Grid>

                                    <Grid item xs={12} marginBottom={2}>
                                        <Typography variant="body1" fontWeight={700}>Added By:</Typography>
                                        <Typography variant="body1">{user.data.addedBy}</Typography>
                                    </Grid>
                                </>
                            )}

                            <Grid item xs={12} marginBottom={2}>
                                <Typography variant="body1" fontWeight={700}>Username:</Typography>
                                <Typography variant="body1">{user.data.userName}</Typography>
                            </Grid>
                        </Grid>

                        <Grid container marginBottom={2} sx={{backgroundColor: '#F6F5FF', borderRadius: 4, padding: 2}}>
                            <Grid item xs={12}>
                                <Typography variant="h5" fontWeight={700}>Roles</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <List>
                                    {Array.isArray(roles.data.name) ? 
                                        (roles.data.name as Array<string>).map((name, ind) => (
                                            <ListItem key={ind}>
                                                <ListItemText primary={`${name}`} />
                                            </ListItem>
                                        )) : 
                                        roles.data.name
                                    }
                                </List>
                            </Grid>
                        </Grid>

                        <Box display={'flex'} flexDirection={"row-reverse"}>
                            <Button onClick={handleEditProfile} variant="contained">EDIT PROFILE</Button>
                        </Box>
                    </Box>

                    {/* Update Profile */}
                    {/* TO-DO: Another User Form Hook */}
                    <Box display={editProfile ? 'block' : 'none'} paddingX={12}>
                        <Typography variant="h5"  fontWeight={700} marginBottom={2}>Edit User</Typography>
                        {/* <Divider textAlign="left" sx={{marginBottom: 2}}>Details</Divider> */}
                        <Grid component={'form'} onSubmit={handleSubmit(submitEdit)} onReset={cancelEdit} container spacing={2}>
                            {inputs.map((el, ind) => {
                                return(
                                    <Grid key={el.key} item xs={el.key === "firstName" || el.key === "lastName" ? 6 : 12}>
                                        <FormInputTextField
                                        fullWidth
                                        name={el.key}
                                        control={control}
                                        label={el.label}
                                        rules={el.rules}
                                        type={el.type}/>
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

            <LoadingDialog open={(user.loading || institution.loading || roles.loading)} text={"Please wait until we updated your profile. Thank you"}/>
        </>
    )
}

export default Profile