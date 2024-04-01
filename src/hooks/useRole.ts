import { useContext } from "react"
import RoleContext from "../context/RoleContext"

const useRole = () => {
    return useContext(RoleContext)
}

export default useRole