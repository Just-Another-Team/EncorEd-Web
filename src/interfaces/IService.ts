import { Request, Response } from 'express';

export default interface IService {
    add(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
    view(req: Request, res: Response): Promise<void>;
}