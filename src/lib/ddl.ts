// defines all of the tables for supabase

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string,
          updated_at: string,
          username: string | null,
          full_name: string | null,
          avatar_url: string | null,
          email: string
        },
        Insert: {
          id: string,
          updated_at: string,
          username: string | null,
          full_name: string | null,
          avatar_url: string | null,
          email: string
        },
        Update: {
          id?: string,
          updated_at?: string,
          username?: string | null,
          full_name?: string | null,
          avatar_url?: string | null,
          email?: string | null
        }
      }
    }
  }
}
