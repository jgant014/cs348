"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function RemoveJournalBtn({ id }) {
    const router = useRouter();

    const handleDelete = async () => {
        const confirmed = confirm("Are you sure you want to delete this journal and all associated topics?");
        if (confirmed) {
            const res = await fetch(`http://localhost:3000/api/journals/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                router.refresh(); 
            } else {
                console.error("Failed to delete journal");
            }
        }
    };

    return (
        <button onClick={handleDelete} className="text-red-400">
            <HiOutlineTrash size={24} />
        </button>
    );
}
