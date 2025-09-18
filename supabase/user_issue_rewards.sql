// Supabase table creation SQL for tracking user issue submissions and rewards
-- Table: user_issue_rewards
CREATE TABLE IF NOT EXISTS user_issue_rewards (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    month VARCHAR(7) NOT NULL, -- Format: YYYY-MM
    issue_count INTEGER DEFAULT 0,
    tokens_claimed BOOLEAN DEFAULT FALSE,
    wallet_address VARCHAR(64),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
-- Index for fast lookup
CREATE INDEX IF NOT EXISTS idx_user_month ON user_issue_rewards(user_id, month);
