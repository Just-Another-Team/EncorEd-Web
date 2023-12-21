import React, { useEffect } from "react";
import { 
    Box,
    Tabs,
    Typography,
    Tab,
    Button,
    TextField,
    Grid,
    Stack,
    PaginationItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    IconButton
} from "@mui/material";
import { useAppSelector } from "../../../../app/encored-store-hooks";
import { useParams } from "react-router-dom";
import CustomTab from "../../../../components/Tab/CustomTab";
import DeleteForeverOutlined from "@mui/icons-material/DeleteForeverOutlined";
import UpdateOutlined from "@mui/icons-material/UpdateOutlined";
import { useForm } from "react-hook-form";
import { SubjectInput } from "../../../../app/features/subject/subjectSlice";
import FormInputTextField from "../../../../components/TextField/FormInputTextField";
import FormInputDropDown from "../../../../components/DropDown/FormInputDropDown";
import { RegisterFormInput } from "../../../../types/RegisterFormInput";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import dayjs from "dayjs";
import { FixMeLater } from "../../../../types/FixMeLater";
import InputTimePicker from "../../../../components/Timepicker/Timepicker";
import FormInputMultiCheckbox from "../../../../components/Checkbox/FormInputMultiCheckbox";
import { ErrorMessage } from "@hookform/error-message";
import UpdateSubjectDialog from "../../../../components/Dialog/FormDialog/UpdateSubjectDialog";

const SelectedSubject = () => {
    const src = "/assets/SubjectTestPic.png"

    const { id } = useParams();

    const subjects = useAppSelector(state => state.subject.data)
    const selectedSubject = subjects.find(subject => subject.details!.id === id)

    const [ updateDialogSwitch, setUpdateDialog ] = React.useState(false);

    const weeks: Array<{ label: string; value: string; }> = [
        { label: "Su", value: "sunday", },
        { label: "Mo", value: "monday", },
        { label: "Tu", value: "tuesday", },
        { label: "We", value: "wednesday", },
        { label: "Th", value: "thursday", },
        { label: "Fr", value: "friday", },
        { label: "Sa", value: "saturday", },
    ]

    const openUpdateDialog = (e: FixMeLater) => {
        setUpdateDialog(true);
    }
    const closeUpdateDialog = (e: FixMeLater) => {
        setUpdateDialog(false);
    }

    return(
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={5}>
                    <img style={{width: "100%", borderRadius: 12}} src={src}/>

                    <Box padding={2} marginTop={2} bgcolor={"#F6F5FF"} borderRadius={4}>
                        <Stack direction={'row'} alignItems={"center"} marginBottom={2} gap={1}>
                            <Typography color={"#1789FC"} fontWeight={700} variant="h5" flex={1}>
                                {selectedSubject?.details?.name}
                            </Typography>
                            <Button onClick={openUpdateDialog} startIcon={<UpdateOutlined />} size="small" variant="text" color="secondary">
                                Update
                            </Button>
                            <Button startIcon={<DeleteForeverOutlined />} size="small" variant="text" color="error">
                                Delete
                            </Button>
                        </Stack>

                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <Typography>Units</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography color={"#548BC3"}>{selectedSubject?.details?.units}</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography>EDP Code</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography color={"#548BC3"}>{selectedSubject?.details?.edpCode}</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography>Type</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography color={"#548BC3"}>{`${selectedSubject?.details?.type?.charAt(0).toLocaleUpperCase()}${selectedSubject?.details?.type?.slice(1)}`}</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography>Room</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography color={"#548BC3"}>TBA</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography>Scheduled Time</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                {selectedSubject?.schedule !== undefined ? (
                                    <Typography color={"#548BC3"}>{`${dayjs(selectedSubject?.schedule?.startTime).format("hh:mm A")} - ${dayjs(selectedSubject?.schedule?.endTime).format("hh:mm A")}`}</Typography>
                                ) : (
                                    <Typography color={"#548BC3"}>TBA</Typography>
                                )}
                            </Grid>

                            <Grid item xs={12}>
                                <Typography marginBottom={1}>Assigned Days per Week</Typography>
                                <Stack sx={{pointerEvents: "none"}} direction={"row"} justifyContent={"space-around"}>
                                    {weeks.map((day) => (
                                        <PaginationItem
                                        selected={selectedSubject?.schedule?.assignDays.includes(day.value)}
                                        color="primary"
                                        size="large"
                                        page={<Typography>{day.label}</Typography>} />
                                    ))}
                                </Stack>
                            </Grid> 

                            <Grid item>
                                
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>

                <Grid item xs={12} lg={7} >
                    <Box marginBottom={2} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={0} variant="scrollable">
                            <Tab label="Participants"  />
                            <Tab label="Teachers" />
                        </Tabs>
                    </Box>
                </Grid>
            </Grid>

            <UpdateSubjectDialog
            selectedSubject={selectedSubject!}
            updateDialogSwitch={updateDialogSwitch}
            closeUpdateDialog={closeUpdateDialog}
            weeks={weeks}/>
            
        </>
    )
}

export default SelectedSubject