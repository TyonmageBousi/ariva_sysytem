'use client';

import OurProductContainer from '../server/OurProductContainer';

export default function TestMock() {
    const titleCss = 'text-center text-[2.5rem] mx-auto w-fit mb-8 mt-48'
    return (
        <OurProductContainer titleCss={titleCss} />
    )
}
