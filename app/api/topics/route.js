import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import Journal from "@/models/journal";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { journalId, title, description, author, publishDate, pdf } = await request.json();
    await connectMongoDB();

    const topic = await Topic.create({ journalId, title, description, author, publishDate, pdf });
    await Journal.findByIdAndUpdate(journalId, { $push: { topics: topic._id } });

    return NextResponse.json({ message: "Topic Created", topic }, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const topics = await Topic.find();
    return NextResponse.json({ topics });
}


export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();

    const topic = await Topic.findByIdAndDelete(id);
    if (topic) {
        await Journal.findByIdAndUpdate(topic.journalId, { $pull: { topics: topic._id } });
    }

    return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}


