
import { Box, Button, FormControl, FormLabel, PaginationItem } from "@mui/material"
import DialogMessage from "../../components/DialogMessage"
import { useForm } from "react-hook-form";
import TimePickerControlled from "../../components/TimePickerControlled";
import { ArrowForwardOutlined } from "@mui/icons-material";
import DropDown from "../../components/DropDown";
import ControlledTextField from "../../components/TextFieldControlled/input";
import { RoomTypes } from "../../data/RoomType";
import { useRooms } from "../../hooks/useRooms";
import { useEffect } from "react";
import IFloor from "../../data/IFloor";
import { useSubject } from "../../hooks/useSubject";
import IRoom from "../../data/IRoom";
import { useSchedules } from "../../hooks/useSchedules";
import ISchedule from "../../data/ISchedule";

type RoomFormType = {
    openModal: boolean;
    selectedRoom?: IRoom
    closeModal: () => void
    onSubmit: (data: IRoom) => void
}

const RoomForm = ({
    openModal,
    selectedRoom,
    closeModal,
    onSubmit
}: RoomFormType) => {
    const { getSchedule } = useSchedules()
    const { getFloorSortedByLevel } = useRooms()

    const { control, handleSubmit, setValue, watch, reset } = useForm<IRoom>({
        defaultValues: {
            ROOM_NAME: "",
            ROOM_TYPE: null,
            SCHED_ID: undefined,
            FLR_ID: undefined,
        }
    });

    useEffect(() => {
        if (selectedRoom) {
            const schedule = getSchedule(selectedRoom.SCHED_ID !== null ? (selectedRoom.SCHED_ID as ISchedule).SCHED_ID as string : '')

            setValue("ROOM_NAME", selectedRoom.ROOM_NAME)
            setValue("ROOM_TYPE", selectedRoom.ROOM_TYPE ? selectedRoom.ROOM_TYPE : null)
            setValue("SCHED_ID", schedule)
            setValue("FLR_ID", (selectedRoom.FLR_ID as IFloor).FLR_ID!)
        }
    }, [selectedRoom])

    useEffect(() => {
        setValue("SCHED_ID", undefined)
    }, [watch('ROOM_TYPE')])

    const roomTypes = RoomTypes.map((rType) => {
        return ({
            label: rType.toString(),
            value: rType.toString()
        })
    })

    const floorOptions = getFloorSortedByLevel().map((floor) => {
        return ({
            label: floor.FLR_NAME,
            value: floor.FLR_ID!
        })
    })

    const submitHandler = (data: IRoom) => {
        reset()
        onSubmit(data)
    }

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
        title="Add Room">
            <DialogMessage.Body>
                <Box>
                    <ControlledTextField
                    name="ROOM_NAME"
                    control={control}
                    size="small"
                    fullWidth
                    rules={{
                        required: "Room name is required!"
                    }}
                    label="Name"
                    variant="standard"/>
                </Box>

                <Box
                paddingY={1}>
                    <DropDown
                    defaultValue={''}
                    label="Type"
                    name="ROOM_TYPE"
                    control={control}
                    rules={{
                        required: "Choose a room type."
                    }}
                    fullWidth
                    size="small"
                    variant="standard"
                    options={roomTypes}/>
                </Box>

                <Box>
                    {/* If room type is classroom, disable timepicker */}
                    <FormControl
                    fullWidth>
                        <FormLabel component="legend">Schedule</FormLabel>
                        <Box
                        display='flex'
                        paddingY={1}
                        gap={2}
                        alignItems='center'>
                            <TimePickerControlled
                            disabled={watch('ROOM_TYPE') === "Office" ? false : true}
                            name="SCHED_ID.SCHED_STARTTIME"
                            label={"Start Time"}
                            rules={{
                                required: watch('ROOM_TYPE') === "Office" ? "Set a starting hour of the office" : undefined
                            }}
                            fullWidth
                            control={control}/>

                            <ArrowForwardOutlined />

                            <TimePickerControlled
                            disabled={watch('ROOM_TYPE') === "Office" ? false : true}
                            name="SCHED_ID.SCHED_ENDTIME"
                            label={"End Time"}
                            rules={{
                                required: watch('ROOM_TYPE') === "Office" ? "Set an ending hour of the subject" : undefined
                            }}
                            fullWidth
                            control={control}/>
                        </Box>
                    </FormControl>
                </Box>

                <Box
                paddingY={1}>
                    <DropDown
                    defaultValue={''}
                    label="Floor"
                    name="FLR_ID"
                    control={control}
                    rules={{
                        required: "Choose a floor."
                    }}
                    fullWidth
                    size="small"
                    variant="standard"
                    options={floorOptions}
                    MenuProps={{ PaperProps: { sx: { maxHeight: 120 } } }}/>
                </Box>

                {/* { loading ?
                <Stack
                justifyContent={"center"}
                alignItems={"center"}
                padding={9}>
                    <CircularProgress
                    size={"4rem"}/>
                </Stack> :
                 } */}
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

export default RoomForm