import { useState } from "react";
import RemoveTopicBtn from "./RemoveTopicBtn";
import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";

export default function TopicsList({ topics }) {
    const [titleFilter, setTitleFilter] = useState("");
    const [descriptionFilter, setDescriptionFilter] = useState("");
    const [authorFilter, setAuthorFilter] = useState("");
    const [sortField, setSortField] = useState("publishDate"); // Sorting by Date by default
    const [sortOrder, setSortOrder] = useState("asc");

    // Apply filters and sorting to topics
    const filteredTopics = topics
        .filter((topic) => {
            const titleMatch = titleFilter
                ? topic.title.toLowerCase().includes(titleFilter.toLowerCase())
                : true;
            const descriptionMatch = descriptionFilter
                ? topic.description.toLowerCase().includes(descriptionFilter.toLowerCase())
                : true;
            const authorMatch = authorFilter
                ? topic.author.toLowerCase().includes(authorFilter.toLowerCase())
                : true;
            
            // Only include topics that match all active filters
            return titleMatch && descriptionMatch && authorMatch;
        })
        .sort((a, b) => {
            if (sortField === "publishDate") {
                const dateA = new Date(a.publishDate);
                const dateB = new Date(b.publishDate);
                return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
            } else {
                const fieldA = a[sortField].toLowerCase();
                const fieldB = b[sortField].toLowerCase();
                return sortOrder === "asc"
                    ? fieldA.localeCompare(fieldB)
                    : fieldB.localeCompare(fieldA);
            }
        });

    return (
        <div>
            {/* Filter and Sort Controls */}
            <div className="mb-4 flex flex-wrap gap-4 items-center">
                <input
                    type="text"
                    placeholder="Filter by Title"
                    value={titleFilter}
                    onChange={(e) => setTitleFilter(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-black"
                />
                <input
                    type="text"
                    placeholder="Filter by Description"
                    value={descriptionFilter}
                    onChange={(e) => setDescriptionFilter(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-black"
                />
                <input
                    type="text"
                    placeholder="Filter by Author"
                    value={authorFilter}
                    onChange={(e) => setAuthorFilter(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-black"
                />

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-black"
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>

            {/* Render Filtered and Sorted Topics */}
            {filteredTopics.map((topic) => (
                <div key={topic._id} className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start bg-gray-800">
                    <div>
                        <h2 className="font-bold text-2xl text-white">{topic.title}</h2>
                        <p className="text-white">{topic.description}</p>
                        <p className="text-sm text-white">Author: {topic.author}</p>
                        <p className="text-sm text-white">
                            Publish Date: {new Date(topic.publishDate).toLocaleDateString()}
                        </p>
                        {topic.pdf && (
                            <a
                                href={topic.pdf}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                View PDF
                            </a>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <RemoveTopicBtn id={topic._id} />
                        <Link href={`/editTopic/${topic._id}`}>
                            <HiPencilAlt size={24} className="text-blue-500 hover:text-blue-700" />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}
