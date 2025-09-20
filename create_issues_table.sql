-- Create issues table for civic issue reporting
CREATE TABLE IF NOT EXISTS issues (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'resolved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE issues ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view all issues"
  ON issues FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own issues"
  ON issues FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own issues"
  ON issues FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can update any issue"
  ON issues FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create function to handle updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER issues_updated_at
  BEFORE UPDATE ON issues
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_issues_user_id ON issues(user_id);
CREATE INDEX IF NOT EXISTS idx_issues_category ON issues(category);
CREATE INDEX IF NOT EXISTS idx_issues_status ON issues(status);
CREATE INDEX IF NOT EXISTS idx_issues_priority ON issues(priority);
CREATE INDEX IF NOT EXISTS idx_issues_created_at ON issues(created_at);
