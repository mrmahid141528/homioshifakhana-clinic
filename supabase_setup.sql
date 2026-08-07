-- Table: site_settings
CREATE TABLE site_settings (
  id                  INT PRIMARY KEY DEFAULT 1 CHECK (id = 1), -- Enforces single row
  clinic_name         TEXT NOT NULL DEFAULT 'হোমিও চিকিৎসা খানা',
  tagline             TEXT,                         -- Short hero subtext
  hero_heading        TEXT,                         -- Main hero H1 text
  hero_image_url      TEXT,                         -- Supabase Storage URL
  about_text          TEXT,                         -- Rich text / markdown for About page
  whatsapp_number      TEXT NOT NULL,                -- E.164 format, e.g. +8801XXXXXXXXX
  emergency_contact    TEXT,                         -- Alternate phone number
  clinic_address       TEXT,
  clinic_lat           NUMERIC,                      -- For LocalBusiness schema / map
  clinic_lng           NUMERIC,
  opening_hours        TEXT,                         -- e.g. "Mon-Sat: 10am - 8pm"
  facebook_url          TEXT,
  instagram_url         TEXT,
  meta_title            TEXT,                         -- Default/global SEO title
  meta_description      TEXT,                         -- Default/global SEO description
  updated_at            TIMESTAMPTZ DEFAULT now()
);

-- Seed the single row (Change the WhatsApp number to your actual number)
INSERT INTO site_settings (id, whatsapp_number)
VALUES (1, '+91XXXXXXXXXX')
ON CONFLICT (id) DO NOTHING;

-- Table: doctors
CREATE TABLE doctors (
  id                INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  full_name         TEXT NOT NULL,
  qualification     TEXT NOT NULL,      -- e.g. "BHMS, DBMS"
  designation       TEXT,               -- e.g. "Chief Physician"
  bio               TEXT,
  photo_url         TEXT,
  years_experience  INT,
  display_order     INT DEFAULT 0,
  created_at        TIMESTAMPTZ DEFAULT now()
);

-- Table: treatments
CREATE TABLE treatments (
  id                INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug              TEXT UNIQUE NOT NULL,   -- e.g. "joint-pain", used in /treatments/[slug]
  title             TEXT NOT NULL,          -- e.g. "Joint Pain Treatment"
  short_description TEXT,                  -- Used on grid/listing card
  full_content      TEXT,                  -- Long-form SEO content (markdown/rich text)
  icon_or_image_url TEXT,
  meta_title        TEXT,
  meta_description  TEXT,
  faq_json          JSONB,                 -- [{ "question": "...", "answer": "..." }, ...]
  display_order     INT DEFAULT 0,
  is_published      BOOLEAN DEFAULT true,
  created_at        TIMESTAMPTZ DEFAULT now(),
  updated_at        TIMESTAMPTZ DEFAULT now()
);

-- Table: appointment_leads (Optional Analytics logging)
CREATE TABLE appointment_leads (
  id                INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  patient_name      TEXT NOT NULL,
  disease_concern   TEXT,
  preferred_date    DATE,
  phone_number      TEXT,
  source_page       TEXT,               -- e.g. slug of treatment page
  created_at        TIMESTAMPTZ DEFAULT now()
);
