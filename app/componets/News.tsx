'use client'

import { useEffect, useState } from 'react';

type NewsItem  = {
    date: string;
    news: string;
};

type NewsPageProps  = {
    titleClass: string;
}


export default function NewsPage({ titleClass }: NewsPageProps ) {
        const [newsList, setNewsList] = useState<NewsItem []>([]);

        useEffect(() => {
            const stored = localStorage.getItem('newsList');
            if (stored) {
                setNewsList(JSON.parse(stored));
            }
    }, []);

    return (
        <div>
            <h1 className={titleClass}>NEWS</h1>
            <ul className='w-[90%] mx-auto'>
                {newsList.length === 0 && <li>投稿がありません</li>}
                {newsList.map((item, index) => (
                    <li key={index} className='flex gap-x-4 py-2 '>
                        <p className='text-[clamp(0.75rem,1.5vw,1.5rem)] w-[30%] text-right mr-2'>
                            <span className='inline-block border-b border-gray-300'>
                                {item.date}
                            </span>
                        </p>
                        <p className='text-[clamp(0.75rem,1.5vw,1.5rem)] w-[70%] text-left ml-2'>
                            <span className='inline-block border-b border-gray-300'>{item.news}</span></p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
