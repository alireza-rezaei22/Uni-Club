import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-zinc-950 text-gray-400 py-8 mt-5">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

                    <div>
                        <h3 className="text-white text-lg font-bold mb-3">لینک‌های سریع</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="hover:text-zinc-400 transition-colors">
                                    صفحه اصلی
                                </Link>
                            </li>
                            <li>
                                <Link href="/ostads" className="hover:text-white transition-colors">
                                    استاد ها
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="hover:text-white transition-colors">
                                    مبادلات
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-white transition-colors">
                                    درباره ما
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white text-lg font-bold mb-3">ارتباط با من</h3>
                        <div className="flex gap-4">

                            <a
                                href="https://linkedin.com/in/alireza-rezaei22"
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-500 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <Linkedin />
                                </svg>
                            </a>

                            <a
                                href="https://github.com/alireza-rezaei22"
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                            >
                                <Github/>
                                {/* <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg> */}
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-white text-lg font-bold mb-3">مجوز ها</h3>
                        <div className="flex gap-3">
                            <span className='bg-zinc-700 w-20 h-20 flex'></span>
                            <span className='bg-zinc-700 w-20 h-20 flex'></span>
                        </div>
                    </div>

                </div>

                <div className="border-t border-gray-700 pt-6 text-center text-sm">
                    <p>© {currentYear}تمامی حقوق محفوظ است.</p>
                </div>
            </div>
        </footer>
    );
}                                    