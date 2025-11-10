import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface ISavedStyle extends Document {
  userId: Types.ObjectId;
  imageUrl: string;
  feedback: string;
  suggestions: string;
  createdAt: Date;
}

const SavedStyleSchema: Schema = new Schema<ISavedStyle>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    index: true,
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
  },
  feedback: {
    type: String,
    required: [true, 'Feedback is required'],
  },
  suggestions: {
    type: String,
    required: [true, 'Suggestions are required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SavedStyle: Model<ISavedStyle> = mongoose.models.SavedStyle || mongoose.model<ISavedStyle>('SavedStyle', SavedStyleSchema);

export default SavedStyle;

