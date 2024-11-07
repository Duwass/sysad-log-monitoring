'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logger from "../../logger";

const Register = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const router = useRouter();

    // Remove userID from storage
    localStorage.removeItem('userID');

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Reset error and success messages
        setError(null);
        setSuccess(null);

        // success variable seems redundant

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
                //logging the registration event
                logger.info(`User ${username} registered`);

                // On successful registration, set success message and optionally redirect
                setSuccess('User registered successfully!');

                try {
                    const login_response = await fetch('http://localhost:3001/api/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                        body: JSON.stringify({ email, password }),
                    });

                    const login_data = await login_response.json();

                    if (login_response.ok) {
                        // Redirect or handle success
                        alert('Register successful!');

                        // Add userID to local storage
                        localStorage.setItem('userID', login_data.user.id);

                        // Log the login event
                        logger.info(`User ${email} logged in`);
                        
                        // Redirect to dashboard
                        router.push('/dashboard'); 
                    }
                } catch { }
            } else {
                // If registration fails, set error message
                logger.error('Registration failed');
                setError(data.message || 'Registration failed. Please try again.');
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
                    <h1 className="w-full font-bold text-4xl text-black">ĐĂNG KÝ</h1>
                    <form className="mt-6 text-black text-justify text-base" onSubmit={handleRegister}>
                        <div className="mb-6">
                            <label className="block relative border border-gray-300 rounded p-2 focus-within:border-blue-500">
                                <span className="absolute -top-2 left-2 bg-white px-1 text-gray-600 text-sm">Họ tên:</span>
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
                        <div className="mb-6">
                            <label className="block relative border border-gray-300 rounded p-2 focus-within:border-blue-500">
                                <span className="absolute -top-2 left-2 bg-white px-1 text-gray-600 text-sm">Điện thoại:</span>
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
                            <p style={{ color: 'red', marginBottom: '1rem', maxWidth: '380px'}}>{error}</p>
                        )}
                        {success && (
                            <p style={{ color: 'green', marginBottom: '1rem' }}>{success}</p>
                        )}
                        <button type="submit" className="mt-8 inline-block bg-blue-500 text-white px-36 py-3 rounded">Tạo tài khoản</button>

                        <div className="my-4 flex justify-center items-center text-gray-600 text-sm">
                            Đã có tài khoản?
                            <a href="/login" style={{color: 'blue', textDecoration: 'underline', marginLeft: '5px'}}>Đăng nhập</a>
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

export default Register;