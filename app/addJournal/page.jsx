"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddJournal() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [publishDate, setPublishDate] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !publishDate || !description) {
            alert('Please fill out all fields.');
            return;
        }

        try {
            const response = await fetch('/api/journals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, publishDate, description }),
            });

            if (response.ok) {
                router.push('/'); // Redirect to homepage or journal listing after adding
                router.refresh();
            } else {
                throw new Error('Failed to add journal');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 bg-white rounded shadow-md max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-black">Add New Journal</h2>
            <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="border border-slate-500 px-4 py-2 text-black rounded"
                type="text"
                placeholder="Journal Title"
                required
            />
            <input
                onChange={(e) => setPublishDate(e.target.value)}
                value={publishDate}
                className="border border-slate-500 px-4 py-2 text-black rounded"
                type="date"
                required
            />
            <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="border border-slate-500 px-4 py-2 text-black rounded"
                placeholder="Journal Description"
                required
            />
            <button type="submit" className="bg-green-600 text-white font-bold py-3 px-6 w-fit rounded">
                Add Journal
            </button>
        </form>
    );
}
