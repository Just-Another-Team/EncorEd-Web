import React from 'react'
import {Button, ButtonProps} from '@mui/material'

const LinkButton = <C extends React.ElementType>(props: ButtonProps<C, {component: C}>) => {
    return(
        <Button {...props}>{props.children}</Button>
    )
}

export default LinkButton