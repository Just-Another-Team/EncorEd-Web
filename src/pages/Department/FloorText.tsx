import { Autocomplete, Chip, ListItemText, TextField } from "@mui/material";
import { useState } from "react";
import { useRooms } from "../../hooks/useRooms";
import IFloor from "../../data/IFloor";
import { Controller, FieldValues, UseControllerProps, UseFormSetValue } from "react-hook-form";

type FloorAutoCompleteType<T extends FieldValues> = {
    // setValue: UseFormSetValue<T>;
} & UseControllerProps<T>

const FloorAutoComplete = <T extends FieldValues>(props: FloorAutoCompleteType<T>) => {
    const { name, control, rules } = props

    const { getFloorSortedByLevel } = useRooms()

    // const [value, setValue] = useState<Array<IFloor>>([]);
  
    return (
        <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => (
            <Autocomplete
            multiple
            id="floor-tags"
            value={value}
            fullWidth
            filterSelectedOptions
            onChange={((e, data) => onChange(data))}
            options={getFloorSortedByLevel()}
            componentsProps={{
                popper: {
                    modifiers: [
                        {
                        name: 'flip',
                        enabled: false
                        },
                        {
                            name: 'preventOverflow',
                            enabled: false
                        }
                    ]
                }
            }}
            isOptionEqualToValue={(option, value) => option.FLR_ID === value.FLR_ID}
            getOptionLabel={(option) => option.FLR_NAME}
            renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => {
                    return (
                        <Chip
                        label={option.FLR_NAME}
                        {...getTagProps({ index })}
                        key={option.FLR_ID}
                        size="small"/>
                    )
                })
            }
            renderInput={(params) => (
                <TextField
                {...params}
                variant="standard"
                label="Floors"
                placeholder="Floors assigned in this Department"/>
            )}/>
        )}/>
    );
}

export default FloorAutoComplete