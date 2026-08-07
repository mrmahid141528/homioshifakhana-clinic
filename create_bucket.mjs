import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
    console.log("Checking if bucket exists...");
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();

    if (listError) {
        console.error("Error listing buckets:", listError);
        return;
    }

    const exists = buckets.some(b => b.name === 'clinic-images');

    if (!exists) {
        console.log("Bucket 'clinic-images' not found. Creating it...");
        const { data, error } = await supabase.storage.createBucket('clinic-images', {
            public: true,
            allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'],
            fileSizeLimit: 2097152 // 2MB
        });

        if (error) {
            console.error("Failed to create bucket:", error);
        } else {
            console.log("Bucket created successfully:", data);
        }
    } else {
        console.log("Bucket 'clinic-images' already exists!");
    }
}

main();
