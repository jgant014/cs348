import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const EditJournalForm = ({ id }) => {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [publishDate, setPublishDate] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchJournal = async () => {
            try {
                const response = await fetch(`/api/journals/${id}`);
                if (response.ok) {
                    const { journal } = await response.json();
                    setTitle(journal.title);
                    setPublishDate(journal.publishDate.split('T')[0]);
                    setDescription(journal.description);
                } else {
                    console.error('Failed to fetch journal');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        if (id) fetchJournal();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/journals/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, publishDate, description }),
            });

            if (response.ok) {
                router.push('/');
            } else {
                console.error('Failed to update journal');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 bg-white rounded shadow-md max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">Edit Journal</h2>
            <label className="flex flex-col">
                Title:
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-slate-500 px-4 py-2 text-black rounded"
                    required
                />
            </label>
            <label className="flex flex-col">
                Publish Date:
                <input
                    type="date"
                    value={publishDate}
                    onChange={(e) => setPublishDate(e.target.value)}
                    className="border border-slate-500 px-4 py-2 text-black rounded"
                    required
                />
            </label>
            <label className="flex flex-col">
                Description:
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border border-slate-500 px-4 py-2 text-black rounded"
                    required
                />
            </label>
            <button type="submit" className="bg-green-600 text-white font-bold py-3 px-6 w-fit rounded">
                Update Journal
            </button>
        </form>
    );
};

export default EditJournalForm;
