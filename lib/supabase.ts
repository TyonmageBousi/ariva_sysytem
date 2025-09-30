
import { createClient } from '@supabase/supabase-js'


export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,      // 例: https://xxxx.supabase.co
  process.env.SUPABASE_SERVICE_ROLE_KEY!      // ← サーバー専用の強い鍵
)
