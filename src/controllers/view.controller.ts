import { Request, Response } from "express";

function homepage(req: Request, res: Response) { res.render('home') }
function dashboard(req: Request, res: Response) { res.render('dashboard'); }

export { homepage, dashboard };