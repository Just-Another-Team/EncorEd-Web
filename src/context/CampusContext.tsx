import { createContext, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { ICampus } from "../data/ICampus";

type CampusContextType = {
    //add campus
    //update campus
    //delete campus
    //view all campus
    //view specific campus
}

export const CampusContext = createContext<CampusContextType>({} as CampusContextType);


type CampusProviderType = {
    children: React.ReactNode;
}

export const CampusProvider = ({ children }: CampusProviderType) => {
    const { user } = useAuth()
    
    //add campus
    const addCampus = (campusData: ICampus) => {

    }

    //update campus
    const updateCampus = (campusData: ICampus) => {
        
    }

    //delete campus
    const deleteCampus = (campusId: string) => {
        
    }

    //view all campus
    const viewAllCampuses = () => {
        
    }

    //view specific campus
    const viewCampus = (campusId: string) => {
        
    }

    useEffect(() => {
        // const fetchAttendancesSnapshot = onSnapshot(attendanceCollection, (snapshot) => {
        //     const attendanceDocs = snapshot.docs.map((attendance): IAttendance => {
        //         const attendanceData = attendance.data()

        //         return ({
        //             ATTD_ID: attendance.id,
        //             ...attendanceData,
        //         })
        //     })

        //     attendanceDocs.sort((prevDate, currDate) => dayjs(prevDate.ATTD_SUBMISSIONDATE as string).isAfter(dayjs(currDate.ATTD_SUBMISSIONDATE as string)) ? 1 : -1)

        //     setAttendances(attendanceDocs)
        // }, (error) => {
        //     console.error('Attendance Context Error', error)
        // })

        // return () => {
        //     fetchAttendancesSnapshot()
        //     setLoad(false)
        // }
    }, [user])

    const value = {}

    return (
        <CampusContext.Provider value={value}>
            { children }
        </CampusContext.Provider>
    )
}