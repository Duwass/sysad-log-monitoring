'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Register = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Reset error and success messages
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({ username, email, password, phone }),
            });

            const data = await response.json();

            if (response.ok) {
                // On successful registration, set success message and optionally redirect
                setSuccess('User registered successfully!');
                setUsername('');
                setEmail('');
                setPassword('');
                setPhone('');
                setTimeout(() => {
                    router.push('/sign-in'); // Redirect to login after registration
                }, 2000);
            } else {
                // If registration fails, set error message
                setError(data.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            setError('Something went wrong. Please try again later.');
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
                    <h1 className="w-full font-bold text-4xl text-black">TẠO TÀI KHOẢN</h1>
                    <form className="mt-6 text-black text-justify text-base" onSubmit={handleRegister}>
                        <div className="mb-6">
                            <label className="block relative border border-gray-300 rounded p-2 focus-within:border-blue-500">
                                <span className="absolute -top-2 left-2 bg-white px-1 text-gray-600 text-sm">Tên của bạn là:</span>
                                <input
                                    className="w-full focus:outline-none"
                                    type="text"
                                    name="name"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
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
                                <span className="absolute -top-2 left-2 bg-white px-1 text-gray-600 text-sm">Password:</span>
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
                        <div className="mb-6">
                            <label className="block relative border border-gray-300 rounded p-2 focus-within:border-blue-500">
                                <span className="absolute -top-2 left-2 bg-white px-1 text-gray-600 text-sm">Phone:</span>
                                <input
                                    className="w-full focus:outline-none"
                                    type="tel"
                                    name="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        {error && (
                            <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>
                        )}
                        {success && (
                            <p style={{ color: 'green', marginBottom: '1rem' }}>{success}</p>
                        )}
                        <button type="submit" className="mt-8 inline-block bg-blue-500 text-white px-36 py-3 rounded">Sign up</button>
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

export default Register;