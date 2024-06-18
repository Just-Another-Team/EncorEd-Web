import { Autocomplete, AutocompleteProps, darken, InputAdornment, lighten, styled, TextField } from "@mui/material";
import { useRooms } from "../../hooks/useRooms";
import IFloor from "../../data/IFloor";
import { Search } from "@mui/icons-material";
import IRoom from "../../data/IRoom";
import { useMapboxNavigation } from "../../hooks/useMapboxNavigation";
import { useState } from "react";
import { availableFloors } from "../../data/availableFloors";

const GroupHeader = styled('div')(({ theme }) => ({
    position: 'sticky',
    top: '-8px',
    padding: '4px 10px',
    color: theme.palette.primary.main,
    backgroundColor:
        theme.palette.mode === 'light'
        ? lighten(theme.palette.primary.light, 0.85)
        : darken(theme.palette.primary.main, 0.8),
}));
  
const GroupItems = styled('ul')({
    padding: 0,
});
  
const MapAutocomplete = () => {
    const { getRooms } = useRooms()
    const { setRoom, setRoomAndFloor, setRoomInputValue, selectedRoom, selectedRoomInputValue, addSearchLog, setFloor } = useMapboxNavigation()

    const handleOnChange = (event: React.SyntheticEvent<Element, Event>, value: string | IRoom | null) => {
        if (value === null) {
            setRoom(undefined)
        }
        else {
            addSearchLog(value as IRoom)
            setRoomAndFloor(value as IRoom)
        }
    }

    const handleOnInputChange = (event: React.SyntheticEvent<Element, Event>, value: string ) => {
        setRoomInputValue(value)
    }

    const rooms = getRooms().filter(room => availableFloors.includes((room.FLR_ID as IFloor).FLR_LEVEL))


    return (
        <Autocomplete
        value={selectedRoom}
        inputValue={selectedRoomInputValue}
        options={rooms.sort((roomA, roomB) => (roomA.FLR_ID as IFloor).FLR_LEVEL > (roomB.FLR_ID as IFloor).FLR_LEVEL ? 1 : -1)}
        groupBy={(option) => (option.FLR_ID as IFloor).FLR_NAME}
        getOptionLabel={(option) => option ? (option as IRoom).ROOM_NAME : ''}
        renderGroup={(params) => (
            <li key={params.key}>
                <GroupHeader>{params.group}</GroupHeader>
                <GroupItems style={{ padding: 0 }}>{params.children}</GroupItems>
            </li>
        )}
        fullWidth
        size="small"
        onChange={handleOnChange}
        onInputChange={handleOnInputChange}
        renderInput={(params) => (
            <TextField
            {...params}
            InputProps={{
                ...params.InputProps,
                startAdornment: (
                    <InputAdornment position="start">
                        <Search />
                    </InputAdornment>
                )
            }}
            placeholder="Search Room"/>
        )}/>
    )
}

export default MapAutocomplete