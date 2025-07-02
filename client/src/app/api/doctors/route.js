import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors`);
        if (!res.ok) {
            return NextResponse.json({ error: 'Failed to fetch doctors from backend' }, { status: res.status });
        }
        const doctors = await res.json();
        return NextResponse.json(doctors);
    } catch (error) {
        return NextResponse.json({ error: 'Server error fetching doctors' }, { status: 500 });
    }
}