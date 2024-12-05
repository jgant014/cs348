"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function RemoveTopicBtn({ id }) {
    const router = useRouter();

    const handleDelete = async () => {
        const confirmed = confirm("Are you sure you want to delete this topic?");
        if (confirmed) {
            const res = await fetch(`http://localhost:3000/api/topics?id=${id}`, { // Using query parameter
                method: "DELETE",
            });
            if (res.ok) {
                router.refresh(); 
            } else {
                console.error("Failed to delete topic");
            }
        }
    };

    return (
        <button onClick={handleDelete} className="text-red-400">
            <HiOutlineTrash size={24} />
        </button>
    );
}
