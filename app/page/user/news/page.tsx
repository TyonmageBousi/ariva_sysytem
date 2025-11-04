'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type News = {
    date: string;
    news: string;
};

export default function InputForm() {
    const [value, setValue] = useState<News>({ date: '', news: '' });
    const router = useRouter();

    const handleSubmit = () => {
        if (!value.date || !value.news) {
            alert('日付と投稿内容を入力してください');
            return;
        }

        // 既存の投稿をローカルストレージから取得
        const stored = localStorage.getItem('newsList');
        const newsList: News[] = stored ? JSON.parse(stored) : [];

        // 新しい投稿を追加
        newsList.push(value);

        // ローカルストレージに保存
        localStorage.setItem('newsList', JSON.stringify(newsList));

        // フォームをリセット
        setValue({ date: '', news: '' });

        // 投稿一覧ページへ遷移
        router.push('/news');
    };

    return (
        <div>
            <input
                name='date'
                placeholder='日付'
                value={value.date}
                onChange={(e) => setValue({ ...value, date: e.target.value })}
            />
            <input
                name='news'
                placeholder='投稿内容'
                value={value.news}
                onChange={(e) => setValue({ ...value, news: e.target.value })}
            />
            <button onClick={handleSubmit}>投稿する</button>
        </div>
    );
}
