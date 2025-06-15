import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FcGoogle } from "react-icons/fc";
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import toast from 'react-hot-toast';
import { updateProfile } from 'firebase/auth';
import auth from '../Firebase/firebase.config';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }, reset
    } = useForm();
    const navigate = useNavigate();

    const { signIn, createUser, googleSignIn } = useContext(AuthContext);

    const onSubmit = async (data) => {
        try {
            if (isRegistering) {
                const res = await createUser(data.email, data.password);
                if (res) {
                    await updateProfile(auth.currentUser, {
                        displayName: data.fullName,
                    })
                    reset();
                    toast.success('Registration Successful!');
                    setIsRegistering(false);
                }
            } else {
                const res = await signIn(data.email, data.password);
                navigate('/');
                toast.success('Login Successful!');
            }
        } catch (err) {
            console.error(err);
            toast.error(err.message || 'Something went wrong');
        }
    }

    const onGoogleLogin = () => {
        console.log("Redirecting to Google login...");
        googleSignIn()
            .then(res => {
                navigate('/');
                return toast.success(isRegistering ? 'Register Successfully' : 'Login Successfully');
            })
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background-light px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-background-card p-8 rounded-2xl shadow-lg w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-text-base">
                    {isRegistering ? "Create an Account" : "Login to TypeTogether"}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-text-base">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand outline-none"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-base">Password</label>
                        <input
                            type="password"
                            {...register("password", { required: "Password is required" })}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand outline-none"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    {isRegistering && (
                        <div>
                            <label className="block text-sm font-medium text-text-base">Full Name</label>
                            <input
                                type="text"
                                {...register("fullName", { required: "Full name is required" })}
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand outline-none"
                            />
                            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-brand hover:bg-brand-dark text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                    >
                        {isSubmitting
                            ? isRegistering
                                ? "Registering..."
                                : "Logging in..."
                            : isRegistering
                                ? "Register"
                                : "Login"}
                    </button>
                </form>

                <div className="mt-4">
                    <motion.button
                        onClick={onGoogleLogin}
                        whileTap={{ scale: 0.95 }}
                        className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 shadow-sm py-2 px-4 rounded-lg hover:shadow-md transition duration-300"
                    >
                        <FcGoogle size={20} />
                        <span className="text-gray-700 font-medium">
                            {isRegistering ? "Sign up with Google" : "Login with Google"}
                        </span>
                    </motion.button>
                </div>

                <div className="mt-6 text-center text-sm text-text-muted">
                    {isRegistering ? (
                        <>
                            Already have an account?{" "}
                            <button
                                onClick={() => setIsRegistering(false)}
                                className="text-brand font-medium hover:underline"
                            >
                                Log in
                            </button>
                        </>
                    ) : (
                        <>
                            Don’t have an account?{" "}
                            <button
                                onClick={() => setIsRegistering(true)}
                                className="text-brand font-medium hover:underline"
                            >
                                Register
                            </button>
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
