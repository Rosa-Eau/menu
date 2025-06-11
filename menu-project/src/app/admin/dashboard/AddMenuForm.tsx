'use client';

import { useState } from 'react';

type Props = {
    onAdd: (item: {
        title: string;
        price: number;
        description: string;
        category: string;
    }) => void;
};

const CATEGORY_OPTIONS = ['피트위스키', '버번', '셰리위스키', '라이', '아일랜드위스키', '스카치위스키'];

export default function AddMenuForm({ onAdd }: Props) {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState(CATEGORY_OPTIONS[0]); // 기본값 설정
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        const numericPrice = parseInt(price);

        if (!title || !price || isNaN(numericPrice)) {
            setMessage('❗ 메뉴명과 숫자 가격은 필수입니다.');
            return;
        }

        await onAdd({
            title,
            price: numericPrice,
            description: description || '',
            category,
        });

        setTitle('');
        setPrice('');
        setCategory(CATEGORY_OPTIONS[0]);
        setDescription('');
        setMessage('✅ 메뉴가 등록되었습니다!');
    };

    return (
        <div className="space-y-3 border border-gray-300 dark:border-neutral-700 p-4 rounded bg-white dark:bg-neutral-900 text-black dark:text-white">
            <input
                type="text"
                placeholder="메뉴명"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 dark:border-neutral-700 p-2 rounded bg-white dark:bg-neutral-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
            <input
                type="number"
                placeholder="가격"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-gray-300 dark:border-neutral-700 p-2 rounded bg-white dark:bg-neutral-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
            <textarea
                placeholder="설명"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 dark:border-neutral-700 p-2 rounded bg-white dark:bg-neutral-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 dark:border-neutral-700 p-2 rounded bg-white dark:bg-neutral-800 text-black dark:text-white"
            >
                {CATEGORY_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>

            <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
            >
                메뉴 등록
            </button>
            {message && <p className="text-sm text-center mt-2">{message}</p>}
        </div>
    );
}
