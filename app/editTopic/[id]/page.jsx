"use client";

import EditTopicForm from "@/components/EditTopicForm";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

const EditTopicPage = () => {
    const { id } = useParams(); // Get the topic ID from URL parameters
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) setLoading(false); // Only set loading to false once the ID is available
    }, [id]);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Edit Topic</h1>
            <EditTopicForm id={id} />
        </div>
    );
};

export default EditTopicPage;
