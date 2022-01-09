import { NextResponse } from "next/server";

export default function middleware(req){
    const { session, unverifiedEmail } = req.cookies;
    const url = req.url;

    if(!session && url == '/account/password-challenge'){
        return NextResponse.redirect('/login');
    }

    if(!unverifiedEmail && url == '/account/verify'){
        return NextResponse.redirect('/login');
    }
}