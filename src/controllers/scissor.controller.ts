import { Request, Response } from "express";

function homepage(req: Request, res: Response) {
    try {
        res.status(200).render('index');
    } catch (err) {
        res.status(500).render('500-page');
        if (err instanceof Error) return console.log(err.message);
        console.log(err);
    }
}
function success(req: Request, res: Response) {
    try {
        res.status(200).render('success');
    } catch (err) {
        res.status(500).render('500-page');
        if (err instanceof Error) return console.log(err.message);
        console.log(err);
    }
}
function errorPage(req: Request, res: Response) {
    try {
        res.status(404).render('404-page');
    } catch (err) {
        res.status(500).render('500-page');
        if (err instanceof Error) return console.log(err.message);
        console.log(err);
    }
}
function signupPage(req: Request, res: Response) {
    try {
        res.render('signup');
    } catch (err) {
        res.status(500).render('500-page');
        if (err instanceof Error) return console.log(err.message);
        console.log(err);
    }
}
function loginPage(req: Request, res: Response) {
    try {
        res.render('login');
    } catch (err) {
        res.status(500).render('500-page');
        if (err instanceof Error) return console.log(err.message);
        console.log(err);
    }
}

export { homepage, success, errorPage, signupPage, loginPage, };