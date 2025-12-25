import {  handleError } from '@/lib/errors'
import { getAllCategories, getAllColorCategories } from '@/lib/db';
import { NextResponse } from 'next/server';


export async function GET() {
    try {
        const [categories, colorCategories] = await Promise.all([
            getAllCategories(),
            getAllColorCategories(),
        ]);
        return NextResponse.json(
            {
                success: true,
                categories: categories,
                colorCategories: colorCategories
            },
            { status: 200 }
        );
    } catch (error) {
        return handleError(error);
    }
}