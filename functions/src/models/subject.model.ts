
export default interface ISubject {
    id?: string;
    name: string; 
    edpCode: string; 
    type: string; 
    units: number;

    institution?: string; //Not important to update (unless admin)

    creationDate: Date | string; //Not important to update
    createdBy: string; //Not important to update

    updatedDate?: Date | string; 
    updatedBy?: string; 

    verifiedBy?: string | null;

    status?: string; //Not important to update (unless delete) -- I'm on a limbo for this
}