import { useContext } from "react";
import { NavigationContext } from "../context/NavigationContext";

export const useMapboxNavigation = () => {
    return useContext(NavigationContext)
}