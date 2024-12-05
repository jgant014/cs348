"use client";

import { useState, useEffect } from "react";
import RemoveJournalBtn from "./RemoveJournalBtn";
import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";

export default function JournalsList({ onJournalSelect }) {
    const [journals, setJournals] = useState([]);

    useEffect(() => {
        const fetchJournals = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/journals");
                if (res.ok) {
                    const data = await res.json();
                    setJournals(data.journals);
                } else {
                    console.error("Failed to fetch journals");
                }
            } catch (error) {
                console.error("Error loading journals:", error);
            }
        };
        fetchJournals();
    }, []);

    return (
        <div>
            {journals.map((journal) => (
                <div
                    key={journal._id}
                    onClick={() => onJournalSelect(journal._id)}
                    className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
                >
                    <div className="flex-1">
                        <h2 className="font-bold text-2xl">{journal.title}</h2>
                        <p className="text-gray-600">{journal.description}</p>
                        <p className="text-sm text-gray-500">
                            Publish Date: {new Date(journal.publishDate).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="flex gap-2 items-center">
                        {/* Delete Button */}
                        <RemoveJournalBtn id={journal._id} />

                        {/* Edit Button */}
                        <Link href={`/editJournal/${journal._id}`}>
                            <HiPencilAlt size={24} className="text-blue-500 hover:text-blue-700 cursor-pointer" />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}
