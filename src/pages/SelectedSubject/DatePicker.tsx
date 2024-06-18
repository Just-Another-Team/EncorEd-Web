import { CalendarMonth } from "@mui/icons-material"
import { Box, Chip, InputAdornment, Menu, Popover, Stack, styled, Tab, Tabs, TextField, Typography, useMediaQuery, useTheme } from "@mui/material"
import { DateCalendar, DateView, MonthCalendar, PickersCalendarHeader, PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import { PickerSelectionState } from "@mui/x-date-pickers/internals";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { MouseEventHandler, useState } from "react";

dayjs.extend(isBetween);

type DatePickerType = {
    direction: number | "center" | "right" | "left",
    dateRange?: { startValue: Dayjs | null; endValue: Dayjs | null; type?: "day" | "month" | "year" | "week" }
    onMainDateChange?: (value: dayjs.Dayjs | null, selectionState?: PickerSelectionState | undefined) => void
    onMainClick?: MouseEventHandler<HTMLButtonElement> | undefined
    onSecondDateChange?: (value: dayjs.Dayjs | null, selectionState?: PickerSelectionState | undefined) => void
    onSecondClick?: MouseEventHandler<HTMLButtonElement> | undefined
}

const DatePicker = (props: DatePickerType) => {

    const { dateRange, direction, onMainDateChange, onSecondDateChange, onMainClick, onSecondClick } = props

    const theme = useTheme()
    const belowMd = useMediaQuery(theme.breakpoints.down("md"))

    const [filterType, setFilterType] = useState(6);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    
    // const [dateRange, setDateRange] = useState<{ startValue: Dayjs | null; endValue: Dayjs | null; type?: "day" | "month" | "year" | "week" }>({
    //     startValue: dayjs(),
    //     endValue: dayjs(),
    //     type: "day"
    // })

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setFilterType(newValue);
    };

    const open = Boolean(anchorEl);

    const textFormat = () => {
        return dateRange?.endValue === null ? dateRange?.startValue?.format("MMMM DD, YYYY") : dateRange?.startValue === null ? dateRange?.endValue?.format("MMMM DD, YYYY") :  `${dateRange?.startValue?.format("MM/DD/YYYY")} - ${dateRange?.endValue?.format("MM/DD/YYYY")}`
        //return filterType === 0 ? dateRange?.startValue?.format("MMMM DD, YYYY"): filterType === 2 ? dateRange?.startValue?.format("MMMM YYYY") : filterType === 5 ? dateRange?.startValue?.format("YYYY") : [3, 4].includes(filterType) ? `${dateRange?.startValue?.format("MMMM YYYY")} - ${dateRange?.endValue?.format("MMMM YYYY")}` : `${dateRange?.startValue?.format("MM/DD/YYYY")} - ${dateRange?.endValue?.format("MM/DD/YYYY")}`
    }

    return (
        <>
            <TextField
            onClick={handleClick}
            size="small"
            sx={{
                caretColor: 'transparent',
            }}
            autoComplete="off"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <CalendarMonth />
                    </InputAdornment>
                )
            }}
            value={textFormat()}
            fullWidth={belowMd ? true : false}/>

            <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: direction,
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: direction,
            }}>
                <Stack
                direction="row">
                    <Box
                    aria-label="Main Date">
                        <Typography variant="h6" paddingX={2} paddingTop={1}>Start Date</Typography>
                        <DateCalendar
                        value={dateRange?.startValue}
                        onChange={onMainDateChange}
                        views={['year', 'month', 'day']}
                        showDaysOutsideCurrentMonth 
                        slots={{
                            day: Day,
                        }}
                        slotProps={{
                            day: (ownerState) => ({
                                onClick: onMainClick,
                                startDay: dateRange?.startValue,
                                endDay: dateRange?.endValue,
                                filterType: filterType
                            } as any),
                        }}/>
                    </Box>

                    {/* Show the made date selected */}
                    <Box
                    aria-label="Second Date">
                        <Typography variant="h6" paddingX={2} paddingTop={1}>End Date</Typography>
                        <DateCalendar
                        value={dateRange?.endValue}
                        showDaysOutsideCurrentMonth
                        onChange={onSecondDateChange}
                        slots={{
                            day: Day,
                        }}
                        slotProps={{
                            day: (ownerState) => ({
                                onClick: onMainClick,
                                startDay: dateRange?.startValue,
                                endDay: dateRange?.endValue,
                                filterType: filterType
                            } as any),
                        }}
                        views={['year', 'month', 'day']}/>
                    </Box>
                </Stack>
            </Popover>
        </>
    )
}

interface CustomPickerDayProps extends PickersDayProps<Dayjs> {
    isSelected: boolean;
    isHovered: boolean;
}
  
const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isHovered',
})<CustomPickerDayProps>(({ theme, isSelected, isHovered, day }) => ({
    ...(isSelected && {
        backgroundColor: theme.palette.primary[theme.palette.mode],
        color: theme.palette.secondary.contrastText,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.primary.main,
        },
        // borderRadius: 0
    }),
    ...(isHovered && {
        backgroundColor: theme.palette.secondary[theme.palette.mode],
        '&:hover, &:focus': {
            backgroundColor: theme.palette.secondary[theme.palette.mode],
        },
    }),
})) as React.ComponentType<CustomPickerDayProps>;

const isInSameWeek = (dayA: Dayjs, dayB: Dayjs | null | undefined) => {
    if (dayB == null) {
        return false;
    }
  
    return dayA.isSame(dayB, 'week');
};

const isInBetween = (day: Dayjs, start: Dayjs | null | undefined, end: Dayjs | null | undefined) => {
    if (end == null) {
        return false;
    }

    return day.isBetween(start, end, 'day', '(]')
}

function Day(
    props: PickersDayProps<Dayjs> & {
        startDay?: Dayjs | null;
        endDay?: Dayjs | null;
        filterType?: number
    },
) {
    const { day, startDay, endDay, filterType, ...other } = props;

    //Identify is the custom pickers day is Start Date input or an End Date Input

    return (
        <CustomPickersDay
        {...other}
        day={day}
        selected={day.isSame(startDay, 'day') || day.isSame(endDay, 'day')}
        isSelected={isInBetween(day, startDay, endDay)}
        isHovered={false}
        />
    );
}

export default DatePicker