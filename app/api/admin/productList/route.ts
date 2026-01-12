import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { handleError, } from '@/lib/errors'
import { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';
import { products } from '@/lib/schema';
import { SQL } from 'drizzle-orm';

export async function GET(request: NextRequest) {
    const id = request.nextUrl.searchParams.get('id');
    const productGetQuery = {
        columns: {
            id: true,
            skuCode: true,
            name: true,
            price: true,
            discountPrice: true,
            status: true,
            stock: true,
            description: true,
            updatedAt: true,
        },
        with: {
            productCategories: {
                with: {
                    category: {
                        columns: {
                            id: true
                        }
                    }
                }
            },
            productColors: {
                with: {
                    colorCategory: {
                        columns: {
                            id: true
                        }
                    }
                }
            },
            productImages: {
                columns: {
                    filePath: true
                },
            }
        },
    } as const;

    try {
        let query: typeof productGetQuery & { where?: SQL };
        if (id) {
            const idParam = parseInt(id, 10);
            query = {
                ...productGetQuery,
                where: eq(products.id, idParam),
                with: {
                    ...productGetQuery.with,
                    productImages: {
                        columns: {
                            filePath: true,
                        },
                    }
                }
            }
        }
        else {
            query = productGetQuery
        }

        const productLists = await db.query.products.findMany(query);
        const data = productLists.map((product) => {
            const categoriesName = product.productCategories.map((category) => String(category.category.id))
            const colorName = product.productColors.map((colorCategory) => String(colorCategory.colorCategory.id));
            const imageUrl = product.productImages.map((productImage) => `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${productImage.filePath}`)
            return {
                ...product,
                productCategories: categoriesName,
                productColors: colorName,
                productImages: imageUrl
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