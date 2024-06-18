import { Box, FormControl, FormHelperText, FormLabel, PaginationItem } from "@mui/material"
import { useEffect, useState } from "react"
import { Controller, FieldValues, UseControllerProps, UseFormSetValue } from "react-hook-form"

type WeekType<T extends FieldValues> = {
    setValue: UseFormSetValue<T>;
    updateWeeks?: Array<string>
} & UseControllerProps<T>

const Week = <T extends FieldValues>(props: WeekType<T>) => {
    const { updateWeeks = [] } = props

    const [selectedWeeks, setSelectedWeeks] = useState<Array<string>>(updateWeeks)

    const handleSelectedWeek = (selectedWeek: string) => {
        if (selectedWeeks.includes(selectedWeek)) {
            setSelectedWeeks(selectedWeeks.filter((week: string) => week !== selectedWeek))
            return;
        }
        setSelectedWeeks([...selectedWeeks, selectedWeek])
    }

    useEffect(() => {
        setSelectedWeeks(updateWeeks)
    }, [updateWeeks])

    useEffect(() => {
        props.setValue(props.name, selectedWeeks as any)

        console.log("Default Value: ", selectedWeeks)
    }, [props.name, selectedWeeks, props.setValue])

    const weeks: Array<{ label: string, value: string }> = [
        { label: "M", value: "Monday" },
        { label: "Tu", value: "Tuesday" },
        { label: "W", value: "Wednesday" },
        { label: "Th", value: "Thursday" },
        { label: "F", value: "Friday" },
        { label: "S", value: "Saturday" },
    ]

    return (
        <FormControl variant="outlined">
            <FormLabel component="legend">Days Assigned</FormLabel>
            <Box>
                {weeks.map((el) => (
                    <Controller
                    key={el.value}
                    name={props.name}
                    control={props.control}
                    rules={props.rules}
                    render={({ field }) => {
                        return (
                            <PaginationItem
                            key={el.value}
                            onClick={() => handleSelectedWeek(el.value)}
                            selected={selectedWeeks.includes(el.value)}
                            color="primary"
                            page={el.label}
                            size="large"/>
                        )
                    }}/>
                ))}
            </Box>
            {/* <FormHelperText>{props.}</FormHelperText> */}
        </FormControl>
    )
}

export default Week