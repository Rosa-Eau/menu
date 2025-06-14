'use client';

import { useState } from 'react';

const CATEGORY_OPTIONS = ['피트위스키', '버번', '셰리위스키', '라이', '아일랜드위스키', '스카치위스키'];

type MenuItem = {
  id: number;
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
};

type Props = {
  item: MenuItem;
  onDelete: (id: number) => void;
  onUpdate: (item: MenuItem) => void;
};

export default function MenuItemRow({ item, onDelete, onUpdate }: Props) {
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(item);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <li className="border border-gray-300 dark:border-neutral-700 p-4 rounded space-y-2 bg-white dark:bg-neutral-900 text-black dark:text-white" style={{ fontFamily: 'Chosunilbo_myungjo' }}>
      {edit ? (
        <>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-neutral-700 p-2 rounded bg-white dark:bg-neutral-800 text-black dark:text-white"
          />
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-neutral-700 p-2 rounded bg-white dark:bg-neutral-800 text-black dark:text-white"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-neutral-700 p-2 rounded bg-white dark:bg-neutral-800 text-black dark:text-white"
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-neutral-700 p-2 rounded bg-white dark:bg-neutral-800 text-black dark:text-white"
          >
            {CATEGORY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <input
            name="abv"
            placeholder="ABV (도수)"
            value={form.abv || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-neutral-700 p-2 rounded bg-white dark:bg-neutral-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 mt-1"
          />
          <input
            name="cask"
            placeholder="Cask (숙성 캐스크)"
            value={form.cask || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-neutral-700 p-2 rounded bg-white dark:bg-neutral-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 mt-1"
          />
          <input
            name="nose"
            placeholder="Nose (향)"
            value={form.nose || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-neutral-700 p-2 rounded bg-white dark:bg-neutral-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 mt-1"
          />
          <input
            name="palate"
            placeholder="Palate (맛)"
            value={form.palate || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-neutral-700 p-2 rounded bg-white dark:bg-neutral-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 mt-1"
          />
          <input
            name="finish"
            placeholder="Finish (피니시)"
            value={form.finish || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-neutral-700 p-2 rounded bg-white dark:bg-neutral-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 mt-1"
          />
          <textarea
            name="info"
            placeholder="Info (세부 정보)"
            value={form.info || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-neutral-700 p-2 rounded bg-white dark:bg-neutral-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 mt-1"
          />
          <div className="flex gap-2 pt-1">
            <button
              onClick={() => {
                onUpdate(form);
                setEdit(false);
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded transition"
            >
              저장
            </button>
            <button
              onClick={() => setEdit(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded transition"
            >
              취소
            </button>
          </div>
        </>
      ) : (
        <div className="flex justify-between items-start gap-4">
          <div>
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-sm">{item.description}</p>
            <p className="font-bold mt-1">{item.price.toLocaleString()}원</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              카테고리: {item.category}
            </p>
            {item.info && <p className="text-xs mt-1">Info: {item.info}</p>}
            {item.finish && <p className="text-xs">Finish: {item.finish}</p>}
            {item.palate && <p className="text-xs">Palate: {item.palate}</p>}
            {item.nose && <p className="text-xs">Nose: {item.nose}</p>}
            {item.cask && <p className="text-xs">Cask: {item.cask}</p>}
            {item.abv && <p className="text-xs">ABV: {item.abv}</p>}
          </div>
          <div className="space-x-2">
            <button
              onClick={() => setEdit(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded transition"
            >
              수정
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded transition"
            >
              삭제
            </button>
          </div>
        </div>
      )}
    </li>
  );
}