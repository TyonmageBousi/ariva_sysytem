// middleware.ts
import { auth } from "@/auth";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
    const session = await auth();
    const path = request.nextUrl.pathname;

    if (!session?.user) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (path.startsWith('/cart') || path.startsWith('/checkout')) {
        const { supabase, response } = createClient(request);

        const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000).toISOString();

        const { data: expiredOrders, error: selectError } = await supabase
            .from('orders')
            .select('id')
            .eq('user_id', session.user.id)
            .eq('status', 'pending')
            .lt('created_at', fifteenMinutesAgo);

        if (selectError) {
            console.error('Failed to find expired orders:', selectError);
            return response;
        }

        if (!expiredOrders || expiredOrders.length === 0) {
            return response;
        }

        const orderIds = expiredOrders.map(order => order.id);

        const { error: itemsError } = await supabase
            .from('temporary_order_items')
            .delete()
            .in('order_id', orderIds);

        if (itemsError) {
            console.error('Failed to delete order items:', itemsError);
        }

        const { error: ordersError } = await supabase
            .from('temporary_orders')
            .delete()
            .in('id', orderIds);

        if (ordersError) {
            console.error('Failed to delete orders:', ordersError);
        }

        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/cart/:path*',
        '/checkout/:path*',
    ],
};