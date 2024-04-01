import { useContext, useEffect, useMemo, useState } from "react";
import { RoomContext } from "../context/RoomContext";

export const useRooms = () => {
    return useContext(RoomContext)
}