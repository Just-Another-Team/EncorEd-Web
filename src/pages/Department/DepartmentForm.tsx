import { Button, CircularProgress, Grid, Stack } from "@mui/material"
import DialogMessage from "../../components/DialogMessage"
import { RegisterOptions, useForm } from "react-hook-form";
import IUser from "../../data/IUser";
import ControlledTextField from "../../components/TextFieldControlled/input";
import DropDown from "../../components/DropDown";
import useDepartment from "../../hooks/useDepartment";
import useRole from "../../hooks/useRole";
import { useEffect } from "react";
import IDepartment from "../../data/IDepartment";
import IRole from "../../data/IRole";
import FloorAutoComplete from "./FloorText";
import { useUsers } from "../../hooks/useUsers";
import { useRooms } from "../../hooks/useRooms";

type DepartmentFormProps = {
    title: string;
    selectedDepartment?: IDepartment | undefined;
    onSubmit: (data: IDepartment) => void
    openModal: boolean;
    loading: boolean;
    closeModal: () => void
}

//On Update, replace the values

const DepartmentForm = ({
    title = "Title Form",
    selectedDepartment,
    loading,
    onSubmit,
    openModal,
    closeModal
}: DepartmentFormProps) => {
    const { getDeans } = useUsers()
    const { getFloorSortedByLevel } = useRooms()

    const { control, handleSubmit, reset, setValue } = useForm<IDepartment>({
        defaultValues: {
            DEPT_NAME: null,
            DEPT_DEAN: "",
            DEPT_FLOORSASSIGNED: []
        }
    });

    useEffect(() => {
        if (selectedDepartment) {
            console.log(selectedDepartment)

            const floors = getFloorSortedByLevel().filter(floor => (selectedDepartment?.DEPT_FLOORSASSIGNED as Array<string>).includes(floor.FLR_ID as string))

            setValue('DEPT_NAME', selectedDepartment?.DEPT_NAME)
            setValue('DEPT_DEAN', selectedDepartment?.DEPT_DEAN)
            setValue('DEPT_FLOORSASSIGNED', floors)
        }
    }, [selectedDepartment])

    const submitHandler = (data: IDepartment) => {
        reset()
        onSubmit(data)
    }

    const deans: Array<{ label: string; value: string}> = getDeans().filter(user => selectedDepartment ? (user.DEPT_ID as IDepartment).DEPT_ID === selectedDepartment?.DEPT_ID : true).map(user => ({
        label: user.USER_FULLNAME as string,
        value: user.USER_ID as string
    }))

    return (
        <DialogMessage
        open={openModal}
        PaperProps={{
            component: 'form',
            onSubmit: handleSubmit(submitHandler),
            onReset: () => {
                closeModal()
                reset()
            },
        }}
        maxWidth="md"
        title={title}>
            <DialogMessage.Body>
                { loading ? 
                <Stack
                justifyContent={"center"}
                alignItems={"center"}
                padding={0.5}>
                    <CircularProgress
                    size={"4rem"}/>
                </Stack> :
                <>
                    <ControlledTextField
                    control={control}
                    name="DEPT_NAME"
                    fullWidth
                    variant="standard"
                    label="Department name"
                    rules={{
                        required: "Department name is required"
                    }}/>

                    <DropDown
                    variant="standard"
                    name="DEPT_DEAN"
                    control={control}
                    label="Dean or Officer-In-Charge of the Department"
                    defaultValue={""}
                    fullWidth
                    size="small"
                    rules={undefined}
                    options={deans}/>

                    <FloorAutoComplete
                    name={"DEPT_FLOORSASSIGNED"}
                    control={control}
                    rules={undefined}
                    />
                </>
                }
            </DialogMessage.Body>
            <DialogMessage.Footer>
                <Button
                color="error"
                type="reset">
                    CANCEL
                </Button>
                <Button
                type="submit">
                    SUBMIT
                </Button>
            </DialogMessage.Footer>
        </DialogMessage>
    )
}

export default DepartmentForm