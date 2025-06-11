'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/lib/supabase/client';

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            router.push('/admin/dashboard');
        }
    };

    return (
        <main className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">🔐 관리자 로그인</h1>
            <input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-2 mb-3 rounded"
            />
            <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-2 mb-3 rounded"
            />
            {error && <p className="text-red-500 mb-3">{error}</p>}
            <button
                onClick={handleLogin}
                className="w-full bg-black text-white p-2 rounded"
            >
                로그인
            </button>
        </main>
    );
}
