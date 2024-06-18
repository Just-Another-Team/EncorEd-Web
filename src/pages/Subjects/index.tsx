import { 
    Alert,
    Box,
    Button,
    Fade,
    Snackbar,
    Typography
} from "@mui/material"
import SubjectList from "./SubjectList"
import SubjectForm from "./SubjectForm"
import { useModal } from "../../hooks/useModal"
import useLoading from "../../hooks/useLoading"
import dayjs from "dayjs"
import { useUsers } from "../../hooks/useUsers"
import { useSubject } from "../../hooks/useSubject"
import ISchedule from "../../data/ISchedule"
import ISubject from "../../data/ISubject"
import { useState } from "react"
import AddSubjectModal from "./AddSubjectModal"
import DialogMessage from "../../components/DialogMessage"

type AddedSubjectType = {
    valid: boolean
} & ISubject

const Subjects = () => {
    const { openModal, handleOpenModal, handleCloseModal } = useModal();

    const { 
        openModal: successSnackbar,
        handleOpenModal: openSuccessSnackbar,
        handleCloseModal: closeSuccessSnackbar
    } = useModal();

    const { 
        openModal: errorSnackbar,
        handleOpenModal: openErrorSnackbar,
        handleCloseModal: closeErrorSnackbar
    } = useModal();

    const { loading, closeLoading, openLoading } = useLoading()
    
    const { addSubjects } = useSubject()
    const { getCurrentUser } = useUsers()

    const [ message, setMessage ] = useState<string>()

    const handleAddSubject = async (addedSubjectData: Array<AddedSubjectType>) => {
        // if (addedSubjectData.length === 0) {
        //     setMessage('Added at least one subject before submitting.')
        //     openErrorSnackbar()
        //     return
        // }

        const addedSubjects: Array<ISubject> = addedSubjectData.map(subject => {
            return ({
                SUB_EDP_CODE: subject.SUB_EDP_CODE,
                SUB_CODE: subject.SUB_CODE,
                SUB_DESCRIPTION: subject.SUB_DESCRIPTION,
                SCHED_ID: subject.SCHED_ID,
                USER_ID: subject.USER_ID,
                ROOM_ID: subject.ROOM_ID,
                SUB_CREATEDBY: getCurrentUser()?.USER_ID,
                SUB_UPDATEDBY: getCurrentUser()?.USER_ID
            })
        })

        // console.log(addedSubjects)
        await addSubjects(addedSubjects)
            .then((result) => {
                console.log("Subjects added successfully!")
                setMessage(result.data)
                openSuccessSnackbar()
            })
            .catch((error) => {
                console.error(error)
                setMessage(error.response.data)
                openErrorSnackbar()
            })

        handleCloseModal()
    }

    // const handleAddSubject = async (input: ISubject) => {
    //     const data: ISubject = {
    //         SUB_CODE: input.SUB_CODE,
    //         SUB_DESCRIPTION: input.SUB_DESCRIPTION,
    //         SCHED_ID: {
    //             SCHED_STARTTIME: dayjs((input.SCHED_ID as ISchedule).SCHED_STARTTIME).toISOString(),
    //             SCHED_ENDTIME: dayjs((input.SCHED_ID as ISchedule).SCHED_ENDTIME).toISOString(),
    //             SCHED_WEEKASSIGNED: (input.SCHED_ID as ISchedule).SCHED_WEEKASSIGNED, 
    //         },
    //         USER_ID: input.USER_ID ? input.USER_ID : null,
    //         SUB_CREATEDBY: getCurrentUser()?.USER_ID,
    //         SUB_UPDATEDBY: getCurrentUser()?.USER_ID
    //     }

    //     await addSubject(data)
    //         .then(() => {
    //             console.log("Subject and Schedule is added successfully!")
    //             setMessage("Subject is added successfully!")
    //             openSuccessSnackbar()
    //         })
    //         .catch((error) => {
    //             console.error(error)
    //             setMessage(error.response.data)
    //             openErrorSnackbar()
    //         })

    //     handleCloseModal()
    //     closeLoading()
    // }

    return (
        <Box>
            <Box
            display={"flex"}
            flexDirection={"row"}
            marginBottom={2}>
                <Typography
                variant="h4"
                flex={1}
                fontWeight={700}>
                    Subjects
                </Typography>

                <Button
                onClick={handleOpenModal}
                size="large"
                variant="contained">
                    Add Subject
                </Button>
            </Box>

            <Box
            width={'100%'}
            height={580}>
                <SubjectList />
            </Box>

            {/* <SubjectForm
            onSubmit={handleAddSubject}
            title="Add Subject"
            loading={loading}
            openModal={openModal}
            closeModal={handleCloseModal}/> */}

            <AddSubjectModal
            onSubmit={handleAddSubject}
            title="Add Subject"
            loading={loading}
            openModal={openModal}
            closeModal={handleCloseModal}/>

            <Snackbar
            open={successSnackbar}
            autoHideDuration={3000}
            TransitionComponent={Fade}
            onClose={closeSuccessSnackbar}>
                <Alert
                variant="filled"
                severity="success"
                onClose={closeSuccessSnackbar}>
                    { message }
                </Alert>
            </Snackbar>

            <Snackbar
            open={errorSnackbar}
            autoHideDuration={3000}
            TransitionComponent={Fade}
            onClose={closeErrorSnackbar}>
                <Alert
                variant="filled"
                severity="error"
                onClose={closeErrorSnackbar}>
                    { message }
                </Alert>
            </Snackbar>
        </Box>
        
    )
}

export default Subjects