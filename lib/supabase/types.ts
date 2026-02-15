export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      prompt_examples: {
        Row: {
          id: string
          category: string
          title: string
          content: string
          related_links: string
          attachment_urls: string[]
          created_at: string
          updated_at: string
          last_used_at: string | null
        }
        Insert: {
          id?: string
          category: string
          title: string
          content?: string
          related_links?: string
          attachment_urls?: string[]
          created_at?: string
          updated_at?: string
          last_used_at?: string | null
        }
        Update: {
          id?: string
          category?: string
          title?: string
          content?: string
          related_links?: string
          attachment_urls?: string[]
          created_at?: string
          updated_at?: string
          last_used_at?: string | null
        }
      }
    }
  }
}

export type PromptExample = Database["public"]["Tables"]["prompt_examples"]["Row"]
export type PromptExampleInsert = Database["public"]["Tables"]["prompt_examples"]["Insert"]
export type PromptExampleUpdate = Database["public"]["Tables"]["prompt_examples"]["Update"]
