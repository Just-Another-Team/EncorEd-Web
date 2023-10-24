import React, { useEffect } from "react";
import { 
    Box,
    Typography,
    Grid,
    Stack,
    ButtonBase,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import dayjs from 'dayjs'
import { Controller, useForm } from "react-hook-form";
import { viewUser } from "../../../features/profile/profileSlice";

const UsersProfile = () => {
    const usersDispatch = useDispatch()
    const input = window.location.pathname
    const result = input.replace("/dashboard/profile/", "")
    const arr = useSelector(state => state.users.users)
    var val = arr.filter(data => data.userName === result)

    useEffect(()=>{
        usersDispatch(viewUser(...val))
    }, [])

    const user = useSelector(state => (state.profile.data))
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
                    <Box height={256} sx={{backgroundColor: '#A9C5E1'}} />

                    <Box display={"flex"} flexDirection={"column"} marginTop={-14} marginBottom={2} sx={{justifyContent: 'center', alignItems: 'center'}}>
                        <Box sx={{borderRadius: 360}}>
                            <img width={160} height={160} src="/assets/profilepic.png"/>
                        </Box>
                        <Typography variant="h4" fontWeight={700}>{user.firstName} {user.lastName}</Typography>
                    </Box>

                    <Box display={'block'}>
                        <Grid container marginBottom={2} sx={{backgroundColor: '#F6F5FF', borderRadius: 4, padding: 2}}>
                            <Grid item xs={12}>
                                <Typography variant="h6" fontWeight={700} marginBottom={1}>Details</Typography>
                            </Grid>

                            <Grid item xs={6} marginBottom={2}>
                                <Typography variant="body1" fontWeight={700}>Email:</Typography>
                                <Typography variant="body1">{user.id}</Typography>
                            </Grid>
                            
                            <Grid item xs={6} marginBottom={2}>
                                <Typography variant="body1" fontWeight={700}>Joined Date:</Typography>
                                <Typography variant="body1">{dayjs(user.joinDate).format("MMMM D, YYYY")}</Typography>
                            </Grid>

                            {user.institution !== null || user.institution.id !== null && (
                                <Grid item xs={6} marginBottom={2}>
                                    <Typography variant="body1" fontWeight={700}>Institution:</Typography>
                                    <Typography variant="body1">{user.institution}</Typography>
                                </Grid>
                            )}

                            {user.addedBy !== null && (
                                <Grid marginBottom={2}>
                                    <Typography variant="body1" fontWeight={700}>Added By:</Typography>
                                    <Typography variant="body1">{user.addedBy}</Typography>
                                </Grid>
                            )}
                        </Grid>

                        {/* <Grid container marginBottom={2} sx={{backgroundColor: '#F6F5FF', borderRadius: 4, padding: 2}}>
                            <Grid item xs={12}>
                                <Typography variant="h5" fontWeight={700}>Role{roles.data !== 1 && 's'}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <List>
                                    {roles.map((el, ind) => (
                                        <ListItem key={ind}>
                                            <ListItemText
                                            primary={`${el._institutionalRole._name.charAt(0).toUpperCase()}${el._institutionalRole._name.slice(1)}`}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Grid>
                        </Grid> */}
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default UsersProfile