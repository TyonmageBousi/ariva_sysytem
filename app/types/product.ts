
export type FormValues = {
    name: string,
    skuCode: string,          // productCode → skuCode
    price: number,
    discountPrice?: number,   // salePrice → discountPrice
    saleStartAt: Date,        // productStarted → saleStartAt
    saleEndAt: Date,          // productEnded → saleEndAt
    status: number,           // productState → status
    description: string,
    categoryIds: string[],
    colorCategoryIds:string[]    // searchLabels → categoryIds
    colorIds: string[],       // colorCategory → colorIds
    stock: number,
    images: File[]            // ここはサーバ側でURLに変換する
}