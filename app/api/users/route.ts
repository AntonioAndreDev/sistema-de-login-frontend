import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const data = await request.json();
    const { name, password, email, domain } = data;
    console.log({ name, password, email });

    const res = await fetch("http://localhost:3333/users", {
        method: "POST",
        body: JSON.stringify({
            name,
            email,
            password,
            domain,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        const errorData = await res.json();
        return NextResponse.json(errorData, { status: res.status });
    }

    const dados = await res.json();
    return NextResponse.json(dados);
}
