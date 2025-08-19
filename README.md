# StyleBuddy

StyleBuddy is your personal AI-powered style assistant. Get instant feedback on your outfits, personalized style guidance, and hairstyle suggestions.

## About The Project

StyleBuddy is a web application built with Next.js and powered by Google's Genkit. It uses AI to provide users with personalized fashion advice. Whether you're looking for feedback on your outfit, style recommendations, or hairstyle suggestions, StyleBuddy is here to help.

This project was created as a demonstration of how to build a modern web application with AI-powered features. It showcases the use of Next.js for the frontend, Genkit for the AI backend, and Firebase for deployment.

## Core Features

*   **Outfit Rater**: Upload a photo of your outfit and get instant feedback from our AI.
*   **Style Guide**: Get personalized style recommendations based on your preferences.
*   **Hairstyle Helper**: Find the perfect hairstyle for your face shape and hair type.

## Technologies Used

*   **Framework**: [Next.js](https://nextjs.org/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **AI**: [Google's Genkit](https://firebase.google.com/docs/genkit)
*   **UI**: [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/)
*   **Deployment**: [Firebase App Hosting](https://firebase.google.com/docs/hosting)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v20 or later)
*   npm

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username_/your_project_name.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```

### Running the Application

To run the application in development mode, use the following command:

```sh
npm run dev
```

This will start the development server at `http://localhost:9002`.

## Project Structure

The project follows a standard Next.js App Router structure:

```
.
├── src/
│   ├── app/          # Contains all the pages and routes
│   ├── components/   # Contains reusable React components
│   ├── hooks/        # Contains custom React hooks
│   ├── lib/          # Contains utility functions
│   └── ai/           # Contains the Genkit AI flows
├── public/         # Contains static assets
└── ...
```
