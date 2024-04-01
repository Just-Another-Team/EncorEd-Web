import { useContext } from "react";
import { SubjectContext } from "../context/SubjectContext";

export const useSubject = () => {
    return useContext(SubjectContext)
}