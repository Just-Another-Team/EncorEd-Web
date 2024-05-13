import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
import { createContext, useEffect, useState } from "react";

dayjs.extend(utc)

type ClockContextType = {
    ctime: dayjs.Dayjs | undefined
}

export const ClockContext = createContext<ClockContextType>({} as ClockContextType);

type ClockProviderType = {
    children: React.ReactNode;
}

export const ClockProvider = ({ children }: ClockProviderType) => {

    const [ ctime, setTime ] = useState<dayjs.Dayjs>()

    useEffect(() => {
        setInterval(() => {
            const newDate = dayjs()

            setTime(newDate)
        }, 1000)
    }, [])

    const value = {
        ctime
    }

    return (
        <ClockContext.Provider value={value}>
            { children }
        </ClockContext.Provider>
    )
}