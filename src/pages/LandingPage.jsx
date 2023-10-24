import React from "react";

import {
    Container,
    Typography,
    Box,
    Button,
    Stack
} from '@mui/material'
import { LPButton } from "../components/Buttons/LandingPage";

const LandingPage = () => {
    return (
        <Container
        maxWidth="xl"
        disableGutters={true}
        sx={{
            height: "100vh",
            display: "flex",
            padding: 0,
            overflow: "hidden",
            backgroundColor: "#FED485",
            minWidth: "100%",
        }}>
            <Box flex={0.85}>
                {/* Spacer */}
            </Box>
            <Box
            flex={1}
            display={"flex"}
            sx={{
                alignItems: 'center',
                justifyContent: "center",
                backgroundColor: "#45A1FD",
                color: "#FFFFFF"
            }}>
                <Stack sx={{width: "34rem"}} spacing={2}>
                    <Typography fontWeight={700} variant="h3" component="h3">
                        Experience Campus Life like Never Before!
                    </Typography>

                    <Typography variant="p" component="p">
                        EncorEd, the Smart Campus System using Augmented Reality technology, is your ultimate solution to navigating around University of Cebu - Banilad campus conveniently while also improving your security and campus experience. Register now to start experiencing the enhanced campus life that EncorEd has to offer.
                    </Typography>

                    <Typography variant="p" component="p">
                        Register now and experience the ultimate campus life with EncorEd!
                    </Typography>

                    <Stack direction={"row"} spacing={2}>
                        {/* <Button size="large" variant="contained">SIGN IN</Button> */}
                        <LPButton size="large" href="login" variant="contained">SIGN IN</LPButton>
                        <LPButton size="large" href="register/user" variant="outlined">SIGN UP</LPButton>
                    </Stack>
                </Stack>
            </Box>
        </Container>
    )
}

export default LandingPage;