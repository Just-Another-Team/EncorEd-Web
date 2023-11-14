import React from 'react'
import {Tab, TabProps} from '@mui/material'

const CustomTab = <C extends React.ElementType>(props: TabProps<C, {component: C}>) => {
    return(
        <Tab {...props}>{props.children}</Tab>
    )
}

export default CustomTab