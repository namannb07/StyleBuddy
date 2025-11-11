import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { signToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const { name, email, password } = body;

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    // Generate JWT token
    const token = signToken({
      userId: String(user._id),
      email: user.email,
    });

    return NextResponse.json(
      {
        success: true,
        token,
        user: {
          id: String(user._id),
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);

    // Handle MongoDB duplicate key error (E11000)
    if (error instanceof Error && error.message.includes('E11000')) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Handle Mongoose validation errors
    if (error && typeof error === 'object' && 'name' in error && error.name === 'ValidationError') {
      const validationError = error as any;
      const firstError = Object.values(validationError.errors || {})[0] as any;
      return NextResponse.json(
        { error: firstError?.message || 'Validation error' },
        { status: 400 }
      );
    }

    const message =
      error instanceof Error ? error.message : 'Internal server error';
    const isEnvError = message.toLowerCase().includes('environment variable');
    const isMongoError = message.toLowerCase().includes('mongodb') || message.toLowerCase().includes('connection');

    return NextResponse.json(
      {
        error: isEnvError
          ? 'Server configuration error: missing environment variables'
          : isMongoError
          ? 'Database connection error. Please try again later.'
          : message.includes('JWT_SECRET')
          ? 'Server configuration error: missing JWT secret'
          : 'Internal server error',
      },
      { status: 500 }
    );
  }
}

