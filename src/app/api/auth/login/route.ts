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

    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = signToken({
      userId: String(user._id),
      email: user.email,
    });

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);

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

