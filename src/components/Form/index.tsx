import { Grid } from "@mui/material"
import React, { Children } from "react"

type FormType = {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    children: React.ReactNode;
}

const Form = ({
    children,
    onSubmit
}: FormType) => {
    const childrenArray = Children.toArray(children);

    return (
        <Grid
        onSubmit={onSubmit}
        component="form"
        container
        spacing={1}
        noValidate>
            {childrenArray.map((child, index) => (
                <Grid
                key={index}
                item
                xs={12}
                //marginBottom={index === childrenArray.length - 1 ? 0 : 1}
                >
                    {child}
                </Grid>
            ))}
        </Grid>
    )
}

export default Form