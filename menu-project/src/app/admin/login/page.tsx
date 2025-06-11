'use client';

import { useState } from 'react';
import supabase from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (loading) return;

        setLoading(true);
        setError('');

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            setError(error.message);
        } else {
            router.push('/admin/dashboard');
        }
    };

    return (
        <main className="max-w-sm mx-auto p-6 space-y-4">
            <h1 className="text-xl font-bold text-center">🔐 관리자 로그인</h1>

            <input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-2 rounded"
                disabled={loading}
            />
            <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-2 rounded"
                disabled={loading}
            />
            <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-blue-600 text-white p-2 rounded disabled:opacity-50"
            >
                {loading ? '로그인 중...' : '로그인'}
            </button>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </main>
    );
}