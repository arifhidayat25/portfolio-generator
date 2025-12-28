-- Create portfolios table for storing portfolio data
CREATE TABLE IF NOT EXISTS portfolios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  location VARCHAR(255),
  bio TEXT,
  skills TEXT[], -- Array of skills
  experiences JSONB, -- JSON array of experience objects
  education JSONB, -- JSON array of education objects
  projects JSONB, -- JSON array of project objects
  template_id VARCHAR(50) NOT NULL DEFAULT 'minimalist',
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_portfolios_user_id ON portfolios(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolios_template_id ON portfolios(template_id);
CREATE INDEX IF NOT EXISTS idx_portfolios_is_public ON portfolios(is_public);
