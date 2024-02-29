import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const data = await request.json();
    const { newDomain, email, token } = data;
    console.log("POST DOMAIN", newDomain); // ADMINAAD

    const res = await fetch(`http://localhost:3333/domain/${email}`, {
        method: "PUT",
        body: JSON.stringify({
            newDomain,
        }),
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
        },
    });

    if (!res.ok) {
        const errorData = await res.json();
        return NextResponse.json(errorData, { status: res.status });
    }

    const dados = await res.json();
    return NextResponse.json(dados);
}
