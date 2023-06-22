import { Request, Response } from "express";

function homepage(req: Request, res: Response) {
    try {
        res.status(200).render('index');
    } catch (err) {
        if (err instanceof Error) return console.log(err.message);
        console.log(err);
    }
}
function success(req: Request, res: Response) {
    try {
        res.status(200).render('success');
    } catch (err) {
        if (err instanceof Error) return console.log(err.message);
        console.log(err);
    }
}
function errorPage(req: Request, res: Response) {
    try {
        res.status(404).render('404-page');
    } catch (err) {
        if (err instanceof Error) return console.log(err.message);
        console.log(err);
    }
}
function signupPage(req: Request, res: Response) {
    try {
        res.render('signup');
    } catch (err) {
        res.status(404).render('404-page');
    }
}
function loginPage(req: Request, res: Response) {
    try {
        res.render('login');
    } catch (err) {
        res.status(404).render('404-page');
    }
}

export { homepage, success, errorPage, signupPage, loginPage, };