import { NextResponse } from 'next/server';
import { handleError } from '@/lib/errors'
import { desc } from 'drizzle-orm';
import { db } from '@/lib/db';
import { products } from '@/lib/schema';

export async function GET() {
    try {
        let newSkuCode = "SKU-0001"
        const recentlySkuCode = await db.select({ skuCode: products.skuCode })
            .from(products)
            .orderBy(desc(products.skuCode))
            .limit(1);

        if (recentlySkuCode.length > 0 && recentlySkuCode[0].skuCode) {
            const numberPart = recentlySkuCode[0].skuCode.split('-')[1];
            const nextNumber = parseInt(numberPart) + 2;
            newSkuCode = `SKU-${String(nextNumber).padStart(5, '0')}`
        }
        return NextResponse.json(
            {
                success: true,
                data: newSkuCode
            },
            { status: 200 }
        );
    } catch (error) {
        return handleError(error);
    }
}