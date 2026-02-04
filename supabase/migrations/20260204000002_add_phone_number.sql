-- Add phone number column to profiles table
ALTER TABLE profiles
ADD COLUMN phone_number TEXT;

-- Add index for phone number lookups
CREATE INDEX idx_profiles_phone_number ON profiles(phone_number);
