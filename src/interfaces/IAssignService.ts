import { Request, Response } from 'express';

export default interface IAssignService {
    assign(req: Request, res: Response): Promise<void>;
    remove(req: Request, res: Response): Promise<void>;
    view(req: Request, res: Response): Promise<void>;
}