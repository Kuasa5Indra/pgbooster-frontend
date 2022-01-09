import { NextResponse } from "next/server";

const unprotectedRoutes = ['/login', '/register', '/forgot-password', '/reset-password',
    '/account/password-challenge', '/account/verify'];

export default function middleware(req){
    const { token } = req.cookies;
    const url = req.url;

    if(token && unprotectedRoutes.includes(url)){
        return NextResponse.redirect('/dashboard');
    }
}