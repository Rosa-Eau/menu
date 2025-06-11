// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const body = await req.json();
    // 로그인 처리 로직
    return NextResponse.json({ message: '로그인 완료' });
}