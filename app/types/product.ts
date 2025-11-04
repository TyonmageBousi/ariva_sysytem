export type FormValues = {
    name: string,
    skuCode: string,
    price: number,
    discountPrice?: number,
    saleStartAt: Date,
    saleEndAt: Date,
    status: string,
    description: string,
    categoryIds: number[],
    colorCategoryIds: number[]
    stock: number,
    images: File[]
}

