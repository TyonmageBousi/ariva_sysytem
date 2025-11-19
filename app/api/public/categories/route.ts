// app/api/categories/route.ts
import { getAllCategories, getAllColorCategories } from '@/lib/db';

export async function GET() {
    try {
        const [categories, colorCategories] = await Promise.all([
            getAllCategories(),
            getAllColorCategories(),
        ]);
        return Response.json({
            categories,
            colorCategories
        });
    } catch (error) {
        console.error('Database error:', error);
        return Response.json(
            { error: 'Failed to fetch categories' },
            { status: 500 }
        );
    }
}