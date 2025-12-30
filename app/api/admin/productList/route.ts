import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { handleError, AppError } from '@/lib/errors'

export async function GET() {
    try {
        const products = await db.query.products.findMany({
            columns: {
                skuCode: true,
                name: true,
                price: true,
                discountPrice: true,
                status: true,
                stock: true,
                updatedAt: true,
            },
            with: {
                productCategories: {
                    with: {
                        category: {
                            columns: {
                                name: true
                            }
                        }
                    }
                },
                productColors: {
                    with: {
                        colorCategory: {
                            columns: {
                                name: true
                            }
                        }
                    }
                },
            },
        });
        const data = products.map((product) => {
            const categoriesName = product.productCategories.map((category) => category.category.name)
            const colorName = product.productColors.map((colorCategory) => colorCategory.colorCategory.name);
            return {
                ...product,
                productCategories: categoriesName,
                productColors: colorName
            }
        });

        return NextResponse.json(
            {
                success: true,
                data: data
            },
            { status: 200 }
        );
    } catch (error) {
        return handleError(error);
    }
}