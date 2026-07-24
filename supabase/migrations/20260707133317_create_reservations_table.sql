/*
# Create reservations table (single-tenant, no auth)

1. New Tables
- `reservations`
- `id` (uuid, primary key)
- `name` (text, not null) — customer full name
- `phone` (text, not null) — contact phone number
- `reservation_date` (date, not null) — requested date
- `reservation_time` (time, not null) — requested time
- `party_size` (int, not null) — number of guests
- `message` (text, nullable) — optional notes from customer
- `status` (text, default 'pending') — pending / confirmed / cancelled
- `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `reservations`.
- Allow anon + authenticated INSERT (public can submit reservations without sign-in).
- Allow anon + authenticated SELECT (so the site can display a confirmation).
- No UPDATE or DELETE from the anon key (staff manage via dashboard).

3. Notes
- This is a no-auth restaurant site; the anon-key client must be able to insert reservations.
- SELECT is intentionally public so a confirmation screen can read back the submitted row.
*/

CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  reservation_date date NOT NULL,
  reservation_time time NOT NULL,
  party_size int NOT NULL DEFAULT 2,
  message text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_reservations" ON reservations;
CREATE POLICY "anon_select_reservations" ON reservations FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_reservations" ON reservations;
CREATE POLICY "anon_insert_reservations" ON reservations FOR INSERT
  TO anon, authenticated WITH CHECK (true);
