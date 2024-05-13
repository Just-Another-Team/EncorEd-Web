import { Autocomplete, Box, InputAdornment, TextField, Typography } from "@mui/material"
import Sidebar from "../../components/NavSidebar"
import { kioskSideBar } from "../../data/drawerWidth";
import Color from "../../assets/Color";
import { Search } from "@mui/icons-material";
import { useUsers } from "../../hooks/useUsers";
import { useRooms } from "../../hooks/useRooms";
import IFloor from "../../data/IFloor";
import IRoom from "../../data/IRoom";
import MapAutocomplete from "../Map/MapAutocomplete";

type KioskSideBarType = {
    isDrawerOpen: boolean;
    onCloseDrawer: () => void;
}

const KioskSideBar = ({
    isDrawerOpen,
    onCloseDrawer
}: KioskSideBarType) => {

    const { getRooms } = useRooms()

    return (
        <Sidebar
        backgroundColor={Color('primaryBlue', 200)}
        sideBarWidth={kioskSideBar}
        isDrawerOpen={isDrawerOpen}
        onCloseDrawer={onCloseDrawer}>
            <Box
            paddingX={3}>
                <MapAutocomplete />
                
                <Box marginTop={2}>
                    <Typography variant="h5">Floor Directory</Typography>
                </Box>
            </Box>
        </Sidebar>
    )
}

export default KioskSideBar