// app/api/products/route.ts
import { db } from '@/lib/db';
import { CreateProductSchema, CreateProductInput } from "../../schemas/product";
import { products, productCategories } from './../../../lib/schema';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from "@supabase/supabase-js";
import { log } from 'console';
import { form } from 'framer-motion/client';
import { Upload } from 'lucide-react';
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // サーバー側は service_role を使う
);

export async function POST(request: Request) {

    try {
        const formdata = await request.formData();
        const imageEntries = formdata.getAll('images')
        const imagesFiles = imageEntries.filter(entry => entry instanceof File) as File[];
        const uploadImages = imagesFiles.map(async (image) => {
            const { data, error } = await supabase.storage
                .from('images')
                .upload(`images/${Date.now()}-${image.name}`, image);
            if (error) {
                console.error('upload error:', error);
                throw error
            }
        })

        const uploadResults = await Promise.all(uploadImages)

        return NextResponse.json({ ok: true, formdata });
    }
    catch (err) {
        console.error('エラー:', err);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}




