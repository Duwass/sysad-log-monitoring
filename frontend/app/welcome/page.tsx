import Image from "next/image";
import Link from 'next/link';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-48 bg-white relative">
            <header className="absolute top-2 left-2 m-4 font-bold text-2xl text-black">
                ELK STACK TEST
            </header>
            <div className="flex flex-col justify-center items-center font-mono text-sm lg:flex mt-0">
                <div className="text-center pl-6 font-sans">
                    <h1 className="w-full font-bold text-7xl text-black"> MÀN DEMO LOGIN<br/> ĐẾN ĐÂY LÀ HẾT</h1>
                    <p className="mt-6 text-black text-center text-base text-xl">
                        Xin chúc mừng, bạn đã vượt qua thử thách đầu tiên <br />
                        Bí mật đã được tiết lộ, hãy tiếp tục hành trình của mình tại home page <br />
                    </p>
                    <Link legacyBehavior href="">
                        <a className="mt-8 inline-block bg-red-500 text-white px-12 py-3 rounded-full">Bấm vào đây chả có gì đâu</a>
                    </Link>
                </div>
            </div>
        </main>
    );
}
