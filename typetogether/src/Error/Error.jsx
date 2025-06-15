import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const Error = () => {
    return (
        <>
            <Helmet>

                <title>TypeTogether | 404 Not Found</title>
            </Helmet>

            <div className="flex flex-col items-center justify-center h-screen bg-rose-50 px-4 text-center">
                <motion.h1
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-[6rem] font-extrabold text-rose-600 drop-shadow"
                >
                    404
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl font-semibold text-gray-800 mb-2"
                >
                    Page Not Found
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-gray-500 max-w-md"
                >
                    Sorry, the page you're looking for doesn’t exist or has been moved.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-6"
                >
                    <Link
                        to="/"
                        className="inline-block bg-rose-600 text-white px-6 py-2 rounded-full hover:bg-rose-700 transition"
                    >
                        Back to Home
                    </Link>
                </motion.div>
            </div>
        </>
    );
}

export default Error;