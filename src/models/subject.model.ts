
export default interface ISubject {
    id?: string;
    name: string; 
    edpCode: string; 
    type: string; 
    units: number; 
    creationDate: Date | string; 
    createdBy: string; 
    //updatedDate
    //updatedBy
    verifiedBy: string; 
    status: string;
}