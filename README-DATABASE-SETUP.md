# Database Setup Instructions

## Problem
The profile update functionality is failing because the `profiles` table doesn't exist in your Supabase database. Additionally, the civic issue reporting feature requires an `issues` table.

## Solution
Run the SQL scripts to create the required database tables and storage bucket.

## Steps to Fix:

### 1. Create the Profiles Table
1. Go to your Supabase Dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `create_profiles_table.sql`
4. Click "Run" to execute the SQL

### 2. Create the Issues Table
1. Go to your Supabase Dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `create_issues_table.sql`
4. Click "Run" to execute the SQL

### 3. Verify the Setup
After running both SQL scripts, you should see:
- A new `profiles` table in your database
- A new `issues` table in your database
- A new `avatars` storage bucket
- Row Level Security (RLS) policies configured

### 4. Test the Application
Once the database is set up:
1. Start your development server
2. Go to the Report Issue page
3. Try clicking the Leaderboard button
4. The "error fetching public.issues table missing in schema" error should be resolved

## What the SQL Scripts Do:

### Profiles Table (`create_profiles_table.sql`):
- `id` (UUID, references auth.users)
- `name` (TEXT)
- `email` (TEXT)
- `profile_photo` (TEXT)
- `bio` (TEXT)
- `notifications` (BOOLEAN)
- `role` (TEXT, either 'admin' or 'citizen')
- `created_at` and `updated_at` timestamps

### Issues Table (`create_issues_table.sql`):
- `id` (UUID, primary key)
- `user_id` (UUID, references profiles table)
- `title` (TEXT, required)
- `description` (TEXT)
- `category` (TEXT, required)
- `location` (TEXT, required)
- `priority` (TEXT, enum: 'low', 'medium', 'high', 'urgent')
- `status` (TEXT, enum: 'pending', 'in_progress', 'resolved', 'rejected')
- `created_at` and `updated_at` timestamps

### Sets up Row Level Security:
- Users can only view/edit their own profiles and issues
- Admins can update any issue
- Automatic `updated_at` timestamp updates

### Creates `avatars` storage bucket:
- For storing profile photos
- Public access for viewing images
- Private upload/update/delete permissions

## Troubleshooting:
- If you get permission errors, make sure you're logged in as a project owner/admin in Supabase
- If the tables already exist, the scripts won't overwrite them (uses `IF NOT EXISTS`)
- Check the Supabase logs if you encounter any issues during execution
- Make sure to run both SQL scripts in order
