import { Box, Grid, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { QRCodeType } from "../../types/QRCodeType"
import DialogForm from "../../components/DialogForm"
import QRCode from "react-qr-code"
import FormInputDropDown from "../../components/DropDown"
import { useRooms } from "../../hooks/useRooms"
import { useSubject } from "../../hooks/useSubject"
import { useUsers } from "../../hooks/useUsers"
import { UserRole } from "../../data/IUser"
import useDepartment from "../../hooks/useDepartment"
import IFloor from "../../data/IFloor"

type AddQRCodeFormType = {
    open: boolean;
    onCancel: () => void;
    onSubmit: (data: QRCodeType) => void;
}

const AddQRCodeForm = ({
    open,
    onCancel,
    onSubmit,
}: AddQRCodeFormType) => {
    const { control, handleSubmit, reset } = useForm<QRCodeType>({
        defaultValues: {
            ROOM_ID: "",
            SUB_ID: "",
        }
    })

    const { getDepartment } = useDepartment()
    const { getCurrentUser } = useUsers()
    const { getClassrooms } = useRooms();
    const { subjects } = useSubject();

    const role = getCurrentUser()?.ROLE_ID as UserRole

    const roomInputs = getClassrooms().map((el): { label: string; value: string; } => ({
        label: el.ROOM_NAME,
        value: el.ROOM_ID!,
    }))

    const filteredRoomInputs = getClassrooms().filter(room => (getDepartment(getCurrentUser()?.DEPT_ID as string)?.DEPT_FLOORSASSIGNED as Array<string>).includes((room.FLR_ID as IFloor).FLR_ID as string)).map((el): { label: string; value: string; } => ({
        label: el.ROOM_NAME,
        value: el.ROOM_ID!,
    }))

    //Select subjects based on the creator
    const subjectInputs = subjects.map((el): { label: string; value: string; } => ({
        label: el.SUB_DESCRIPTION as string,
        value: el.SUB_ID!,
    }))

    const filteredSubjectInputs = subjects.filter(subject => subject.SUB_CREATEDBY === getCurrentUser()?.USER_ID).map((el): { label: string; value: string; } => ({
        label: el.SUB_DESCRIPTION as string,
        value: el.SUB_ID!,
    }))


    return(
        <DialogForm
        open={open}
        onSubmitForm={handleSubmit(onSubmit)}
        onClose={() => {
            reset();
            onCancel();
        }}
        title="Add Room QR Code">
            <Grid
            container
            spacing={2}
            sx={{
                paddingTop: 1
            }}>
                <Grid
                item
                xs={12}
                md={8}>
                    <FormInputDropDown
                    name={"ROOM_ID"}
                    label={"Room"}
                    control={control}
                    rules={{}}
                    fullWidth
                    options={role.admin ? roomInputs : filteredRoomInputs}/>

                    <FormInputDropDown
                    name={"SUB_ID"}
                    label={"Subject"}
                    control={control}
                    rules={{}}
                    fullWidth
                    options={role.admin ? subjectInputs : filteredSubjectInputs}
                    MenuProps={{
                        sx: { height: 296 }
                    }}/>
                </Grid>

                <Grid
                item
                xs={12}
                md={4}>
                    <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center">
                        <Typography
                        variant="h5"
                        fontWeight={700}
                        marginBottom={2}>
                            Generated QR Code
                        </Typography>

                        <QRCode
                        size={256}
                        value={"Hello"}/>
                    </Box>
                </Grid>
            </Grid>
        </DialogForm>
    )
}

export default AddQRCodeForm