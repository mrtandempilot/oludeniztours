'use client';
import { createClient } from '@supabase/supabase-js';

let client = null;
export function supabase() {
  if (client) return client;
  // Publishable key herkese açık bir anahtardır (tarayıcıya gider); güvenlik RLS kurallarıyla sağlanır.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tqnstwyvwejsiwdltsxw.supabase.co';
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_krH53KV6vnDlfeCOolRagw_vWesgwLI';
  if (!url || !key) return null;
  client = createClient(url, key, { auth: { persistSession: true, autoRefreshToken: true } });
  return client;
}
