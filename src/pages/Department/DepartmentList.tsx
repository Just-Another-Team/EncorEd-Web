import { DeleteOutlineOutlined, UpdateOutlined } from "@mui/icons-material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import IDepartment from "../../types/IDepartment";
import { useState } from "react";
import { useModal } from "../../hooks/useModal";
import useLoading from "../../hooks/useLoading";
import useDepartment from "../../hooks/useDepartment";
import DeleteDialog from "../../components/DialogDelete";
import DepartmentForm from "./DepartmentForm";

const DepartmentList = () => {
    const { 
        departments,
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
            DEPT_NAME: departmentData.DEPT_NAME
        }

        openLoading()

        await updateDepartment(data)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.error(error)
            })

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
            minWidth: 256
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
            rows={departments!}/>

            <DepartmentForm
            title={`Update ${department?.DEPT_NAME}`}
            selectedDepartment={department}
            loading={loading}
            onSubmit={handleUpdate}
            openModal={updateModal}
            closeModal={closeUpdateModal}/>

            <DeleteDialog
            selectedObject={department as IDepartment}
            handleClear={handleClear}
            deleteModal={deleteModal}
            onDelete={handleDelete}
            closeDeleteModal={closeDeleteModal}/>
        </>
    )
}

export default DepartmentList