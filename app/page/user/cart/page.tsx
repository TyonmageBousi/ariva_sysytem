import Cart from '@/app/components/user/cart/cart'
import { handleFrontError } from '@/lib/front-error';
import { ProductCart } from '@/app/types/productCart'


export default async function UserCart() {

    const controller = new AbortController();

    try {
        const res = await fetch('http://localhost:3000/api/user/cart',
            { signal: controller.signal })

        const result = await res.json();

        if (!res.ok) throw new Error(result);
        if (!result.success) throw new Error(result)

        const data: ProductCart[] = result.data
        return (
            <Cart {...data} />
        )
    } catch (error) {
        if (error instanceof Error)
            return handleFrontError(error)
    }
}
