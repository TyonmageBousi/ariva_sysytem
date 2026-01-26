import { supabase } from '@/lib/db'


export async function deleteStorage(removeFiles: string[]) {
    const { data, error } = await supabase.storage
        .from('images')
        .remove(removeFiles);
    if (error) {
        throw new Error(`画像の削除に失敗しました: ${error.message}`);
    }
    return data
}