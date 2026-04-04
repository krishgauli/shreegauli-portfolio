import type { User as DbUser } from '@prisma/client';
import prisma from '@/lib/prisma';

export const SUPABASE_PASSWORD_PLACEHOLDER = '__supabase_managed_account__';

const DEFAULT_ADMIN_EMAILS = ['shree@focusyourfinance.com'];

function getAdminEmails() {
  const configured = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  return configured.length > 0 ? configured : DEFAULT_ADMIN_EMAILS;
}

export function isAdminEmail(email: string) {
  return getAdminEmails().includes(email.trim().toLowerCase());
}

export async function syncAppUser(params: {
  avatar?: string | null;
  email: string;
  name?: string | null;
  passwordHash?: string;
}) {
  const normalizedEmail = params.email.trim().toLowerCase();
  const desiredName = params.name?.trim() || normalizedEmail.split('@')[0] || 'User';
  const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });

  if (existing) {
    const updates: Partial<DbUser> = {};

    if (desiredName && desiredName !== existing.name) {
      updates.name = desiredName;
    }

    if (params.avatar !== undefined && params.avatar !== existing.avatar) {
      updates.avatar = params.avatar;
    }

    if (
      params.passwordHash &&
      (!existing.password || existing.password === SUPABASE_PASSWORD_PLACEHOLDER)
    ) {
      updates.password = params.passwordHash;
    }

    if (Object.keys(updates).length === 0) {
      return existing;
    }

    return prisma.user.update({
      where: { id: existing.id },
      data: updates,
    });
  }

  return prisma.user.create({
    data: {
      email: normalizedEmail,
      name: desiredName,
      password: params.passwordHash || SUPABASE_PASSWORD_PLACEHOLDER,
      role: isAdminEmail(normalizedEmail) ? 'admin' : 'client',
      avatar: params.avatar || null,
    },
  });
}
