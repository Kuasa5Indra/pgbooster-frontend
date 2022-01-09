import { NextResponse } from "next/server";

export default function middleware(req){
    const { token } = req.cookies;
    const url = req.url;

    if(!token){
        return NextResponse.redirect('/login');
    }
}