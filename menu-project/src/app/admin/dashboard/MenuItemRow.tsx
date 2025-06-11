'use client';

import { useState } from 'react';

type Props = {
    item: {
        id: number;
        title: string;
        price: number;
        description: string;
    };
    onDelete: (id: number) => void;
    onUpdate: (item: any) => void;
};

export default function MenuItemRow({ item, onDelete, onUpdate }: Props) {
    const [edit, setEdit] = useState(false);
    const [form, setForm] = useState(item);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <li className="border p-4 rounded space-y-2">
            {edit ? (
                <>
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full border p-1 rounded"
                    />
                    <input
                        name="price"
                        type="number"
                        value={form.price}
                        onChange={handleChange}
                        className="w-full border p-1 rounded"
                    />
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full border p-1 rounded"
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                onUpdate(form);
                                setEdit(false);
                            }}
                            className="bg-green-600 text-white px-2 py-1 rounded"
                        >
                            저장
                        </button>
                        <button
                            onClick={() => setEdit(false)}
                            className="bg-gray-400 text-white px-2 py-1 rounded"
                        >
                            취소
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-semibold">{item.title}</h2>
                            <p>{item.description}</p>
                            <p className="font-bold">{item.price.toLocaleString()}원</p>
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={() => setEdit(true)}
                                className="bg-yellow-500 text-white px-2 py-1 rounded"
                            >
                                수정
                            </button>
                            <button
                                onClick={() => onDelete(item.id)}
                                className="bg-red-600 text-white px-2 py-1 rounded"
                            >
                                삭제
                            </button>
                        </div>
                    </div>
                </>
            )}
        </li>
    );
}