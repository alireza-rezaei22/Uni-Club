import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <Image alt='404 pic' src={'/images/1784388741.png'} width={300} height={300} className='rounded-full'/>
      <h1 className="text-6xl font-bold text-gray-800 my-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-6">صفحه یافت نشد!</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        متاسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا ممکن است حذف شده باشد.
      </p>

      <Link
        href="/"
        className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200 shadow-md"
      >
        بازگشت به صفحه اصلی
      </Link>
    </div>
  );
}