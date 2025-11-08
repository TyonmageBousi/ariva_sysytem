import React from 'react'
import OurProductThoughts from '../user/OurProductThoughts'
import { OurThought } from '@/app/api/mock/our_thoughts/route'

export default async function OurProductContain({ titleCss }: { titleCss: string }) {

    const res = await fetch('http://localhost:3000/api/mock/our_thoughts')
    const data:OurThought[] = await res.json()
    return <OurProductThoughts titleCss={titleCss} data={data} />
}

