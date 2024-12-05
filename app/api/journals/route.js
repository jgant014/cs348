import connectMongoDB from "@/libs/mongodb";
import Journal from "@/models/journal";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { title, publishDate, description } = await request.json();
    await connectMongoDB();
    const journal = await Journal.create({ title, publishDate, description });
    return NextResponse.json({ message: "Journal Created", journal }, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const journals = await Journal.find();
    return NextResponse.json({ journals });
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Journal.findByIdAndDelete(id);
    return NextResponse.json({ message: "Journal deleted" }, { status: 200 });
}
