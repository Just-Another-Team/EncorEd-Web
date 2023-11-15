import React from "react"
import {
    Box,
    Grid,
    Typography,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { FixMeLater } from "../../../../types/FixMeLater"
import { useAppDispatch, useAppSelector } from "../../../../app/encored-store-hooks"
import { useNavigate } from "react-router-dom"

type SubjectInput = {
    name?: string; 
    edpCode?: string; 
    type?: string; 
    units?: number;
    institution?: string;

    createdBy?: string; 
    //updatedDate
    //updatedBy
    verifiedBy?: string; 
}

const AddRole = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch()
    const loading = useAppSelector(state => state.role.loading)
    const user = useAppSelector(state => state.authentication.data.email)
    const institution = useAppSelector(state => state.institution.data.name)

    const {handleSubmit, reset, control, setValue, formState: {errors}} = useForm<SubjectInput>({
        defaultValues: {
            name: "", 
            edpCode: "", 
            type: "", 
            units: 0,
            institution: institution,
            createdBy: "", 
        }
    })

    const handleInput = (data: FixMeLater) => {
        
    }

    return(
        <>
            <Typography variant="h4" color={"#296EB4"} fontWeight={700} className="mb-2">
                ADD SUBJECT
            </Typography>

            <Box onSubmit={handleSubmit(handleInput)} component="form">
                <Grid container>
                    <Grid xs={12} item className="mb-1">
                        <Typography variant="h6" color={"#296EB4"} fontWeight={700}>Details</Typography>
                    </Grid>
                    {/* {detailsInput.map(el => (
                        el.key !== "type" ?
                        <Grid key={el.key} xs={12} item className="mb-3">
                            <Typography variant={"body1"} className="mb-1">{el.label}</Typography>
                            <FormInputTextField fullWidth name={el.key} rules={el.rules} control={control} rows={el.rows}/>
                        </Grid> :
                        <Grid key={el.key} xs={12} item className="mb-3">
                            <Stack direction="row" alignItems="center">
                                <Typography
                                variant={"body1"}
                                className="mb-1"
                                flex={1}>
                                    {el.label}
                                </Typography>

                                <FormInputDropDown
                                name={el.key}
                                defaultValue=""
                                label={"Choose a role type"}
                                control={control}
                                options={options}
                                rules={el.rules}
                                formControlProps={{flex: 1}}/>
                            </Stack>
                        </Grid>
                    ))} */}
                </Grid>
            </Box>
        </>
    )
}

export default AddRole