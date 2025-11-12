# StyleBuddy - AI-Powered Style Assistant

<div align="center">

![StyleBuddy Logo](https://img.shields.io/badge/StyleBuddy-AI%20Style%20Assistant-9400D3?style=for-the-badge)

**Your personal AI-powered style assistant. Get instant feedback on your outfits, personalized style guidance, and hairstyle suggestions.**

[Features](#-features)  [Installation](#-installation)  [Documentation](#-documentation)  [Tech Stack](#-tech-stack)

</div>

---

## Table of Contents

- [About The Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture Overview](#-architecture-overview)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Code Documentation](#-code-documentation)
  - [Frontend Components](#frontend-components)
  - [API Routes](#api-routes)
  - [AI Flows](#ai-flows)
  - [Authentication System](#authentication-system)
  - [Database Models](#database-models)
- [Usage Guide](#-usage-guide)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

##  About The Project

StyleBuddy is a modern, full-stack web application that leverages AI to provide personalized fashion and style recommendations. Built with Next.js 15 and powered by Google's Genkit AI framework, it offers three core features:

1. **Outfit Rating**: Upload photos of your outfits and receive AI-powered feedback with ratings
2. **Style Guide**: Get personalized outfit and color recommendations based on your body type, face shape, and preferences
3. **Hairstyle Helper**: Discover hairstyles that complement your face shape and gender

The application features a complete authentication system, user profile management, and the ability to save favorite style recommendations for future reference.

---

##  Features

### Core Features

- ** Outfit Rater**
  - Upload full-body outfit photos
  - Receive AI-generated ratings (1-10 scale)
  - Get detailed, constructive feedback
  - Save ratings to your collection

- ** Style Guide**
  - Two input methods:
    - Manual entry (skin tone, face shape, body shape, gender)
    - Photo analysis (AI automatically detects features)
  - Personalized color palette (5 hex codes with visual swatches)
  - Detailed outfit suggestions (top, bottom, wearables)
  - Save recommendations for later

- ** Hairstyle Helper**
  - Upload face photos for analysis
  - AI detects face shape automatically
  - Gender-specific hairstyle recommendations
  - Multiple style suggestions per analysis

### Additional Features

- ** User Authentication**
  - Secure registration and login
  - JWT-based session management
  - Protected routes and API endpoints
  - Persistent sessions via localStorage

- ** Saved Styles Collection**
  - Save favorite outfit ratings and style recommendations
  - View all saved styles in a beautiful grid layout
  - Delete saved styles with confirmation dialogs
  - Color swatches displayed instead of hex codes

- ** Modern UI/UX**
  - Responsive design (mobile, tablet, desktop)
  - Beautiful color scheme (violet/magenta theme)
  - Smooth animations and transitions
  - Accessible components (Radix UI)
  - Toast notifications for user feedback

---

##   Tech Stack

### Frontend
- **Framework**: [Next.js 15.3.3](https://nextjs.org/) (App Router)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context API + Hooks

### Backend
- **Runtime**: Node.js 20+
- **API Framework**: Next.js API Routes
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs

### AI & ML
- **AI Framework**: [Google Genkit 1.14](https://firebase.google.com/docs/genkit)
- **AI Model**: Google Gemini 2.0 Flash
- **AI Provider**: [@genkit-ai/googleai](https://www.npmjs.com/package/@genkit-ai/googleai)

### Database
- **Database**: [MongoDB](https://www.mongodb.com/)
- **ODM**: [Mongoose 8.19](https://mongoosejs.com/)

### Development Tools
- **Package Manager**: npm
- **Build Tool**: Next.js Turbopack
- **Linting**: ESLint
- **Type Checking**: TypeScript

### Deployment
- **Platform**: [Netlify](https://www.netlify.com/) / [Firebase App Hosting](https://firebase.google.com/docs/hosting)
- **Environment**: Production-ready configuration

---

## ðŸ— Architecture Overview

### High-Level Architecture

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                    Client (Browser)                      â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”   â”‚
â”‚  â”‚   React UI   â”‚  â”‚  Auth Contextâ”‚  â”‚  API Client  â”‚   â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜   â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                          â”‚
                          â”‚ HTTP/HTTPS
                          â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚              Next.js Application Server                  â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”   â”‚
â”‚  â”‚  API Routes  â”‚  â”‚  Auth Middlewareâ”‚ â”‚  Genkit Flows â”‚  â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜   â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
         â”‚                    â”‚                    â”‚
         â–¼                    â–¼                    â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”    â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”    â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚   MongoDB    â”‚    â”‚  Google AI   â”‚    â”‚   JWT Auth   â”‚
â”‚  Database    â”‚    â”‚   (Gemini)   â”‚    â”‚   Service    â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜    â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜    â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

### Data Flow

1. **User Interaction**: User interacts with React components in the browser
2. **API Request**: Components make HTTP requests to Next.js API routes
3. **Authentication**: API routes verify JWT tokens from request headers
4. **AI Processing**: For AI features, requests are forwarded to Genkit flows
5. **Database Operations**: User data and saved styles are stored/retrieved from MongoDB
6. **Response**: Results are sent back to the client and displayed in the UI

---

## ðŸ“¦ Installation & Setup

### Prerequisites

- **Node.js**: v20 or later
- **npm**: v10 or later (comes with Node.js)
- **MongoDB**: A MongoDB database (local or cloud like MongoDB Atlas)
- **Google AI API Key**: For Genkit AI features

### Step 1: Clone the Repository

```bash
git clone https://github.com/your_username/StyleBuddy.git
cd StyleBuddy
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js and React
- Genkit AI framework
- MongoDB/Mongoose
- UI components (Radix UI, shadcn/ui)
- Authentication libraries (JWT, bcryptjs)

### Step 3: Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority

# JWT Secret (generate a random string)
JWT_SECRET=your-super-secret-jwt-key-here-minimum-32-characters

# Google AI API Key (for Genkit)
GOOGLE_AI_API_KEY=your-google-ai-api-key-here
```

**Important**: 
- Replace all placeholder values with your actual credentials
- Never commit `.env.local` to version control
- For production, set these in your hosting platform's environment variables

### Step 4: Configure Genkit (Optional)

If you need to modify the AI model or API key, edit `src/ai/genkit.ts`:

```typescript
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_AI_API_KEY, // Use env variable
    }),
  ],
  model: "googleai/gemini-2.0-flash",
});
```

### Step 5: Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:9002`

### Step 6: Run Genkit Dev Server (Optional, for AI development)

In a separate terminal:

```bash
npm run genkit:dev
```

This starts the Genkit development server for testing AI flows independently.

---

## ðŸ” Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |
| `JWT_SECRET` | Secret key for JWT token signing | `your-random-secret-key-32-chars-min` |
| `GOOGLE_AI_API_KEY` | Google AI API key for Genkit | `AIzaSy...` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `9002` |

### Generating a Secure JWT Secret

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using OpenSSL
openssl rand -hex 32
```

---

## ðŸ“ Project Structure

```
StyleBuddy/
â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ ai/                          # AI/Genkit related code
â”‚   â”‚   â”œâ”€â”€ flows/                    # AI flow definitions
â”‚   â”‚   â”‚   â”œâ”€â”€ rate-outfit.ts       # Outfit rating AI flow
â”‚   â”‚   â”‚   â”œâ”€â”€ suggest-outfit.ts    # Manual style suggestion flow
â”‚   â”‚   â”‚   â”œâ”€â”€ suggest-outfit-from-photo.ts  # Photo-based style flow
â”‚   â”‚   â”‚   â”œâ”€â”€ suggest-hairstyle.ts # Hairstyle suggestion flow
â”‚   â”‚   â”‚   â””â”€â”€ schemas.ts           # Shared Zod schemas
â”‚   â”‚   â””â”€â”€ genkit.ts                # Genkit configuration
â”‚   â”‚
â”‚   â”œâ”€â”€ app/                          # Next.js App Router
â”‚   â”‚   â”œâ”€â”€ api/                      # API routes
â”‚   â”‚   â”‚   â”œâ”€â”€ auth/
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ login/route.ts   # Login endpoint
â”‚   â”‚   â”‚   â”‚   â””â”€â”€ register/route.ts # Registration endpoint
â”‚   â”‚   â”‚   â”œâ”€â”€ rate-outfit/route.ts # Outfit rating API
â”‚   â”‚   â”‚   â”œâ”€â”€ suggest-outfit/route.ts # Style suggestion API
â”‚   â”‚   â”‚   â”œâ”€â”€ suggest-outfit-from-photo/route.ts
â”‚   â”‚   â”‚   â”œâ”€â”€ suggest-hairstyle/route.ts
â”‚   â”‚   â”‚   â””â”€â”€ saved-styles/route.ts # Saved styles CRUD API
â”‚   â”‚   â”œâ”€â”€ login/page.tsx          # Login page
â”‚   â”‚   â”œâ”€â”€ register/page.tsx       # Registration page
â”‚   â”‚   â”œâ”€â”€ saved-styles/page.tsx    # Saved styles collection page
â”‚   â”‚   â”œâ”€â”€ page.tsx                 # Home page
â”‚   â”‚   â”œâ”€â”€ layout.tsx               # Root layout
â”‚   â”‚   â””â”€â”€ globals.css              # Global styles
â”‚   â”‚
â”‚   â”œâ”€â”€ components/                   # React components
â”‚   â”‚   â”œâ”€â”€ ui/                      # shadcn/ui components
â”‚   â”‚   â”‚   â”œâ”€â”€ button.tsx
â”‚   â”‚   â”‚   â”œâ”€â”€ card.tsx
â”‚   â”‚   â”‚   â”œâ”€â”€ input.tsx
â”‚   â”‚   â”‚   â”œâ”€â”€ alert-dialog.tsx
â”‚   â”‚   â”‚   â””â”€â”€ ... (30+ UI components)
â”‚   â”‚   â”œâ”€â”€ outfit-rater.tsx         # Outfit rating component
â”‚   â”‚   â”œâ”€â”€ style-guide.tsx          # Style guide component
â”‚   â”‚   â”œâ”€â”€ hairstyle-helper.tsx     # Hairstyle helper component
â”‚   â”‚   â”œâ”€â”€ feature-tabs.tsx         # Feature tabs component
â”‚   â”‚   â”œâ”€â”€ navbar.tsx               # Navigation bar
â”‚   â”‚   â”œâ”€â”€ footer.tsx               # Footer component
â”‚   â”‚   â””â”€â”€ how-to-use.tsx           # How-to-use guide
â”‚   â”‚
â”‚   â”œâ”€â”€ contexts/                     # React contexts
â”‚   â”‚   â””â”€â”€ AuthContext.tsx          # Authentication context
â”‚   â”‚
â”‚   â”œâ”€â”€ hooks/                        # Custom React hooks
â”‚   â”‚   â”œâ”€â”€ use-toast.ts             # Toast notification hook
â”‚   â”‚   â””â”€â”€ use-mobile.tsx           # Mobile detection hook
â”‚   â”‚
â”‚   â”œâ”€â”€ lib/                          # Utility functions
â”‚   â”‚   â”œâ”€â”€ auth.ts                   # JWT authentication utilities
â”‚   â”‚   â”œâ”€â”€ dbConnect.ts              # MongoDB connection handler
â”‚   â”‚   â”œâ”€â”€ saveStyle.ts              # Save style utility
â”‚   â”‚   â””â”€â”€ utils.ts                  # General utilities
â”‚   â”‚
â”‚   â””â”€â”€ models/                       # Mongoose models
â”‚       â”œâ”€â”€ User.ts                   # User model
â”‚       â””â”€â”€ SavedStyle.ts             # Saved style model
â”‚
â”œâ”€â”€ public/                           # Static assets
â”œâ”€â”€ .env.local                        # Environment variables (not in git)
â”œâ”€â”€ next.config.ts                    # Next.js configuration
â”œâ”€â”€ tailwind.config.ts                # Tailwind CSS configuration
â”œâ”€â”€ tsconfig.json                     # TypeScript configuration
â”œâ”€â”€ package.json                      # Dependencies and scripts
â””â”€â”€ README.md                         # This file
```

---

## ðŸ“š Code Documentation

### Frontend Components

#### 1. **Outfit Rater Component** (`src/components/outfit-rater.tsx`)

**Purpose**: Allows users to upload outfit photos and receive AI-generated ratings.

**Key Features**:
- Image upload with preview
- Progress indicator during AI processing
- Rating display (1-10 scale with progress bar)
- Detailed feedback display
- Save functionality for authenticated users

**Code Flow**:
```typescript
1. User uploads image â†’ FileReader converts to base64
2. Base64 image sent to /api/rate-outfit
3. API route calls rateOutfitFlow from Genkit
4. AI analyzes image and returns rating + feedback
5. Results displayed in card with save option
```

**State Management**:
- `state`: Tracks loading, success, error states
- `imagePreview`: Stores preview URL
- `savedImageUrl`: Stores image for saving

#### 2. **Style Guide Component** (`src/components/style-guide.tsx`)

**Purpose**: Provides personalized style recommendations based on user input or photo analysis.

**Key Features**:
- Two input modes:
  - **Manual**: Form with skin tone, face shape, body shape, gender
  - **Photo**: Upload photo for AI analysis
- Color palette display with visual swatches
- Outfit suggestions (top, bottom, wearables)
- Save recommendations

**Code Flow**:
```typescript
Manual Mode:
1. User fills form â†’ Data sent to /api/suggest-outfit
2. API calls suggestOutfitFlow
3. AI generates recommendations
4. Results displayed with color swatches

Photo Mode:
1. User uploads photo â†’ Converted to base64
2. Sent to /api/suggest-outfit-from-photo
3. AI analyzes photo and generates recommendations
4. Results displayed
```

**State Management**:
- `state`: Tracks form state and results
- `inputMode`: Toggles between manual/photo input
- `savedImageUrl`: Stores image for saving

#### 3. **Hairstyle Helper Component** (`src/components/hairstyle-helper.tsx`)

**Purpose**: Suggests hairstyles based on face shape analysis.

**Key Features**:
- Face photo upload
- Gender selection
- AI face shape detection
- Multiple hairstyle suggestions
- Save functionality

**Code Flow**:
```typescript
1. User uploads face photo + selects gender
2. Data sent to /api/suggest-hairstyle
3. AI analyzes face shape
4. Generates gender-appropriate hairstyle suggestions
5. Results displayed in grid
```

#### 4. **Saved Styles Page** (`src/app/saved-styles/page.tsx`)

**Purpose**: Displays all saved style recommendations in a collection view.

**Key Features**:
- Grid layout of saved styles
- Color swatch rendering (replaces hex codes)
- Delete functionality with confirmation
- Responsive design
- Empty state handling

**Color Swatch Implementation**:
```typescript
// Parses hex codes from text and renders visual swatches
const renderTextWithColors = (text: string) => {
  // Regex finds #RRGGBB or #RGB patterns
  // Replaces with colored box + hex code
  // Returns React component with inline color swatches
}
```

**Delete Flow**:
```typescript
1. User clicks delete button
2. Confirmation dialog appears
3. On confirm â†’ DELETE /api/saved-styles?id=styleId
4. Style removed from database
5. UI updates to remove deleted card
6. Toast notification shown
```

### API Routes

#### Authentication Routes

##### `POST /api/auth/register`

**Purpose**: Register a new user account.

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response** (201):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Handling**:
- 400: Missing fields, password too short, email already exists
- 500: Server errors (database, hashing, JWT)

**Code Flow**:
```typescript
1. Validate input (name, email, password)
2. Check if user exists
3. Hash password with bcrypt (10 rounds)
4. Create user in MongoDB
5. Generate JWT token
6. Return token and user data
```

##### `POST /api/auth/login`

**Purpose**: Authenticate existing user.

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response** (200):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
}
```

**Error Handling**:
- 400: Missing fields
- 401: Invalid credentials
- 500: Server errors

**Code Flow**:
```typescript
1. Validate email and password
2. Find user by email
3. Compare password with bcrypt
4. Generate JWT token
5. Return token and user data
```

#### AI Feature Routes

##### `POST /api/rate-outfit`

**Purpose**: Rate an outfit from a photo.

**Request Body**:
```json
{
  "photoDataUri": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}
```

**Response** (200):
```json
{
  "rating": 8.5,
  "feedback": "Your outfit looks great! The color combination..."
}
```

**Code Flow**:
```typescript
1. Extract photoDataUri from request
2. Call rateOutfitFlow from Genkit
3. AI analyzes image
4. Returns rating (1-10) and feedback
5. Response sent to client
```

##### `POST /api/suggest-outfit`

**Purpose**: Get style recommendations from manual input.

**Request Body**:
```json
{
  "skinTone": "medium",
  "faceShape": "oval",
  "bodyShape": "rectangle",
  "gender": "male"
}
```

**Response** (200):
```json
{
  "colorPalette": ["#2E86AB", "#F2D7EE", ...],
  "outfitSuggestion": {
    "top": "V-neck t-shirt in muted teal...",
    "bottom": "Slim fit chinos in light beige...",
    "wearables": "Leather watch with dark face..."
  }
}
```

##### `POST /api/suggest-outfit-from-photo`

**Purpose**: Get style recommendations from photo analysis.

**Request Body**:
```json
{
  "photoDataUri": "data:image/jpeg;base64,..."
}
```

**Response**: Same as `suggest-outfit`

**Code Flow**:
```typescript
1. Extract photoDataUri
2. Call suggestOutfitFromPhotoFlow
3. AI analyzes photo to detect:
   - Skin tone
   - Face shape
   - Body shape
4. Generates recommendations
5. Returns results
```

##### `POST /api/suggest-hairstyle`

**Purpose**: Get hairstyle suggestions.

**Request Body**:
```json
{
  "photoDataUri": "data:image/jpeg;base64,...",
  "gender": "male"
}
```

**Response** (200):
```json
{
  "faceShape": "round",
  "suggestedHairstyles": [
    "Short textured crop",
    "Side part with fade",
    ...
  ]
}
```

#### Saved Styles Routes

##### `GET /api/saved-styles`

**Purpose**: Get all saved styles for authenticated user.

**Headers**:
```
Authorization: Bearer <jwt_token>
```

**Response** (200):
```json
{
  "success": true,
  "savedStyles": [
    {
      "id": "style_id",
      "imageUrl": "data:image/jpeg;base64,...",
      "feedback": "Great outfit!",
      "suggestions": "Colors: #2E86AB, #F2D7EE...",
      "createdAt": "2024-01-15T10:30:00Z"
    },
    ...
  ]
}
```

**Code Flow**:
```typescript
1. Extract JWT from Authorization header
2. Verify token and get userId
3. Query MongoDB for user's saved styles
4. Sort by createdAt (newest first)
5. Return formatted results
```

##### `POST /api/saved-styles`

**Purpose**: Save a new style recommendation.

**Headers**:
```
Authorization: Bearer <jwt_token>
```

**Request Body**:
```json
{
  "imageUrl": "data:image/jpeg;base64,...",
  "feedback": "Great outfit!",
  "suggestions": "Colors: #2E86AB..."
}
```

**Response** (201):
```json
{
  "success": true,
  "savedStyle": { ... }
}
```

##### `DELETE /api/saved-styles?id=styleId`

**Purpose**: Delete a saved style.

**Headers**:
```
Authorization: Bearer <jwt_token>
```

**Query Parameters**:
- `id`: The ID of the style to delete

**Response** (200):
```json
{
  "success": true,
  "message": "Style deleted successfully"
}
```

**Security**: Only deletes styles belonging to the authenticated user.

### AI Flows

#### 1. **Rate Outfit Flow** (`src/ai/flows/rate-outfit.ts`)

**Purpose**: Analyze an outfit photo and provide a rating and feedback.

**Input Schema**:
```typescript
{
  photoDataUri: string  // Base64 encoded image with MIME type
}
```

**Output Schema**:
```typescript
{
  rating: number,        // 1-10 scale
  feedback: string      // Detailed feedback
}
```

**AI Prompt**:
```
You are a professional fashion stylist. You will be provided with a photo of an outfit.
Rate the outfit on a scale of 1 to 10, and provide detailed feedback.
```

**Implementation**:
```typescript
export const rateOutfitFlow = ai.defineFlow({
  name: 'rateOutfitFlow',
  inputSchema: RateOutfitInputSchema,
  outputSchema: RateOutfitOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
```

#### 2. **Suggest Outfit Flow** (`src/ai/flows/suggest-outfit.ts`)

**Purpose**: Generate style recommendations from manual input.

**Input Schema**:
```typescript
{
  skinTone: string,     // e.g., "light", "medium", "dark"
  faceShape: string,     // e.g., "oval", "round", "square"
  bodyShape: string,     // e.g., "rectangle", "triangle", "hourglass"
  gender: "male" | "female"
}
```

**Output Schema**:
```typescript
{
  colorPalette: string[],  // Array of 5 hex color codes
  outfitSuggestion: {
    top: string,
    bottom: string,
    wearables: string
  }
}
```

**AI Prompt**:
```
You are a personal stylist. Suggest an outfit and color combinations based on:
- Skin Tone: {skinTone}
- Face Shape: {faceShape}
- Body Shape: {bodyShape}
- Gender: {gender}

Provide a color palette with 5 hex codes.
Also, provide outfit suggestions broken down into top, bottom, and wearables.
```

#### 3. **Suggest Outfit From Photo Flow** (`src/ai/flows/suggest-outfit-from-photo.ts`)

**Purpose**: Analyze a photo and generate style recommendations automatically.

**Input Schema**:
```typescript
{
  photoDataUri: string  // Base64 encoded image
}
```

**Output Schema**: Same as `suggest-outfit`

**AI Prompt**:
```
You are a personal stylist. Analyze the provided photo to determine:
- Skin tone
- Face shape
- Body shape

Then suggest an outfit and color combinations that would suit them.
```

#### 4. **Suggest Hairstyle Flow** (`src/ai/flows/suggest-hairstyle.ts`)

**Purpose**: Analyze face shape and suggest appropriate hairstyles.

**Input Schema**:
```typescript
{
  photoDataUri: string,
  gender: "male" | "female"
}
```

**Output Schema**:
```typescript
{
  faceShape: string,              // Detected face shape
  suggestedHairstyles: string[]   // Array of hairstyle suggestions
}
```

**AI Prompt**:
```
You are a professional hairstylist. Based on the user's face shape and gender,
suggest a list of hairstyles that would suit them.

Analyze the provided photo to determine the face shape, then suggest
hairstyles accordingly.
```

### Authentication System

#### JWT Token Management (`src/lib/auth.ts`)

**Functions**:

1. **`signToken(payload: JWTPayload): string`**
   - Creates a JWT token with user ID and email
   - Expires in 7 days
   - Uses `JWT_SECRET` from environment variables

2. **`verifyToken(token: string): JWTPayload | null`**
   - Verifies and decodes JWT token
   - Returns user payload or null if invalid

3. **`getUserFromRequest(request: NextRequest): JWTPayload | null`**
   - Extracts JWT from `Authorization: Bearer <token>` header
   - Verifies token and returns user data
   - Used in API routes for authentication

#### Auth Context (`src/contexts/AuthContext.tsx`)

**Purpose**: Provides authentication state to all components.

**State**:
- `user`: Current user object (id, name, email)
- `token`: JWT token string
- `isAuthenticated`: Boolean flag

**Methods**:
- `login(token, user)`: Sets user and token, stores in localStorage
- `logout()`: Clears user and token, removes from localStorage

**Persistence**: Uses `localStorage` to persist sessions across page refreshes.

**Usage**:
```typescript
const { user, token, isAuthenticated, login, logout } = useAuth();
```

### Database Models

#### User Model (`src/models/User.ts`)

**Schema**:
```typescript
{
  name: string,           // Required, trimmed
  email: string,          // Required, unique, lowercase, validated
  password: string,      // Required, min 6 characters, hashed
  createdAt: Date        // Auto-generated
}
```

**Features**:
- Email validation with regex
- Unique email constraint
- Automatic lowercase conversion
- Password minimum length validation

**Usage**:
```typescript
import User from '@/models/User';

// Create user
const user = await User.create({ name, email, password: hashedPassword });

// Find user
const user = await User.findOne({ email });
```

#### Saved Style Model (`src/models/SavedStyle.ts`)

**Schema**:
```typescript
{
  userId: ObjectId,      // Reference to User, indexed
  imageUrl: string,      // Base64 image data URI
  feedback: string,      // AI-generated feedback
  suggestions: string,   // Style suggestions (may contain hex codes)
  createdAt: Date       // Auto-generated
}
```

**Features**:
- Indexed userId for fast queries
- Stores complete style recommendation data
- Automatic timestamp on creation

**Usage**:
```typescript
import SavedStyle from '@/models/SavedStyle';

// Create saved style
const savedStyle = await SavedStyle.create({
  userId: user.userId,
  imageUrl,
  feedback,
  suggestions
});

// Find user's saved styles
const styles = await SavedStyle.find({ userId }).sort({ createdAt: -1 });
```

#### Database Connection (`src/lib/dbConnect.ts`)

**Purpose**: Manages MongoDB connection with caching for Next.js.

**Features**:
- Connection caching (reuses connection in development)
- Prevents multiple connections in serverless environments
- Error handling and reconnection logic

**Implementation**:
```typescript
// Uses global variable to cache connection
// Connects only if not already connected
// Returns existing connection if available
```

---

## ðŸš€ Usage Guide

### For End Users

1. **Register/Login**
   - Navigate to `/register` to create an account
   - Or `/login` if you already have an account
   - Sessions persist across browser sessions

2. **Rate an Outfit**
   - Go to the "Outfit Rater" tab
   - Upload a full-body outfit photo
   - Wait for AI analysis (usually 5-10 seconds)
   - View your rating and feedback
   - Click "Save Style" to add to your collection

3. **Get Style Recommendations**
   - Go to the "Style Guide" tab
   - Choose manual input or photo upload
   - Fill in details or upload photo
   - View color palette and outfit suggestions
   - Save recommendations you like

4. **Find Hairstyles**
   - Go to the "Hairstyle Helper" tab
   - Upload a clear face photo
   - Select your gender
   - View AI-detected face shape and suggestions
   - Save favorite hairstyles

5. **View Saved Styles**
   - Click "Saved Styles" in navigation
   - Browse your collection
   - Delete styles you no longer need

### For Developers

#### Adding a New AI Feature

1. **Create AI Flow** (`src/ai/flows/new-feature.ts`):
```typescript
import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NewFeatureInputSchema = z.object({
  // Define input schema
});

const NewFeatureOutputSchema = z.object({
  // Define output schema
});

const prompt = ai.definePrompt({
  name: 'newFeaturePrompt',
  input: {schema: NewFeatureInputSchema},
  output: {schema: NewFeatureOutputSchema},
  prompt: `Your AI prompt here...`,
});

export const newFeatureFlow = ai.defineFlow({
  name: 'newFeatureFlow',
  inputSchema: NewFeatureInputSchema,
  outputSchema: NewFeatureOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
```

2. **Create API Route** (`src/app/api/new-feature/route.ts`):
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { runFlow } from '@genkit-ai/next/server';
import { newFeatureFlow } from '@/ai/flows/new-feature';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await runFlow(newFeatureFlow, body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

3. **Create React Component** (`src/components/new-feature.tsx`):
```typescript
'use client';

import { useState } from 'react';
import { runFlow } from '@genkit-ai/next/client';
import { newFeatureFlow } from '@/ai/flows/new-feature';

export function NewFeature() {
  const [result, setResult] = useState(null);
  
  const handleSubmit = async (data) => {
    const result = await runFlow<typeof newFeatureFlow>({
      url: '/api/new-feature',
      input: data,
    });
    setResult(result);
  };
  
  // Render UI...
}
```

#### Customizing Styles

Edit `tailwind.config.ts` to modify:
- Color scheme
- Font families
- Spacing
- Breakpoints

Edit `src/app/globals.css` for global styles.

---

## ðŸŒ Deployment

### Netlify Deployment

1. **Build Configuration**:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 20

2. **Environment Variables**:
   - Add all variables from `.env.local` in Netlify dashboard
   - Go to Site Settings â†’ Environment Variables

3. **Deploy**:
   - Connect GitHub repository
   - Netlify will auto-deploy on push to main branch

### Firebase App Hosting

1. **Install Firebase CLI**:
```bash
npm install -g firebase-tools
firebase login
```

2. **Initialize Firebase**:
```bash
firebase init hosting
```

3. **Configure `apphosting.yaml`**:
```yaml
run:
  buildCommand: npm run build
  startCommand: npm start
env:
  - variable: MONGODB_URI
    secret: mongodb-uri
  - variable: JWT_SECRET
    secret: jwt-secret
```

4. **Deploy**:
```bash
firebase deploy --only hosting
```

### Environment Variables in Production

**Important**: Never commit `.env.local`. Set these in your hosting platform:

- **Netlify**: Site Settings â†’ Environment Variables
- **Firebase**: App Hosting â†’ Environment Variables
- **Vercel**: Project Settings â†’ Environment Variables

---

## ðŸ¤ Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed
- Follow the existing code style

---

## ðŸ“„ License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## ðŸ™ Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Google Genkit](https://firebase.google.com/docs/genkit) for AI capabilities
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling

---

## ðŸ“ž Support

For support, email support@stylebuddy.com or open an issue in the GitHub repository.

---

<div align="center">

**Made with â¤ï¸ using Next.js and Google Genkit**

[â¬† Back to Top](#-table-of-contents)

</div>
