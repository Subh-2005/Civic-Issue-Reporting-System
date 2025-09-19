# Database Setup Instructions

## Problem
The profile update functionality is failing because the `profiles` table doesn't exist in your Supabase database.

## Solution
Run the SQL script to create the required database tables and storage bucket.

## Steps to Fix:

### 1. Create the Profiles Table
1. Go to your Supabase Dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `create_profiles_table.sql`
4. Click "Run" to execute the SQL

### 2. Verify the Setup
After running the SQL, you should see:
- A new `profiles` table in your database
- A new `avatars` storage bucket
- Row Level Security (RLS) policies configured

### 3. Test the Application
Once the database is set up:
1. Start your development server
2. Go to the Settings page
3. Try updating your profile
4. The "Failed to update profile" error should be resolved

## What the SQL Script Does:

### Creates `profiles` table with:
- `id` (UUID, references auth.users)
- `name` (TEXT)
- `email` (TEXT)
- `profile_photo` (TEXT)
- `bio` (TEXT)
- `notifications` (BOOLEAN)
- `role` (TEXT, either 'admin' or 'citizen')
- `created_at` and `updated_at` timestamps

### Sets up Row Level Security:
- Users can only view/edit their own profiles
- Automatic `updated_at` timestamp updates

### Creates `avatars` storage bucket:
- For storing profile photos
- Public access for viewing images
- Private upload/update/delete permissions

## Troubleshooting:
- If you get permission errors, make sure you're logged in as a project owner/admin in Supabase
- If the table already exists, the script won't overwrite it (uses `IF NOT EXISTS`)
- Check the Supabase logs if you encounter any issues during execution
