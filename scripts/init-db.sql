-- Initialize database for Payload CMS
-- This script runs automatically when PostgreSQL container starts

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create schema if not exists
CREATE SCHEMA IF NOT EXISTS public;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE payload TO payload;
GRANT ALL PRIVILEGES ON SCHEMA public TO payload;

-- Log initialization
DO $$
BEGIN
    RAISE NOTICE 'Database initialized successfully for Payload CMS';
END $$;
