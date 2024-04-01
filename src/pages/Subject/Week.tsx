import { Box, FormControl, FormLabel, PaginationItem } from "@mui/material"
import { useEffect, useState } from "react"
import { Controller, FieldValues, UseControllerProps, UseFormSetValue } from "react-hook-form"

type WeekType<T extends FieldValues> = {
    setValue: UseFormSetValue<T>;
} & UseControllerProps<T>

const Week = <T extends FieldValues>(props: WeekType<T>) => {
    const [selectedWeeks, setSelectedWeeks] = useState<any>([])

    const handleSelectedWeek = (selectedWeek: string) => {
        if (selectedWeeks.includes(selectedWeek)) {
            setSelectedWeeks(selectedWeeks.filter((week: string) => week !== selectedWeek))
            return;
        }
        setSelectedWeeks([...selectedWeeks, selectedWeek])
    }

    useEffect(() => {
        props.setValue(props.name, selectedWeeks)
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
            <FormLabel component="legend">Weeks Assigned</FormLabel>
            <Box
            paddingY={1}>
                {weeks.map((el) => (
                    <Controller
                    key={el.value}
                    name={props.name}
                    control={props.control}
                    rules={props.rules}
                    render={({ field }) => (
                        <PaginationItem
                        key={el.value}
                        onClick={() => handleSelectedWeek(el.value)}
                        selected={selectedWeeks.includes(el.value)}
                        color="primary"
                        page={el.label}
                        size="large"/>
                    )}/>
                ))}
            </Box>
        </FormControl>
    )
}

export default Week