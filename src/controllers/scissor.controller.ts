import { Request, Response } from "express";

function homepage(req: Request, res: Response) {
    try {
        res.render('index');
    } catch (err) {
        if (err instanceof Error) return console.log(err.message);
        console.log(err);
    }
}
function dashboard(req: Request, res: Response) {
    try {
        res.render('dashboard');
    } catch (err) {
        if (err instanceof Error) return console.log(err.message);
        console.log(err);
    }
}
function success(req: Request, res: Response) {
    try {
        res.render('success');
    } catch (err) {
        if (err instanceof Error) return console.log(err.message);
        console.log(err);
    }
}
function errorPage(req: Request, res: Response) {
    try {
        res.render('404-page');
    } catch (err) {
        if (err instanceof Error) return console.log(err.message);
        console.log(err);
    }
}
function signupPage(req: Request, res: Response) {
    try {
        res.render('signup');
    } catch (err) {
        res.status(404).json({ errMsg: '404 Error: Page Not Found' });
    }
}
function loginPage(req: Request, res: Response) {
    try {
        res.render('login');
    } catch (err) {
        res.status(404).json({ errMsg: '404 Error: Page Not Found' });
    }
}

export { homepage, dashboard, success, errorPage, signupPage, loginPage, };