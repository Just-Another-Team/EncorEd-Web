import React, { useEffect } from "react";
import { 
    Box,
    Typography,
    Grid,
    Stack,
    ButtonBase,
} from "@mui/material";
import dayjs from 'dayjs'
import { Controller, useForm } from "react-hook-form";
import { viewUser } from "../../../app/features/profile/profileSlice";
import { useNavigate, useParams } from "react-router-dom";
import { FixMeLater } from "../../../types/FixMeLater";
import { useAppDispatch, useAppSelector } from "../../../app/encored-store-hooks";

const UsersProfile = () => {
    const { email } = useParams();

    const user = useAppSelector(state => state.users.data.find(user => user.id === email))
    // const val: object = arr.filter((data: FixMeLater) => data.userName === result)

    useEffect(() => {
        console.log(user)
        // usersDispatch(viewUser(...val))
    }, [])
   
    // const user = useAppSelector(state => state.profile.data)
    return(
        <>
            <Grid spacing={3} container>
                <Grid xs={9} item>
                    {/* Banner Cover */}
                    <Box height={256} sx={{backgroundColor: '#A9C5E1'}} />

                    <Box display={"flex"} flexDirection={"column"} marginTop={-14} marginBottom={2} sx={{justifyContent: 'center', alignItems: 'center'}}>
                        <Box sx={{borderRadius: 360}}>
                            <img width={160} height={160} src="/assets/profilepic.png"/>
                        </Box>
                        <Typography variant="h4" fontWeight={700}>{user!.firstName} {user?.lastName}</Typography> {/* {user.firstName} {user.lastName} */}
                    </Box>

                    <Box display={'block'}>
                        <Grid container marginBottom={2} sx={{backgroundColor: '#F6F5FF', borderRadius: 4, padding: 2}}>
                            <Grid item xs={12}>
                                <Typography variant="h6" fontWeight={700} marginBottom={1}>Details</Typography>
                            </Grid>

                            <Grid item xs={6} marginBottom={2}>
                                <Typography variant="body1" fontWeight={700}>Email:</Typography>
                                <Typography variant="body1">{user?.id}</Typography> {/*  */}
                            </Grid>
                            
                            <Grid item xs={6} marginBottom={2}>
                                <Typography variant="body1" fontWeight={700}>Joined Date:</Typography>
                                <Typography variant="body1">{dayjs(user?.joinDate).format("MMMM D, YYYY")}</Typography> {/*  */}
                            </Grid>

                            {/* {user.institution !== null || user.institution.id !== null && (
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
                            )} */}
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