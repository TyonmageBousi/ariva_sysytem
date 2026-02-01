import { AddressValues } from '@/app/schemas/address'
import Address from '@/app/user/address/Address'
import HandleFrontError from '@/app/components/error/error';
import { db, loginJudgment } from '@/lib/db'
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export default async function AddressPage() {
    try {
        const user = await loginJudgment();

        const userAddress = await db.select({
            postalCode: users.postalCode,
            prefecture: users.prefecture,
            city: users.city,
            address1: users.address1,
            address2: users.address2,
        })
            .from(users)
            .where(eq(users.id, Number(user.id)))
            .limit(1);

        if (userAddress.length === 0) {

        }

        const data: AddressValues = {
            ...userAddress[0],
            prefecture: userAddress[0].prefecture as AddressValues['prefecture']
        };
        return <Address defaultData={data} />;

    } catch (error) {
        if (error instanceof Error) {
            return <HandleFrontError error={error} />;
        }
    }

}