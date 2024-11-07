'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logger from "../../logger";
const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Remove userID from storage
    localStorage.removeItem('userID');

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Reset error state
        setError(null);

        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Redirect or handle success
                alert('Login successful!');

                // Add userID to local storage
                localStorage.setItem('userID', data.user.id);

                // Log the login event
                logger.info(`User ${email} logged in`);

                // Redirect to dashboard
                router.push('/dashboard');
            } else {
                // Set the error message if login fails
                setError(data.message || 'Login failed. Please try again.');
                logger.error('Login failed');
            }
        } catch (error) {
            setError('Something went wrong. Please try again later.');
            
            let message
	        if (error instanceof Error) message = error.message
	        else message = String(error)
	        reportError({ message })

            console.log(email + ', ' + password)
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
            <header className="absolute top-2 left-2 m-4 font-bold text-2xl text-black">
                ELK STACK TEST
            </header>
            <div className="flex justify-between w-full items-center font-mono text-sm lg:flex">
                <div className="text-left pl-6 font-sans">
                    <br /> <br />
                    <h1 className="w-full font-bold text-4xl text-black">ĐĂNG NHẬP</h1>
                    <form className="mt-6 text-black text-justify text-base" onSubmit={handleLogin}>
                        <div className="mb-6">
                            <label className="block relative border border-gray-300 rounded p-2 focus-within:border-blue-500">
                                <span className="absolute -top-2 left-2 bg-white px-1 text-gray-600 text-sm">Email:</span>
                                <input
                                    className="w-full focus:outline-none"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <div className="mb-6">
                            <label className="block relative border border-gray-300 rounded p-2 focus-within:border-blue-500">
                                <span className="absolute -top-2 left-2 bg-white px-1 text-gray-600 text-sm">Mật khẩu:</span>
                                <input
                                    className="w-full focus:outline-none"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        {error && (
                            <p style={{ color: 'red', marginBottom: '1rem', maxWidth: '380px'}}>{error}</p>
                        )}
                        <button type="submit" className="mt-8 inline-block bg-blue-500 text-white px-36 py-3 rounded">Đăng nhập</button>

                        <div className="my-4 flex justify-center items-center text-gray-600 text-sm">
                            Chưa có tài khoản?
                            <a href="/register" style={{color: 'blue', textDecoration: 'underline', marginLeft: '5px'}}>Đăng ký</a>
                        </div>
                    </form>
                </div>
                <div className="flex justify-end">
                    <Image
                        src="/elk-stack-logo.png"
                        alt="elk-stack-logo Image"
                        width={499}
                        height={605}
                        className="max-w-full h-auto"
                    />
                </div>
            </div>
        </main>
    );
};

export default Login;