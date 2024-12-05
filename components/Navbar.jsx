import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between">
                <div className="flex space-x-4">
                    <Link href="/" className="text-white hover:text-gray-300">
                        Home
                    </Link>
                    <Link href="/addJournal" className="text-white hover:text-gray-300">
                        Add Journal
                    </Link>
                    <Link href="/addTopic" className="text-white hover:text-gray-300">
                        Add Topic
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
