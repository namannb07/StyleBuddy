import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import SavedStyle from '@/models/SavedStyle';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    const body = await request.json();
    const { imageUrl, feedback, suggestions } = body;

    // Validation
    if (!imageUrl || !feedback || !suggestions) {
      return NextResponse.json(
        { error: 'imageUrl, feedback, and suggestions are required' },
        { status: 400 }
      );
    }

    // Create saved style
    const savedStyle = await SavedStyle.create({
      userId: user.userId,
      imageUrl,
      feedback,
      suggestions,
    });

    return NextResponse.json(
      {
        success: true,
        savedStyle: {
          id: String(savedStyle._id),
          imageUrl: savedStyle.imageUrl,
          feedback: savedStyle.feedback,
          suggestions: savedStyle.suggestions,
          createdAt: savedStyle.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Save style error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    // Get all saved styles for the user
    const savedStyles = await SavedStyle.find({ userId: user.userId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      savedStyles: savedStyles.map((style) => ({
        id: String(style._id),
        imageUrl: style.imageUrl,
        feedback: style.feedback,
        suggestions: style.suggestions,
        createdAt: style.createdAt,
      })),
    });
  } catch (error) {
    console.error('Get saved styles error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

