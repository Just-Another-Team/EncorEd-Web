import React, { useEffect } from "react";
import { 
    Box,
    IconButton,
    Stack,
    TextField,
} from "@mui/material";
import { DataGrid, GridCellParams, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { useAppDispatch, useAppSelector } from "../../../../app/encored-store-hooks";
import { DetailsInput, SubjectInput, deleteSubject, getSubjects } from "../../../../app/features/subject/subjectSlice";
import dayjs from "dayjs";
import DeleteForeverOutlined from "@mui/icons-material/DeleteForeverOutlined";
import { useNavigate } from "react-router-dom";
import EnsureDialog from "../../../../components/Dialog/EnsureDialog/EnsureDialog";

const SubList = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const institution = useAppSelector(state => state.institution.data)
    const subjects = useAppSelector(state => state.subject.data.map(el => el.details))

    const [ subjectList, setSubjectList ] = React.useState<any>([])

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
        dispatch(deleteSubject(value.id!)).unwrap()
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

    const handleSearchSubject = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let searchedValue = subjects.filter(subject => subject?.name?.toLowerCase().includes(e.target.value.toLowerCase()))
        setSubjectList(searchedValue)
    }

    useEffect(() => {
        dispatch(getSubjects(institution.id!)).unwrap().then((result) => {
            setSubjectList(result.data.map((el: SubjectInput) => el.details))
        })
    }, [])

    const columns: GridColDef[] = [
        { 
            field: 'id',
            headerName: 'Id',
            flex: 0.5
        },
        { 
            field: 'name',
            headerName: 'Subject Name',
            flex: 1,
            minWidth: 240
        },
        { 
            field: 'edpCode',
            headerName: 'EDP',
            sortable: false,
            flex: 1,
            minWidth: 160
        },
        {
            field: 'type',
            headerName: 'Type',
            flex: 1,
            sortable: false,
            minWidth: 120
        },
        {
            field: 'units',
            headerName: 'Units',
            flex: 0.5,
            minWidth: 96,
        },
        {
            field: 'creationDate',
            headerName: 'Date Created',
            flex: 1,
            minWidth: 172,
            valueGetter: (params: GridValueGetterParams) => {
                return dayjs(params.row.joinDate).format("MMMM-DD-YYYY")
            },
        },
        {
            field: 'createdBy',
            headerName: 'Created By',
            flex: 1,
            minWidth: 198,
        },
        {
            field: 'verifiedBy',
            headerName: 'Verified By',
            flex: 1,
            minWidth: 198,
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 0.6,
            sortable: false,
            minWidth: 128,
        },
        {
            field: 'delete',
            sortable: false,
            width: 64,
            renderHeader: () => (
                <span></span>
            ),
            renderCell: (params: GridCellParams<DetailsInput>) => {
                return (
                    <IconButton color="error" onClick={() => {
                        handleClickOpen(params.row as DetailsInput)
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

                <Stack direction={"row-reverse"} marginBottom={1}>
                    <TextField onChange={handleSearchSubject} size="small" label="Search Subject"/>
                </Stack>

                <DataGrid
                    rows={subjectList}
                    columns={columns}
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
                        navigate(`/dashboard/subject/${institution.id}/${e.row.id}`)
                    }}
                    pageSizeOptions={[25]}
                    hideFooterSelectedRowCount
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

            <EnsureDialog open={openEnsureDialog} value={dialogTarget} valueType={"subject"} handleClose={handleClickClose} handleConfirmation={(e) => {handleConfirmDelete(dialogTarget)}}/>
        </>
    )
}

export default SubList