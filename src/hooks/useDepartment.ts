import { useContext } from "react"
import DepartmentContext from "../context/DepartmentContext"

const useDepartment = () => {
    return useContext(DepartmentContext)
}

export default useDepartment