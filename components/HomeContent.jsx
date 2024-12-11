"use client";

import { useState, useEffect } from "react";
import JournalsList from "./JournalsList";
import TopicsList from "./TopicsList";

export default function HomeContent() {
    const [selectedJournalId, setSelectedJournalId] = useState(null);
    const [allTopics, setAllTopics] = useState([]); // Store all topics
    const [filteredTopics, setFilteredTopics] = useState([]); // Store topics to display based on journal selection

    useEffect(() => {
        // Fetch all topics once when component mounts
        const fetchTopics = async () => {
            try {
                const res = await fetch("https://cs348.onrender/api/topics");
                const data = await res.json();
                setAllTopics(data.topics); // Store all topics in state
                setFilteredTopics(data.topics); // Initially show all topics
            } catch (error) {
                console.error("Error loading topics:", error);
            }
        };

        fetchTopics();
    }, []);

    const handleJournalSelect = (journalId) => {
        setSelectedJournalId(journalId);
        setFilteredTopics(allTopics.filter((topic) => topic.journalId === journalId)); // Filter topics based on selected journal
    };

    const resetJournalSelection = () => {
        setSelectedJournalId(null);
        setFilteredTopics(allTopics); // Show all topics when no journal is selected
    };

    return (
        <div className="flex gap-8">
            {/* Journals on the left */}
            <section className="flex-1">
                <h2 className="text-2xl font-semibold mb-4">Journals</h2>
                <JournalsList onJournalSelect={handleJournalSelect} />
                <button onClick={resetJournalSelection} className="mt-4 text-blue-500 hover:underline">
                    Show All Topics
                </button>
            </section>

            {/* Topics on the right */}
            <section className="flex-1">
                <h2 className="text-2xl font-semibold mb-4">Topics</h2>
                <TopicsList topics={filteredTopics} /> {/* Pass filtered topics */}
            </section>
        </div>
    );
}
