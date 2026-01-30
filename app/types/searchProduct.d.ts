

export type SearchProduct = {
    id: number,
    skuCode: string | null,
    name: string,
    price: number,
    discountPrice: number | null,
    imageUrl: string | null,
    categoryIds: number[],
    colorIds: number[],
}