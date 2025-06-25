// using this as dummy authentication
// will replace with real user data later on once I get that figured out

import { users } from '@/app/lab/users';

import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  // Strict parameter checks
  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    username.length < 3 ||
    username.length > 32 ||
    password.length < 8 ||
    password.length > 64 ||
    !/^[a-zA-Z0-9_]+$/.test(username)
  ) {
    console.error('Invalid login attempt:');
    return NextResponse.json({ error: 'Invalid username or password format.' }, { status: 400 });
  }

  const user = users.find((u) => u.username === username);
  if (!user) {
    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
  }

  // Success - generate token
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: '2h',
  });

  return NextResponse.json({ token });
}