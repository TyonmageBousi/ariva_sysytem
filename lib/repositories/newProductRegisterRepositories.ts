import { products, productImages, productCategories, productColors } from '@/lib/schema'
import { eq } from 'drizzle-orm';
import { db, insertStorage, deleteStorage } from '@/lib/db'
import { NewProductValues } from '@/app/schemas/product'

export async function newProductRegister(result: NewProductValues) {

    const [uploadNewImages, deletePaths] = await (async (): Promise<[string[], string[]]> => {

        if (result.images) {
            if (result.id && result.defaultImages?.length) {
                const findData = await db
                    .select()
                    .from(products)
                    .where(eq(products.id, result.id))
                    .limit(1);

                if (findData.length > 0) {
                    const defaultImages = await db
                        .select({ filePath: productImages.filePath })
                        .from(productImages)
                        .where(eq(productImages.productId, result.id));

                    const defaultImagesFilePaths = defaultImages.map((img) => img.filePath);

                    const deletePaths = defaultImagesFilePaths.filter(
                        (filePath) => !result.defaultImages?.includes(filePath)
                    );

                    const newUploadedImages = await insertStorage(result.images);

                    const defaultPaths = defaultImagesFilePaths.filter((filePath) =>
                        result.defaultImages?.includes(filePath)
                    );
                    const defaultFileNames = defaultPaths
                        .map((path) => path.split('/').pop())
                        .filter((part): part is string => part !== undefined && part !== '');

                    return [[...newUploadedImages, ...defaultFileNames], deletePaths];
                }
            }

            return [await insertStorage(result.images), []];
        }

        return [[], []];
    })();



    await db.transaction(async (tx) => {

        await Promise.all([
            tx.delete(productCategories).where(eq(productCategories.productId, Number(result.id))),
            tx.delete(productColors).where(eq(productColors.productId, Number(result.id))),
            tx.delete(productImages).where(eq(productImages.productId, Number(result.id))),
        ]);
        await tx.delete(products).where(eq(products.id, Number(result.id)));
        
        const insertProduct = await tx.insert(products).values({
            name: result.name,
            skuCode: result.skuCode,
            price: result.price,
            discountPrice: result.discountPrice,
            saleStartAt: result.saleStartAt,
            saleEndAt: result.saleEndAt,
            status: result.status,
            stock: result.stock,
            description: result.description,
        }).returning({ productId: products.id });

        await Promise.all([
            ...uploadNewImages.map((uploadImage) => (
                tx.insert(productImages).values({
                    productId: insertProduct[0].productId,
                    filePath: uploadImage
                })
            )),

            ...(result.categoryIds?.map((categoryId) => (
                tx.insert(productCategories).values({
                    productId: insertProduct[0].productId,
                    categoryId: Number(categoryId)
                })
            )) ?? []),

            ...(result.colorIds?.map((colorId) => (
                tx.insert(productColors).values({
                    productId: insertProduct[0].productId,
                    colorId: Number(colorId)
                })
            )) ?? [])
        ])
    })

    if (deletePaths.length) {
        await deleteStorage(deletePaths);
    }
}