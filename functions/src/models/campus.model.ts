export interface TermDates {
    startDate: Date | string;
    endDate: Date | string
}

export interface ICampus {
    CMPS_ID?: string;
    CMPS_NAME: string;
    CMPS_FRSTSEM: TermDates | null;
    CMPS_SCNDSEM: TermDates | null;
    CMPS_SMMRSEM: TermDates | null;
    CMPS_ISDELETED: boolean
}