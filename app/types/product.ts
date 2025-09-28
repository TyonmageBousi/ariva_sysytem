
export type FormValues = {
    name: string,
    skuCode: string,
    price: number,
    discountPrice?: number,
    saleStartAt: Date,
    saleEndAt: Date,
    status: number,
    description: string,
    categoryIds: string[],
    colorCategoryIds: string[]
    stock: number,
    images: File[]
}


export type FormSearchValues = {
    name: string,
    skuCode: string,
    minimumPrice: number,
    maxPrice: number,
    minimumSalePrice: number,
    maxSalePrice: number,
    saleStartAt: Date,
    saleEndAt: Date,
    colorCategoryIds: string[],
    categoryIds: string[],
    status: string,
    stock: number,
}


export type EnrichedProducts = {
    name: string,
    skuCode: string,
    price: number,
    discountPrice?: number,
    saleStartAt: Date,
    saleEndAt: Date,
    status: number,
    categoryIds: string[],
    colorCategoryIds: string[]
    stock: number,
}

export type PerfectProducts = {
    name: string,
    skuCode: string,
    price: number,
    discountPrice?: number,
    saleStartAt: Date,
    saleEndAt: Date,
    status: number,
    categoryIds: Categories[],
    colorCategoryIds: Categories[]
    stock: number,
}

type Categories = {
    id: number,
    label: string
}
