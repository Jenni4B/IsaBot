# IsaBot

An AI-powered content creation dashboard built with Next.js, designed to help content creators and podcasters manage their workflow with intelligent assistance and organizational tools.

## Overview

IsaBot is a comprehensive web application that serves as a creative workspace for content creators. It combines AI-powered idea generation with practical project management tools, all wrapped in a clean, modern interface. The application integrates with Playlab AI to provide personalized feedback and suggestions in the voice of Isabella from Isa Media Inc.

## Features

### 🤖 AI-Powered Assistance
- **Idea Generation**: Get AI-generated content ideas and feedback using Playlab integration
- **Intelligent Summaries**: AI-powered analysis and suggestions for creative projects
- **Tone-Aware Responses**: AI trained to match Isa Media Inc's coaching style

### 📋 Project Management
- **Task List**: Interactive to-do list with quick-add suggestions for common creator tasks
- **Content Pipeline**: Track content projects through Draft, In Progress, and Published stages
- **Status Management**: Visual indicators for project progress and deadlines

### 🔐 Authentication & Security
- **Protected Routes**: Secure dashboard access with authentication context
- **Session Management**: Persistent login state with localStorage integration
- **Route Guards**: Automatic redirects for authenticated/unauthenticated users

### 🎨 User Experience
- **Responsive Design**: Clean, modern UI optimized for all devices
- **Dark Theme**: Professional dark mode interface
- **Customizable Settings**: Theme preferences and user information management

## Tech Stack

- **Framework**: Next.js 15.3.2 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom design system
- **AI Integration**: Playlab API for intelligent content assistance
- **Cloud Storage**: Google Drive API integration for document management
- **State Management**: React Context for authentication and theme management
- **Development**: Turbopack for optimized development builds

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun
- Playlab API credentials
- Google Drive API credentials (optional, for document features)

### Environment Variables

Create a `.env.local` file in your project root:

```env
PLAYLAB_API_KEY=your_playlab_api_key
PLAYLAB_PROJECT_ID=your_project_id
PLAYLAB_API_BASE=https://api.playlab.ai/v1
GOOGLE_DRIVE_FOLDER_ID=your_folder_id
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Jenni4B/IsaBot.git
cd isabot
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up your environment variables (see above)

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
isabot/
├── src/
│   ├── app/
│   │   ├── api/                    # API routes
│   │   │   ├── generate/           # AI idea generation endpoint
│   │   │   └── toneContext/        # Google Drive integration
│   │   ├── auth/                   # Authentication utilities
│   │   │   ├── ProtectedRoute.tsx  # Route protection wrapper
│   │   │   ├── PublicRoute.tsx     # Public route wrapper
│   │   │   └── loggingIn.js        # Login logic
│   │   ├── components/             # React components
│   │   │   ├── common/             # Shared components (navbar, footer)
│   │   │   ├── dashboard/          # Dashboard-specific components
│   │   │   └── settings/           # Settings page components
│   │   ├── context/                # React Context providers
│   │   │   ├── AuthContext.tsx     # Authentication state
│   │   │   └── ThemeContext.tsx    # Theme management
│   │   ├── dashboard/              # Dashboard pages
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── lab/                    # External API integrations
│   │   ├── settings/               # Settings pages
│   │   ├── globals.css             # Global styles and CSS variables
│   │   ├── layout.tsx              # Root layout with providers
│   │   └── page.tsx                # Home page
├── config/                         # Configuration files
├── public/                         # Static assets
├── package.json
└── README.md
```

## Design System

IsaBot uses a custom color palette defined in CSS variables:

- **Navy** (`#202B38`): Primary background
- **Maroon** (`#851C3C`): Secondary accent
- **Blush** (`#F1E8E2`): Primary text
- **Taupe** (`#D9C3B9`): Secondary text
- **Accent** (`#D0355B`): Call-to-action elements
- **White** (`#F7F7F7`): High contrast text

## Key Features

### Dashboard Components

#### Task List
- Add and manage creator-focused tasks
- Quick-add buttons for common activities
- Persistent storage with localStorage
- Visual completion tracking

#### Content Pipeline
- Track projects through development stages
- Inline editing for titles, status, and notes
- Filter by status (Draft, In Progress, Published)
- Full CRUD operations with local persistence

#### AI Idea Box
- Generate content ideas using Playlab AI
- Chat-style interface for natural interaction
- Real-time response streaming
- Conversation history display

### Authentication System
- Context-based authentication state
- Protected route components
- Automatic redirects based on auth status
- Persistent session management

## API Endpoints

### `/api/generate`
Generates AI-powered content ideas and feedback using Playlab integration.

**Method**: POST  
**Body**: 
```json
{
  "input": {
    "message": "Your content idea or prompt"
  }
}
```

### `/api/toneContext`
Retrieves tone and context files from Google Drive for AI training.

**Method**: GET  
**Returns**: Collection of text files for AI context

## Development Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Customization

### Adding New Dashboard Components
1. Create component in `src/app/components/dashboard/`
2. Import and add to `src/app/dashboard/page.tsx`
3. Follow existing patterns for styling and state management

### Modifying AI Behavior
- Update system prompts in `src/app/lab/playlab.ts`
- Adjust API parameters in `src/app/api/generate/route.ts`
- Add new context files via Google Drive integration

### Styling Updates
- Modify CSS variables in `src/app/globals.css`
- Use Tailwind utilities with custom color palette
- Update theme context for dynamic theming

## Deployment

The application is designed for deployment on Vercel or similar platforms that support Next.js:

1. Set environment variables in your deployment platform
2. Ensure API credentials are properly configured
3. Deploy using your platform's standard Next.js deployment process

## License

This project is proprietary to Isa Media Inc and Jennifer Blocker from Launchpad Philly.

---

**Note**: This application is actively under development. Features and functionality may change as the project evolves.