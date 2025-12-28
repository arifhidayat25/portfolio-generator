import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Mock client helper to prevent app crash without DB
const createSafeClient = (url: string | undefined, key: string | undefined) => {
  if (url && key) {
    return createClient(url, key)
  }
  
  console.warn('⚠️ Supabase credentials not found. Using Mock Client (No-Op Mode).')
  
  const mockClient: any = new Proxy({}, {
    get: (_target, prop) => {
      if (['then', 'catch', 'finally'].includes(String(prop))) {
        return undefined
      }
      
      return (...args: any[]) => {
        const chainableProxy: any = () => chainableProxy
        chainableProxy.then = (resolve: any) => resolve({ data: null, error: null })
        return new Proxy(chainableProxy, {
          get: (_t, p) => {
            if (p === 'then') return (resolve: any) => resolve({ data: null, error: null })
            return (..._a: any[]) => chainableProxy
          }
        })
      }
    }
  })

  return mockClient
}

export const supabase = createSafeClient(supabaseUrl, supabaseAnonKey)