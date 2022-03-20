import { NextResponse } from "next/server";

export default function middleware(req){
    const { supertoken } = req.cookies;
    const url = req.url;

    if(supertoken && url == '/superadmin/login'){
        return NextResponse.redirect('/superadmin/users');
    }
}