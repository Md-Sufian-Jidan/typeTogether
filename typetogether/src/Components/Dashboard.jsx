import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaPlus, FaShareAlt } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import { v4 as uuid } from 'uuid';
import { Helmet } from "react-helmet";

const Dashboard = () => {

    const sharedDocs = [
        { id: "3", title: "Team Strategy" },
    ];

    return (
        <div className="min-h-screen bg-background-light p-6">
            <Helmet>
                TypeTogether | Dashboard
            </Helmet>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-5xl mx-auto"
            >
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-text-base mb-2">
                        Welcome to TypeTogether
                    </h1>
                    <p className="text-text-muted">
                        Create, share, and collaborate on documents with your team in real time.
                    </p>
                </header>

                {/* My Docs Section */}
                <section className="mb-10">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-text-base">My Documents</h2>
                        <Link
                            to={`/docs/${uuid()}`}
                            className="inline-flex items-center gap-2 bg-brand text-white py-2 px-4 rounded-lg hover:bg-brand-dark transition"
                        >
                            <FaPlus /> New Document
                        </Link>
                    </div>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        <Link
                            to={`/my-docs`}
                            className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition flex items-center gap-3"
                        >
                            <MdDescription size={24} className="text-brand" />
                            <span className="text-text-base font-medium">My Docs</span>
                        </Link>
                    </div>
                </section>

                {/* Shared Docs Section */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-text-base">Shared with Me</h2>
                    </div>
                    {sharedDocs.length > 0 ? (
                        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                            {sharedDocs.map((doc) => (
                                <Link
                                    key={doc.id}
                                    to={`/editor/${doc.id}`}
                                    className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition flex items-center gap-3"
                                >
                                    <FaShareAlt size={20} className="text-green-500" />
                                    <span className="text-text-base font-medium">{doc.title}</span>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-text-muted">No shared documents.</p>
                    )}
                </section>
            </motion.div>
        </div>
    );
};

export default Dashboard;
