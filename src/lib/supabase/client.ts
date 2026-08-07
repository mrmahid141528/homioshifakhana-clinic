import { createBrowserClient } from '@supabase/ssr'

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Standard initialized client for client-components
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)
