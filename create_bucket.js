const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
    console.log("Checking if bucket 'clinic-images' exists...");
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();

    if (listError) {
        console.error("Error listing buckets:", listError);
        return;
    }

    const exists = buckets.some(b => b.name === 'clinic-images');

    if (!exists) {
        console.log("Bucket not found. Creating...");
        const { data, error } = await supabase.storage.createBucket('clinic-images', {
            public: true,
            allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'],
            fileSizeLimit: 5242880 // 5MB
        });

        if (error) {
            console.error("Failed to create bucket:", error);
        } else {
            console.log("Bucket 'clinic-images' created successfully!");
        }
    } else {
        console.log("Bucket 'clinic-images' already exists! Attempting to make it public if it isn't...");
        const { data, error } = await supabase.storage.updateBucket('clinic-images', {
            public: true
        });
        if (error) {
            console.log("Could not update bucket to public:", error.message);
        } else {
            console.log("Bucket is set to PUBLIC.");
        }
    }
}

main();
