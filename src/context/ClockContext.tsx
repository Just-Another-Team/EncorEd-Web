import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
import { createContext, useState } from "react";

dayjs.extend(utc)

type ClockContextType = {
    ctime: dayjs.Dayjs
}

export const ClockContext = createContext<ClockContextType>({} as ClockContextType);

type ClockProviderType = {
    children: React.ReactNode;
}

export const ClockProvider = ({ children }: ClockProviderType) => {
    //let time = new Date().toLocaleTimeString()
    let time = dayjs().local()

    const [ ctime, setTime ] = useState(time)

    const UpdateTime = () => {
        //time = new Date().toLocaleTimeString()
        time = dayjs().local()
        setTime(time)
    }
    setTimeout(UpdateTime, 1000/60)

    const value = {
        ctime
    }

    return (
        <ClockContext.Provider value={value}>
            { children }
        </ClockContext.Provider>
    )
}