import React, { useState, useEffect } from "react";
import { 
    Box,
    Typography,
    Grid,
    Stack,
    ButtonBase,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import dayjs from 'dayjs'
import { Controller, useForm } from "react-hook-form";
import { viewUserRoles, viewUser } from "../../../app/features/profile/profileSlice";
import { useNavigate, useParams } from "react-router-dom";
import { FixMeLater } from "../../../types/FixMeLater";
import { useAppDispatch, useAppSelector } from "../../../app/encored-store-hooks";

const UsersProfile = () => {
    //const { email } = useParams();
    const email = useAppSelector(state => state.target.target)
    const [isLoading, setIsLoading] = useState(true)

    const profile = useAppSelector(state => state.profile)
    const user = useAppSelector(state => state.profile.data)
    const roles = useAppSelector(state => state.profile.roles)
    
    // const val: object = arr.filter((data: FixMeLater) => data.userName === result)
    const userDispatch = useAppDispatch();
    const roleDispatch = useAppDispatch();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)

            try{
                await userDispatch(viewUser(email))
                await roleDispatch(viewUserRoles(email))
            } catch(e){
                console.log(e)
            } finally {
                setIsLoading(false)
                console.log(user)
                console.log(roles)
            }
        }

        fetchData()
    }, [])
    // const user = useAppSelector(state => state.profile.data)
    
    return (
        <>
            <Grid spacing={3} container>
                {isLoading ? (
                    <Typography variant="h4" fontWeight={700}>Loading...</Typography>
                ) : (
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

                            <Grid item xs={6} marginBottom={2}>
                                <Typography variant="body1" fontWeight={700}>Institution:</Typography>
                                <Typography variant="body1">{user.institution}</Typography>
                            </Grid>

                            {user.addedBy !== null && (
                                <Grid marginBottom={2}>
                                    <Typography variant="body1" fontWeight={700}>Added By:</Typography>
                                    <Typography variant="body1">{user.addedBy}</Typography>
                                </Grid>
                            )}
                        </Grid>
                        
                        <Grid container marginBottom={2} sx={{backgroundColor: '#F6F5FF', borderRadius: 4, padding: 2}}>
                            <Grid item xs={12}>
                                <Typography variant="h5" fontWeight={700}>Role</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1">{roles.name}</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                )
                }
            </Grid>
        </>
    )
}

export default UsersProfile