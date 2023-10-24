import React, { useEffect, useMemo } from "react";
import { 
    Box,
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid'
import { useDispatch, useSelector } from "react-redux";
import { getSubjects } from "../../../../features/subject/subjectSlice";

// Must be changed
const columns = [
    { 
        field: 'id',
        headerName: 'Id',
        flex: 0.5
    },
    { 
        field: 'name',
        headerName: 'Subject Name',
        flex: 1
    },
    { 
        field: 'edpCode',
        headerName: 'EDP',
        flex: 0.7
    },
    {
        field: 'type',
        headerName: 'Type',
        flex: 1
    },
    {
        field: 'units',
        headerName: 'Units',
        flex: 0.5,
    },
    {
        field: 'creationDate',
        headerName: 'Date Created',
        flex: 1,
    },
    {
        field: 'createdBy',
        headerName: 'Created By',
        flex: 1,
    },
    {
        field: 'verifiedBy',
        headerName: 'Verified By',
        flex: 1,
    },
    {
        field: 'status',
        headerName: 'Status',
        flex: 0.6,
    },
];

const subjectRow = (id, name, edpCode, type, units, creationDate, createdBy, verifiedBy, status) => {
    return {id: id, name: name, edpCode: edpCode, type: type, units: units, creationDate: creationDate, createdBy: `${createdBy.firstName} ${createdBy.lastName}`, verifiedBy: verifiedBy, status: status}
}

const SubList = () => {
    const subjects = useSelector(state => state.subjects.subject)
    const subjectDispatch = useDispatch();

    useEffect(() => {
        subjectDispatch(getSubjects())
    }, [])

    return(
        <>            
            <Box marginBottom={2}>

                <DataGrid
                    rows={!subjects.loading && subjects.map((el) => {
                        return subjectRow(el.id, el.name, el.edpCode, el.type, el.units, el.creationDate, el.createdBy, el.verifiedBy, el.status)
                    })}
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
                        console.log(e.row)
                        window.location.href = '/dashboard/subject/testId'
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
        </>
    )
}

export default SubList