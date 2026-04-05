import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { createClient } from '@supabase/supabase-js';

const prisma = new PrismaClient();

const SALT_ROUNDS = 12;

async function ensureSupabaseUser(email: string, password: string, name: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    console.log('  ⚠️  Supabase not configured, skipping Supabase Auth user creation');
    return;
  }
  const supabase = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, detectSessionInUrl: false, persistSession: false },
  });

  // Check if user already exists
  const { data: listData } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
  const existing = listData?.users?.find((u) => u.email?.toLowerCase() === email.toLowerCase());

  if (existing) {
    // Update password & metadata
    await supabase.auth.admin.updateUserById(existing.id, {
      password,
      email_confirm: true,
      user_metadata: { name },
    });
    console.log(`  🔄 Supabase Auth user updated: ${email}`);
    return;
  }

  const { error } = await supabase.auth.admin.createUser({
    email,
    email_confirm: true,
    password,
    user_metadata: { name },
  });
  if (error) {
    console.error(`  ❌ Supabase Auth create failed for ${email}:`, error.message);
  } else {
    console.log(`  ✅ Supabase Auth user created: ${email}`);
  }
}

async function main() {
  console.log('🌱 Seeding users, clinics & sample analytics...\n');

  const adminPassword = 'Hello@123';
  const adminHash = await bcrypt.hash(adminPassword, SALT_ROUNDS);
  const clientPassword = 'Hello@123';
  const clientHash = await bcrypt.hash(clientPassword, SALT_ROUNDS);

  // ─── 1. Admin User ───
  await ensureSupabaseUser('shree@focusyourfinance.com', adminPassword, 'Shree');
  const admin = await prisma.user.upsert({
    where: { email: 'shree@focusyourfinance.com' },
    update: { password: adminHash, role: 'admin', name: 'Shree' },
    create: {
      email: 'shree@focusyourfinance.com',
      password: adminHash,
      name: 'Shree',
      role: 'admin',
    },
  });
  console.log(`✅ Admin created: ${admin.email} (id: ${admin.id})`);

  // ─── 2. (Client user removed) ───

  // ─── 3. Create sample clinics ───
  const clinicData = [
    { name: 'Houston ER & Hospital', type: 'ER', location: 'Houston, TX' },
    { name: 'Dallas Urgent Care', type: 'Urgent Care', location: 'Dallas, TX' },
    { name: 'Austin Wellness Center', type: 'Wellness', location: 'Austin, TX' },
  ];

  const clinics = [];
  for (const c of clinicData) {
    const clinic = await prisma.clinic.upsert({
      where: { id: `seed-${c.name.replace(/\s+/g, '-').toLowerCase()}` },
      update: { name: c.name, type: c.type, location: c.location },
      create: {
        id: `seed-${c.name.replace(/\s+/g, '-').toLowerCase()}`,
        name: c.name,
        type: c.type,
        location: c.location,
        leads: Math.floor(Math.random() * 80) + 20,
        appointments: Math.floor(Math.random() * 40) + 10,
      },
    });
    clinics.push(clinic);
    console.log(`✅ Clinic created: ${clinic.name} (id: ${clinic.id})`);
  }

  // ─── 4. Assign all clinics to the admin user ───
  for (const clinic of clinics) {
    await prisma.clientClinic.upsert({
      where: {
        userId_clinicId: { userId: admin.id, clinicId: clinic.id },
      },
      update: {},
      create: {
        userId: admin.id,
        clinicId: clinic.id,
      },
    });
    console.log(`  🔗 Assigned "${clinic.name}" → ${admin.email}`);
  }

  // ─── 5. Seed sample Analytics data for the client (per clinic) ───
  const today = new Date(); // This variable is defined but never used
  for (const clinic of clinics) {
    // Check if data already exists
    const existing = await prisma.analyticsData.count({
      where: { userId: admin.id, clinicId: clinic.id },
    });
    if (existing > 0) {
      console.log(`  📊 Analytics already exist for ${clinic.name}, skipping...`);
      continue;
    }

    for (let daysAgo = 30; daysAgo >= 0; daysAgo--) {
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);

      // Generate realistic-looking data with some variance per clinic
      const base = clinics.indexOf(clinic);
      const trend = (30 - daysAgo) / 30; // trending up over time

      await prisma.analyticsData.create({
        data: {
          userId: admin.id,
          clinicId: clinic.id,
          date,
          gscClicks: Math.floor((40 + base * 15) * (0.7 + trend * 0.6) + Math.random() * 20),
          gscImpressions: Math.floor((800 + base * 200) * (0.7 + trend * 0.6) + Math.random() * 200),
          gscCtr: parseFloat((2.5 + base * 0.5 + trend * 1.5 + Math.random() * 1).toFixed(2)),
          gscAvgPosition: parseFloat((12 - trend * 4 - base * 1.5 + Math.random() * 3).toFixed(1)),
          gmbPhoneCalls: Math.floor((8 + base * 3) * (0.6 + trend * 0.8) + Math.random() * 5),
          gmbWebsiteClicks: Math.floor((15 + base * 5) * (0.6 + trend * 0.8) + Math.random() * 8),
          gmbDirectionRequests: Math.floor((5 + base * 2) * (0.6 + trend * 0.8) + Math.random() * 4),
          gmbActions: Math.floor((30 + base * 10) * (0.6 + trend * 0.8) + Math.random() * 10),
          gmbProfileViews: Math.floor((100 + base * 30) * (0.6 + trend * 0.8) + Math.random() * 40),
          gmbReviewCount: Math.floor(base * 2 + trend * 3 + Math.random() * 2),
        },
      });
    }
    console.log(`  📊 Seeded 31 days of analytics for ${clinic.name}`);
  }

  console.log('\n🎉 Seeding complete!\n');
  console.log('─── Login Credentials ───');
  console.log('Admin:  shree@focusyourfinance.com / Hello@123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
