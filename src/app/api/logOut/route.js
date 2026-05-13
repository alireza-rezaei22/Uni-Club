import { cookies } from "next/headers"
import { NextResponse } from "next/server";

export async function POST() {
    try{
        const userToken = (await cookies()).set({
            name: 'token',
            value: '',
            httpOnly: true,
            path: '/',
            expires: new Date(0)
        })
        return NextResponse.json({ msg: 'با موفقیت خارج شدید' }, { status: 200 });
    }catch{
        return NextResponse.json({ msg:'اشکالی در خروج پیش آمد' ,status: 500})
    }
}