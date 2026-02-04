import { type Database } from './database.types'

// Convenience type exports from database schema
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Resource = Database['public']['Tables']['resources']['Row']
export type Bookmark = Database['public']['Tables']['bookmarks']['Row']
export type Course = Database['public']['Tables']['courses']['Row']

// User type (from auth)
export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
}

// Extended resource with bookmark status
export interface ResourceWithBookmark extends Resource {
  isBookmarked?: boolean
}

// Category type matching the topics from landing page
export type Category =
  | 'General Discussion'
  | 'Job Opportunities'
  | 'Best Prompts'
  | 'Fitness & Wellness'
  | 'Announcements'
  | 'Showcase'
  | 'Career Growth'
  | 'AI Fundamentals'
  | 'AI News'
  | 'Tips & Tricks'
  | 'Tools & Resources'
  | 'Community Events'

// Topic interface for landing page
export interface Topic {
  name: string
  icon: string
  description?: string
  image?: string
}
