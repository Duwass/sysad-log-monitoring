import Link from 'next/link';
import Image from 'next/image';
export default function LoginPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
            <header className="absolute top-2 left-2 m-4 font-bold text-2xl text-black">
                ELK STACK TEST
            </header>
            <div className="flex justify-between w-full items-center font-mono text-sm lg:flex">
                <div className="text-left pl-6 font-sans">
                    <br /> <br /> <br /> <br />
                    <h1 className="w-full font-bold text-4xl text-black">ĐĂNG NHẬP</h1>
                    <form className="mt-6 text-black text-justify text-base">
                        <div className="mb-6">
                            <label className="block relative border border-gray-300 rounded p-2 focus-within:border-blue-500">
                                <span className="absolute -top-2 left-2 bg-white px-1 text-gray-600 text-sm">Email:</span>
                                <input className="w-full focus:outline-none" type="email" name="email" />
                            </label>
                        </div>
                        <div>
                            <label className="block relative border border-gray-300 rounded p-2 focus-within:border-blue-500">
                                <span className="absolute -top-2 left-2 bg-white px-1 text-gray-600 text-sm">Mật khẩu:</span>
                                <input className="w-full focus:outline-none" type="password" name="password" />
                            </label>
                        </div>
                    </form>
                    <Link legacyBehavior href="/welcome">
                        <a className="mt-8 inline-block bg-blue-500 text-white px-36 py-3 rounded">Sign in</a>
                    </Link>
                    <div className="mt-4 text-center text-black">
                        <div className="flex items-center">
                            <hr className="flex-grow border-t-2 border-gray" />
                            <span className="mx-4 text-black-500">Hoặc</span>
                            <hr className="flex-grow border-t-2 border-gray" />
                        </div>
                        <a href="https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex justify-between items-center bg-white-500 text-black px-20 py-3 rounded border border-black border-opacity-25 font-bold">
                            <span>Tiếp tục với Google</span>
                            <img src="/google-logo.png" alt="Google Logo" className="h-5 w-5 ml-3" />
                        </a>
                        <p> <br /> Chưa có tài khoản? <Link legacyBehavior href="/sign-up"><a className="underline text-blue-500 font-bold">Tạo tài khoản</a></Link></p>
                    </div>
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
}