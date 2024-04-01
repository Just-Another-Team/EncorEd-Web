import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const useUsers = () => {
    return useContext(UserContext)
}