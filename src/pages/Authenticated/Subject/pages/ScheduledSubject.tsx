import React, { useEffect } from "react";
import { 
    Box, ButtonBase, IconButton, Pagination, PaginationItem, Stack, Typography, useTheme,
} from "@mui/material";
import { DataGrid, GridCellParams, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/encored-store-hooks";
import dayjs from "dayjs";
import { DetailsInput, SubjectInput, deleteSubject, deleteSubjectSchedule } from "../../../../app/features/subject/subjectSlice";
import DeleteForeverOutlined from "@mui/icons-material/DeleteForeverOutlined";
import EnsureDialog from "../../../../components/Dialog/EnsureDialog/EnsureDialog";

const week: Array<{ label: string; value: string; }> = [
    { label: "Su", value: "sunday", },
    { label: "Mo", value: "monday", },
    { label: "Tu", value: "tuesday", },
    { label: "We", value: "wednesday", },
    { label: "Th", value: "thursday", },
    { label: "Fr", value: "friday", },
    { label: "Sa", value: "saturday", },
]

const SchedSubList = () => {
    const theme = useTheme();

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const institution = useAppSelector(state => state.institution.data)
    const subjectSchedule = useAppSelector(state => state.subject.data.filter(el => el.schedule))

    const [ subjectScheduleList, setSubjectScheduleList ] = React.useState<any>([])

    const [ openEnsureDialog, setOpenEnsureDialog ] = React.useState(false);
    const [ dialogTarget, setDialogTarget ] = React.useState<any>();

    const handleClickOpen = (params: DetailsInput) => {
        setDialogTarget(params)
        setOpenEnsureDialog(true)
    };
    const handleClickClose = () => {
        setOpenEnsureDialog(false)
        setDialogTarget(undefined)
    }
    const handleConfirmDelete = (value: DetailsInput) => {
        dispatch(deleteSubjectSchedule(value.id!)).unwrap()
            .then(() => {
                // alert("Subject successfully deleted!")
                handleClickClose();
                navigate(0)
            })
            .catch((error) => {
                alert(`Error on deleted: ${error.response.data}`)
                handleClickClose();
            })
    }

    useEffect(() => {
        setSubjectScheduleList(subjectSchedule)
    }, [])

    const columns: Array<GridColDef> = [
        { 
            field: 'id',
            headerName: 'Id',
            flex: 0.5
        },
        { 
            field: 'name',
            headerName: 'Subject Name',
            sortable: false,
            flex: 0.6,
            minWidth: 256,
            valueGetter: (params: GridValueGetterParams<SubjectInput>) => {
                return params.row.details!.name
            },
        },
        { 
            field: 'participants',
            headerName: 'Participants',
            sortable: false,
            flex: 0.3,
            minWidth: 128,
            disableColumnMenu: true,
            headerAlign: "center",
            align: "center",
            valueGetter: (params: GridValueGetterParams<SubjectInput>) => {
                return 0
            },
        },
        {
            field: 'subjectDuration',
            headerName: 'Duration',
            sortable: false,
            flex: 0.5,
            minWidth: 192,
            disableColumnMenu: true,
            headerAlign: "center",
            align: "center",
            valueGetter: (params: GridValueGetterParams<SubjectInput>) => {
                return `${dayjs(params.row.schedule!.startTime).format("hh:mm A")} - ${dayjs(params.row.schedule!.endTime).format("hh:mm A")}`;
            },
        },
        {
            field: 'subjectSchedule',
            headerName: 'Schedule',
            sortable: false,
            minWidth: 224,
            flex: 1,
            renderCell: (params: GridCellParams<SubjectInput>) => {
                return (
                    <Box display={"flex"} gap={1}>
                        {week.map((day) => (
                            <Box
                            key={day.value}
                            display={"flex"}
                            width={36}
                            height={36}
                            borderRadius={"50%"}
                            justifyContent={"center"}
                            bgcolor={params.row.schedule!.assignDays.includes(day.value) ? theme.palette.primary.main : "transparent"}
                            color={params.row.schedule!.assignDays.includes(day.value) ? "#FFFFFF" : theme.palette.text.primary}
                            alignItems={"center"}>
                                <Typography variant="body2">
                                    {day.label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                )
            }
        },
        {
            field: 'status',
            headerName: 'Status',
            sortable: false,
            flex: 0.2,
            minWidth: 128,
            valueGetter: (params: GridValueGetterParams<SubjectInput>) => {
                return params.row.schedule!.status;
            },
        },
        {
            field: 'actions',
            sortable: false,
            width: 64,
            disableColumnMenu: true,
            renderHeader: () => (
                <span></span>
            ),
            renderCell: (params: GridCellParams<SubjectInput>) => {
                return (
                    <IconButton color="error" onClick={() => {
                        handleClickOpen(params.row.details as DetailsInput)
                    }}>
                        <DeleteForeverOutlined />
                    </IconButton>
                )
            }
        }
    ];
    
    return(
        <>            
            <Box height={560} marginBottom={2}>
                <DataGrid
                    rows={subjectScheduleList}
                    columns={columns}
                    getRowId={(row) => row.details.id}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 25},
                        },
                        columns: {
                            columnVisibilityModel: {
                                id: false,
                            }
                        }
                    }}
                    onRowDoubleClick={(e) => {
                        console.log(e.row.id)
                        navigate(`/dashboard/subject/${institution.id}/${e.row.details.id}`)
                    }}
                    pageSizeOptions={[25]}
                    //disableRowSelectionOnClick
                    sx={{
                        '&.MuiDataGrid-root': {
                            border: '1px solid #EFEEFB'
                        },
                        '.MuiDataGrid-columnHeaders': {
                            backgroundColor: '#D0E7FF;',
                            color: '#296EB4',
                            fontSize: 16,
                        },
                        '.MuiTablePagination-displayedRows': {
                            marginTop: '1em',
                            marginBottom: '1em'
                        },
                        '.MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel': {
                            marginTop: '1em',
                            marginBottom: '1em'
                        }
                    }}
                />
            </Box>

            <EnsureDialog
            open={openEnsureDialog}
            value={dialogTarget}
            valueType={"subject"}
            handleClose={handleClickClose}
            handleConfirmation={(e) => {handleConfirmDelete(dialogTarget)}}/>
        </>
    )
}

export default SchedSubList