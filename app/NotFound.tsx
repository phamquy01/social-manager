// app/not-found.tsx
'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4">
      <h1 className="text-4xl font-bold mb-2">404 - Không tìm thấy trang</h1>
      <p className="text-lg text-gray-600 mb-4">
        Trang bạn đang tìm không tồn tại hoặc đã bị xóa.
      </p>
      <Link href="/" className="text-blue-500 underline">
        Quay lại trang chủ
      </Link>
    </div>
  );
}
