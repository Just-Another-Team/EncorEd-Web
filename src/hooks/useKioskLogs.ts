import { useContext } from "react"
import { KioskLogContext } from "../context/KioskContext"

const useKioskLogs = () => {
    return useContext(KioskLogContext)
}

export default useKioskLogs