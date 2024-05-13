import { DeleteOutlineOutlined, PersonAddAlt, UpdateOutlined } from "@mui/icons-material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import IDepartment from "../../data/IDepartment";
import { useState } from "react";
import { useModal } from "../../hooks/useModal";
import useLoading from "../../hooks/useLoading";
import useDepartment from "../../hooks/useDepartment";
import DeleteDialog from "../../components/DialogDelete";
import DepartmentForm from "./DepartmentForm";
import { useUsers } from "../../hooks/useUsers";
import { UserRole } from "../../data/IUser";
import { Box, Chip, Stack } from "@mui/material";
import { useRooms } from "../../hooks/useRooms";

const DepartmentList = () => {
    const { users, getUser } = useUsers()
    const { getRoomFloor } = useRooms()
    const { 
        getDepartments,
        deleteDepartment,
        updateDepartment
    } = useDepartment();

    const { 
        openModal: updateModal,
        handleOpenModal: openUpdateModal,
        handleCloseModal: closeUpdateModal
    } = useModal();

    const { 
        openModal: deleteModal,
        handleOpenModal: openDeleteModal,
        handleCloseModal: closeDeleteModal
    } = useModal();

    const {
        loading,
        openLoading,
        closeLoading
    } = useLoading();

    const [ department, setDepartment ] = useState<IDepartment>();

    const handleClear = () => {
        setDepartment(undefined)
    }

    const handleUpdate = async (departmentData: IDepartment) => {

        const data: IDepartment = {
            DEPT_ID: department?.DEPT_ID,
            DEPT_NAME: departmentData.DEPT_NAME,
            DEPT_DEAN: departmentData.DEPT_DEAN,
            DEPT_FLOORSASSIGNED: departmentData.DEPT_FLOORSASSIGNED,
        }

        openLoading()

        console.log(data)

        // await updateDepartment(data)
        //     .then((result) => {
        //         console.log(result)
        //     })
        //     .catch((error) => {
        //         console.error(error)
        //     })

        closeLoading()
        closeUpdateModal()
    }

    const handleDelete = async () => {
        await deleteDepartment(department?.DEPT_ID!)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const DepartmentHeaders: Array<GridColDef<IDepartment>> = [
        {
            field: "DEPT_ID",
            headerName: "ID",
        },
        {
            field: "DEPT_NAME",
            headerName: "Name",
            minWidth: 256,
            flex: 1
        },
        {
            field: "DEPT_DEAN",
            headerName: "Dean Assigned",
            minWidth: 256,
            renderCell: (params) => {
                const userId = params.row.DEPT_DEAN as string
                return getUser(userId) ? getUser(userId)?.USER_FULLNAME : "No Dean"
            }
        },
        {
            field: "DEPT_FLOORSASSIGNED",
            headerName: "Floors Assigned",
            minWidth: 256,
            flex: 1,
            renderCell: (params) => {

                const floors = params.row.DEPT_FLOORSASSIGNED as Array<string>

                return (
                    <Box
                    gap={2}>
                        {floors.map((floorId) => {
                            const floor = getRoomFloor(floorId)
                            return floor ? (
                                <Chip
                                size="small"
                                label={floor.FLR_NAME} />
                            ) : undefined
                        })}
                    </Box>
                )
            }
        },
        {
            field: "DEPT_NOOFUSERS",
            headerName: "Users assigned",
            minWidth: 128,
            flex: 0.3
        },
        {
            field: "UPDATE",
            headerName: "",
            type: "actions",
            getActions: (params) => {

                const handleOnClickUpdate = (department: IDepartment) => () => {
                    setDepartment(department);
                    openUpdateModal();
                }
                
                const handleOnClickDelete = (department: IDepartment) => () => {
                    setDepartment(department);
                    openDeleteModal();
                }

                return [
                    <GridActionsCellItem
                    key={"assign"}
                    icon={<PersonAddAlt />}
                    label="Assign"
                    className="textPrimary"
                    onClick={() => {}}
                    color="primary"
                    />,
                    <GridActionsCellItem
                    key={"update"}
                    icon={<UpdateOutlined />}
                    label="Edit"
                    className="textPrimary"
                    onClick={handleOnClickUpdate(params.row)}
                    color="secondary"
                    />,
                    <GridActionsCellItem
                    key={"delete"}
                    icon={<DeleteOutlineOutlined />}
                    label="Delete"
                    onClick={handleOnClickDelete(params.row)}
                    color="error"
                    />,
                ];
            },
            minWidth: 128,
            flex: 0.1
        },
    ]

    return (
        <>
            <DataGrid
            initialState={{
                columns: {
                    columnVisibilityModel: {
                        DEPT_ID: false,
                    }
                },
                pagination: {
                    paginationModel: {
                        pageSize: 25,
                    }
                }
            }}
            columns={DepartmentHeaders}
            getRowId={(row) => row.DEPT_ID!}
            rows={getDepartments(users.filter(user => !user.USER_ISDELETED && !(user.ROLE_ID as UserRole).admin))}/>

            <DepartmentForm
            title={`Update ${department?.DEPT_NAME}`}
            selectedDepartment={department}
            loading={loading}
            onSubmit={handleUpdate}
            openModal={updateModal}
            closeModal={closeUpdateModal}/>

            <DeleteDialog
            selectedObject={department as IDepartment}
            title={department?.DEPT_NAME as string}
            handleClear={handleClear}
            deleteModal={deleteModal}
            onDelete={handleDelete}
            closeDeleteModal={closeDeleteModal}/>
        </>
    )
}

export default DepartmentList