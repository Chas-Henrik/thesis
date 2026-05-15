import { createClient } from '@supabase/supabase-js'

export const getServerSupabaseClient = () => {
  const config = useRuntimeConfig()

  return createClient(
    config.public.supabaseUrl,
    config.supabaseServiceRoleKey,
  )
}
