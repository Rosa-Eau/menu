'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (loading) return;

        setLoading(true);
        setError('');

        const res = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        setLoading(false);

        if (res?.ok) {
            router.push('/admin/dashboard');
        } else {
            setError('이메일 또는 비밀번호가 올바르지 않습니다.');
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white px-4" style={{fontFamily: 'Chosunilbo_myungjo'}}>
            <div className="w-full max-w-sm p-6 space-y-4 bg-gray-100 dark:bg-neutral-900 rounded-xl shadow">
                <h1 className="text-2xl font-bold text-center">🔐 관리자 로그인</h1>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 dark:border-neutral-700 rounded px-4 py-2 bg-white dark:bg-neutral-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                        disabled={loading}
                    />

                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 dark:border-neutral-700 rounded px-4 py-2 bg-white dark:bg-neutral-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                        disabled={loading}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded disabled:opacity-50 transition"
                    >
                        {loading ? '로그인 중...' : '로그인'}
                    </button>
                </form>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            </div>
        </main>
    );
}