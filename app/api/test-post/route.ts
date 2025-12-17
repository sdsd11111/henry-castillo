import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        return NextResponse.json({
            success: true,
            message: 'POST Verified',
            received: body
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: 'Failed to parse JSON'
        }, { status: 400 })
    }
}
