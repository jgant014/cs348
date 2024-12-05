import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const EditTopicForm = ({ id }) => {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [publishDate, setPublishDate] = useState('');
    const [pdf, setPdf] = useState('');

    useEffect(() => {
        const fetchTopic = async () => {
            try {
                const response = await fetch(`/api/topics/${id}`);
                if (response.ok) {
                    const { topic } = await response.json();
                    setTitle(topic.title);
                    setDescription(topic.description);
                    setAuthor(topic.author);
                    setPublishDate(topic.publishDate.split('T')[0]);
                    setPdf(topic.pdf);
                } else {
                    console.error('Failed to fetch topic');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        if (id) fetchTopic();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/topics/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description, author, publishDate, pdf }),
            });

            if (response.ok) {
                router.push('/');
            } else {
                console.error('Failed to update topic');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 bg-white rounded shadow-md max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-black">Edit Topic</h2>
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
                Description:
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border border-slate-500 px-4 py-2 text-black rounded"
                    required
                />
            </label>
            <label className="flex flex-col">
                Author:
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
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
                PDF Link:
                <input
                    type="url"
                    value={pdf}
                    onChange={(e) => setPdf(e.target.value)}
                    className="border border-slate-500 px-4 py-2 text-black rounded"
                    required
                />
            </label>
            <button type="submit" className="bg-green-600 text-white font-bold py-3 px-6 w-fit rounded">
                Update Topic
            </button>
        </form>
    );
};

export default EditTopicForm;
