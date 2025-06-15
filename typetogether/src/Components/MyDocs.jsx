import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthProvider";
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { IoArrowBack } from "react-icons/io5"; // Back icon from react-icons
import { useNavigate } from "react-router-dom";


const MyDocs = () => {
    const [docs, setDocs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchDocuments = async () => {
            if (!user?.email) return;
            try {
                const res = await axios.get(`${import.meta.env.VITE_SERVERAPI}/documents?email=${user.email}`);
                setDocs(res.data);
            } catch (err) {
                console.error("Error fetching documents:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDocuments();
    }, [user?.email]);

    const getPreviewText = (data) => {
        if (!data?.ops || !Array.isArray(data.ops)) return "";
        return data.ops.map(op => op.insert).join("").slice(0, 100) + "...";
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "you want to delete this document?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${import.meta.env.VITE_SERVERAPI}/documents/${id}`);
                    setDocs(prev => prev.filter(doc => doc._id !== id));
                    Swal.fire({
                        title: "Deleted!",
                        text: "Document deleted successfully",
                        icon: "success"
                    });
                } catch (err) {
                    console.error(err);
                    return toast.error("Failed to delete document");
                }
            }
        });
    };

    const handleShare = async (docId) => {
        const sharedEmail = prompt("Enter email to share with:");
        if (!sharedEmail) return;

        try {
            await axios.post("/share-document", { documentId: docId, sharedEmail });
            toast.success("Document shared!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to share document");
        }
    };


    return (
        <div className="p-6">
            <div className="flex justify-between">
                <h2 className="text-2xl font-semibold mb-4">My Documents</h2>
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center text-blue-600 hover:text-blue-800 mb-4 hover:cursor-pointer"
                >
                    <IoArrowBack className="mr-2" size={20} />
                    Back to Dashboard
                </button>
            </div>


            {loading ? (
                <div className="text-center text-gray-500">Loading documents...</div>
            ) : docs.length === 0 ? (
                <div className="text-center text-gray-500">You have no documents yet.</div>
            ) : (
                <ul className="space-y-3">
                    {docs.map(doc => (
                        <li key={doc._id} className="p-4 bg-white shadow rounded-lg border relative">
                            <div className="text-lg font-medium break-all">📝 Document ID: {doc._id}</div>
                            <div className="text-sm text-gray-700 mt-2">
                                {getPreviewText(doc.data)}
                            </div>
                            {doc.updatedAt && (
                                <div className="text-xs text-gray-500 mt-1">
                                    Last updated: {new Date(doc.updatedAt).toLocaleString()}
                                </div>
                            )}
                            <button
                                onClick={() => handleDelete(doc._id)}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                            >
                                🗑 Delete
                            </button>
                            <button
                                onClick={() => handleShare(doc._id)}
                                className="text-sm text-blue-600 underline hover:text-blue-800"
                            >
                                Share
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyDocs;
