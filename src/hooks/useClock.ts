import { useContext } from "react"
import { ClockContext } from "../context/ClockContext"

const useClock = () => {
    return useContext(ClockContext)
}

export default useClock