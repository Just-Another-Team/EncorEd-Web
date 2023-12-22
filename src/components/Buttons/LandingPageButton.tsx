import { Button, styled } from "@mui/material";


const LandingPagePrimaryButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#FFFFFF',
    color: theme.palette.primary.main,
    ":hover": {
        color: '#FFFFFF',
    },
})) as typeof Button;

const LandingPageSecondaryButton = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    borderColor: "#FFFFFF",
    
    ":hover": {
        color: theme.palette.primary.main,
    },
})) as typeof Button;

export {LandingPagePrimaryButton, LandingPageSecondaryButton};