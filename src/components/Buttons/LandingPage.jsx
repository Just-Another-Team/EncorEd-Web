import styled from "@emotion/styled";
import { Button } from "@mui/material";

const LPButton = styled(Button)(props => ({
    'backgroundColor': props.variant === 'contained' && '#FFFFFF',
    'color': props.variant === 'contained' ? '#296EB4' : '#FFFFFF',
    ':hover': {
        'color': props.variant === 'contained' ? "#FFFFFF" : '#296EB4'
    },
    borderColor: props.variant === 'outlined' && '#FFFFFF'
}))

export {LPButton}