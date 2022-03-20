import { NextResponse } from "next/server";

export default function middleware(req){
    const { supertoken } = req.cookies;
    const url = req.url;

    if(!supertoken){
        return NextResponse.redirect('/superadmin/login');
    }
}