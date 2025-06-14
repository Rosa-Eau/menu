'use client';

import { useState } from 'react';

type Props = {
    onAdd: (item: {
        title: string;
        price: number;
        description: string;
        category: string;
        abv?: string;
        cask?: string;
        nose?: string;
        palate?: string;
        finish?: string;
        info?: string;
    }) => Promise<{ success: boolean; error?: string }>;
};

const CATEGORY_OPTIONS = ['피트 위스키', '버번 위스키', '셰리 위스키', '라이 위스키', '아일랜드 위스키', '스카치 위스키'];

export default function AddMenuForm({ onAdd }: Props) {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState(CATEGORY_OPTIONS[0]); // 기본값 설정
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [abv, setAbv] = useState('');
    const [cask, setCask] = useState('');
    const [nose, setNose] = useState('');
    const [palate, setPalate] = useState('');
    const [finish, setFinish] = useState('');
    const [info, setInfo] = useState('');

    const handleSubmit = async () => {
        const numericPrice = parseInt(price);

        if (!title || !price || isNaN(numericPrice)) {
            setMessage('❗ 메뉴명과 숫자 가격은 필수입니다.');
            return;
        }

        const result = await onAdd({
            title,
            price: numericPrice,
            description: description || '',
            category,
            abv: abv || '',
            cask: cask || '',
            nose: nose || '',
            palate: palate || '',
            finish: finish || '',
            info: info || '',
        });

        if (result?.success) {
            setTitle('');
            setPrice('');
            setCategory(CATEGORY_OPTIONS[0]);
            setDescription('');
            setAbv('');
            setCask('');
            setNose('');
            setPalate('');
            setFinish('');
            setInfo('');
            setMessage('✅ 메뉴가 등록되었습니다!');
        } else {
            setMessage('❌ 메뉴 등록에 실패했습니다.');
        }
    };

    return (
        <div className="space-y-3 border border-gray-300 dark:border-neutral-700 p-4 rounded bg-white dark:bg-neutral-900 text-black dark:text-white" style={{ fontFamily: 'Chosunilbo_myungjo' }}>
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
            <input
                type="text"
                placeholder="ABV (도수)"
                value={abv}
                onChange={(e) => setAbv(e.target.value)}
                className="w-full border border-gray-300 dark:border-neutral-700 p-2 rounded bg-white dark:bg-neutral-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
            <input
                type="text"
                placeholder="Cask (숙성 캐스크)"
                value={cask}
                onChange={(e) => setCask(e.target.value)}
                className="w-full border border-gray-300 dark:border-neutral-700 p-2 rounded bg-white dark:bg-neutral-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
            <input
                type="text"
                placeholder="Nose (향)"
                value={nose}
                onChange={(e) => setNose(e.target.value)}
                className="w-full border border-gray-300 dark:border-neutral-700 p-2 rounded bg-white dark:bg-neutral-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
            <input
                type="text"
                placeholder="Palate (맛)"
                value={palate}
                onChange={(e) => setPalate(e.target.value)}
                className="w-full border border-gray-300 dark:border-neutral-700 p-2 rounded bg-white dark:bg-neutral-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
            <input
                type="text"
                placeholder="Finish (피니시)"
                value={finish}
                onChange={(e) => setFinish(e.target.value)}
                className="w-full border border-gray-300 dark:border-neutral-700 p-2 rounded bg-white dark:bg-neutral-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
            <textarea
                placeholder="Info (세부 정보)"
                value={info}
                onChange={(e) => setInfo(e.target.value)}
                className="w-full border border-gray-300 dark:border-neutral-700 p-2 rounded bg-white dark:bg-neutral-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
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
