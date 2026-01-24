import { AddressValues } from '@/app/schemas/address'
import Address from '@/app/components/admin/address/address'
import { handleFrontError } from '@/lib/front-error';

export default async function AddressPage() {

    const TIMEOUT = Number(process.env.NEXT_PUBLIC_FETCH_TIMEOUT) || 10000;
    const controller = new AbortController();
    const timeOut = setTimeout(() => controller.abort(), TIMEOUT)
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/address`,
            { signal: controller.signal })
        const result = await res.json();

        if (!res.ok) throw new Error(result)
        if (!result.success) throw new Error(result)
        const data: AddressValues = result.data;
        return (
            <Address {...data} />
        )
    } catch (error) {
        if (error instanceof Error) {
            return handleFrontError(error)
        }
    } finally {
        clearTimeout(timeOut)
    }

}