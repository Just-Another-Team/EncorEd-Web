import { createContext, useEffect, useState } from "react";
import subjectService from "../app/api/subject-service";
import ISubject from "../data/ISubject";
import IRoom from "../data/IRoom";
import { QRCodeType } from "../types/QRCodeType";
import { AxiosResponse } from "axios";

type SubjectContextType = {
    subjects: Array<ISubject>
    load: boolean,
    addSubject: (data: ISubject) => Promise<AxiosResponse<any, any>>
    updateSubject: (data: ISubject) => Promise<AxiosResponse<any, any>>
    deleteSubject: (subId: string) => Promise<AxiosResponse<any, any>>
    setLoad: React.Dispatch<React.SetStateAction<boolean>>;
    getSubjectsByRoom: (roomId: string) => Array<ISubject>;
    assignSubjectToRoom: (data: QRCodeType) => Promise<AxiosResponse<any, any>>;
}

export const SubjectContext = createContext<SubjectContextType>({} as SubjectContextType);

type SubjectProviderType = {
    children: React.ReactNode;
}

export const SubjectProvider = ({ children }: SubjectProviderType) => {
    const [subjects, setSubjects] = useState<Array<ISubject>>([]);
    const [load, setLoad] = useState<boolean>(true);

    const assignSubjectToRoom = (data: QRCodeType) => {
        return subjectService.assignRoom(data)
    }

    const addSubject = (data: ISubject) => {
        setLoad(true)
        return subjectService.add(data)
    }

    const updateSubject = (data: ISubject) => {
        setLoad(true)
        return subjectService.update(data)
    }

    const deleteSubject = (subId: string) => {
        setLoad(true)
        return subjectService.deleteSubject(subId)
    }

    const getSubjectsByRoom = (roomId: string) => {
        return subjects.filter(subject => subject.ROOM_ID !== null ? (subject.ROOM_ID as IRoom).ROOM_ID === roomId : false)
    }

    useEffect(() => {
        const fetchSubjects = async () => {
            const subjectResponse = await subjectService.viewAll()
            const subjectData = subjectResponse.data;

            setSubjects(subjectData)
        }

        fetchSubjects();
        setLoad(false)
    }, [load])

    const value = {
        subjects,
        load,
        addSubject,
        updateSubject,
        deleteSubject,
        setLoad,
        getSubjectsByRoom,
        assignSubjectToRoom
    }

    return (
        <SubjectContext.Provider value={value}>
            { children }
        </SubjectContext.Provider>
    )
}