import connectMongoDB from "@/libs/mongodb";
import Journal from "@/models/journal";
import { NextResponse } from "next/server";
import Topic from "@/models/topic";

export async function PUT(request, { params }) {
    const { id } = params;
    const { title, publishDate, description } = await request.json();
    await connectMongoDB();
    const journal = await Journal.findByIdAndUpdate(
        id,
        { title, publishDate, description },
        { new: true }
    );
    return NextResponse.json({ message: "Journal updated", journal }, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const journal = await Journal.findById(id).populate('topics');
    return NextResponse.json({ journal }, { status: 200 });
}

export async function DELETE(request, { params }) {
    const { id } = params; // The journal ID to delete

    try {
        await connectMongoDB();

        // Delete the journal
        const deletedJournal = await Journal.findByIdAndDelete(id);
        if (!deletedJournal) {
            return NextResponse.json({ message: "Journal not found" }, { status: 404 });
        }

        // Delete associated topics
        await Topic.deleteMany({ journalId: id });

        return NextResponse.json({ message: "Journal and associated topics deleted" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to delete journal and topics" }, { status: 500 });
    }
}

