"use client";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

export default function AddTopic() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [author, setAuthor] = useState("");
    const [publishDate, setPublishDate] = useState("");
    const [pdf, setPdf] = useState("");
    const [journalId, setJournalId] = useState("");
    const [journals, setJournals] = useState([]); // State to store journal options

    const router = useRouter();

    useEffect(() => {
        // Fetch all journals to populate the dropdown
        const fetchJournals = async () => {
            try {
                const response = await fetch('https://cs348.onrender.com/api/journals');
                if (response.ok) {
                    const data = await response.json();
                    setJournals(data.journals); // Assumes API returns journals array
                } else {
                    console.error("Failed to fetch journals");
                }
            } catch (error) {
                console.error("Error fetching journals:", error);
            }
        };

        fetchJournals();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || !author || !publishDate || !pdf || !journalId) {
            alert('Please fill out all fields, including selecting a journal.');
            return;
        }

        try {
            const res = await fetch('https://cs348.onrender.com/api/topics', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, description, author, publishDate, pdf, journalId }),
            });

            if (res.ok) {
                router.push('/');
                router.refresh();
            } else {
                throw new Error("Failed to create a topic");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 bg-white rounded shadow-md max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-black">Add New Topic</h2>
            <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="border border-slate-500 px-4 py-2 text-black rounded"
                type="text"
                placeholder="Topic Title"
                required
            />
            <input
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="border border-slate-500 px-4 py-2 text-black rounded"
                type="text"
                placeholder="Topic Description"
                required
            />
            <input
                onChange={(e) => setAuthor(e.target.value)}
                value={author}
                className="border border-slate-500 px-4 py-2 text-black rounded"
                type="text"
                placeholder="Author Name"
                required
            />
            <input
                onChange={(e) => setPublishDate(e.target.value)}
                value={publishDate}
                className="border border-slate-500 px-4 py-2 text-black rounded"
                type="date"
                placeholder="Publish Date"
                required
            />
            <input
                onChange={(e) => setPdf(e.target.value)}
                value={pdf}
                className="border border-slate-500 px-4 py-2 text-black rounded"
                type="url"
                placeholder="PDF Link"
                required
            />
            <select
                value={journalId}
                onChange={(e) => setJournalId(e.target.value)}
                className="border border-slate-500 px-4 py-2 text-black rounded"
                required
            >
                <option value="" disabled>Select Journal</option>
                {journals.map((journal) => (
                    <option key={journal._id} value={journal._id}>
                        {journal.title}
                    </option>
                ))}
            </select>
            <button type="submit" className="bg-green-600 text-white font-bold py-3 px-6 w-fit rounded">
                Add Topic
            </button>
        </form>
    );
}
