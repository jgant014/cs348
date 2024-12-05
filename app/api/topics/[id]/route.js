import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { title, description, author, publishDate, pdf } = await request.json();
    await connectMongoDB();

    const topic = await Topic.findByIdAndUpdate(
        id,
        { title, description, author, publishDate, pdf },
        { new: true }
    );

    return NextResponse.json({ message: "Topic updated", topic }, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const topic = await Topic.findById(id);

    return NextResponse.json({ topic }, { status: 200 });
}
