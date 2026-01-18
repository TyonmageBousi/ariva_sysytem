
import { eq, not, sql } from 'drizzle-orm';
import { products } from '@/lib/schema'
import { NextResponse } from 'next/server';
import { db, client } from '@/lib/db'
import { AppError, handleError } from '@/lib/errors'
import { productGetQuery } from '@/app/api/admin/productList/route';

export async function GET(request: Request,) {

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const productId = ((id: string | null): number | null => {

        if (id !== null) {
            const parsedId = parseInt(id);

            if (isNaN(parsedId)) {
                throw new AppError({ message: '数字型のIDじゃありません', statusCode: 420, errorType: 'PARAMS_NOT_NUMBER' })
            }
            return parsedId;
        }
        return null;
    })(id);


    try {
        const productList = await (async (id: number | null) => {
            if (id) {
                return await db.query.products.findMany({
                    columns: {
                        id: true,
                        skuCode: true,
                        name: true,
                        price: true,
                        discountPrice: true,
                        description: true,
                    },
                    with: {
                        productCategories: {
                            with: {
                                category: {
                                    columns: { id: true }
                                }
                            }
                        },
                        productColors: {
                            with: {
                                colorCategory: {
                                    columns: { id: true }
                                }
                            }
                        },
                        productImages: {
                            columns: { filePath: true },
                        },
                    },
                    where: not(eq(products.id, id)),
                    orderBy: sql`RANDOM()`,
                    limit: 20,
                });

            } else {
                return await db.query.products.findMany({
                    columns: {
                        id: true,
                        skuCode: true,
                        name: true,
                        price: true,
                        discountPrice: true,
                        description: true,
                    },
                    with: {
                        productCategories: {
                            with: {
                                category: {
                                    columns: { id: true }
                                }
                            }
                        },
                        productColors: {
                            with: {
                                colorCategory: {
                                    columns: { id: true }
                                }
                            }
                        },
                        productImages: {
                            columns: { filePath: true },
                        },
                    },
                });
            }
        })(productId)
        const data = productList.map((product) => {
            const categoriesName = product.productCategories.map(
                (category) => String(category.category.id)
            );
            const colorName = product.productColors.map(
                (colorCategory) => String(colorCategory.colorCategory.id)
            );
            const imageUrl = product.productImages.map(
                (productImage) =>
                    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${productImage.filePath}`
            );
            return ({
                ...product,
                productImages: imageUrl,
                productCategories: categoriesName,
                productColors: colorName

            })
        })
        return NextResponse.json({ success: true, data: data },
            { status: 200 })
    } catch (error) {
        return handleError(error)
    }
}

