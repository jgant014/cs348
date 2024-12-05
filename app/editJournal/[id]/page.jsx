"use client";

import EditJournalForm from "@/components/EditJournalForm";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

const EditJournalPage = () => {
    const { id } = useParams(); // Get the journal ID from URL parameters
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) setLoading(false); // Only set loading to false once the ID is available
    }, [id]);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Edit Journal</h1>
            <EditJournalForm id={id} />
        </div>
    );
};

export default EditJournalPage;
