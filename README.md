# IsaBot

A client management dashboard application built with Next.js, designed to help track client check-ins and statuses with AI-powered summaries.

## Overview

IsaBot is a web application that provides a clean, modern interface for managing client relationships. It features a dashboard for viewing client statuses, check-in tracking, and AI-generated summaries to help administrators stay informed about client progress. Currently I am using dummy data to test the website, but real data will be pulled from my client's Airtable in future iterations.

## Features

- **Client Dashboard**: View all clients in a tabular format with status indicators
- **Status Tracking**: Monitor client check-ins with color-coded status indicators:
  - **Active**: Recently checked in
  - **Due**: Check-in approaching
  - **Overdue**: Past due for check-in
- **Responsive Design**: Clean, modern UI with dark theme
- **Navigation**: Easy access to different sections of the application

## Tech Stack

- **Framework**: Next.js 15.3.2 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom React components
- **Development**: Turbopack for fast development builds

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun

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

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Current Project Structure as of Friday, May 30th 2025

```
isabot/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── navbar.tsx          # Navigation component
│   │   │   └── clientTable.tsx     # Client data table
│   │   ├── dashboard/
│   │   │   └── page.tsx            # Main dashboard page
│   │   ├── landingpage/
│   │   │   └── page.tsx            # Landing/welcome page
│   │   ├── loginPage/
│   │   │   └── page.tsx            # Login form page
│   │   ├── globals.css             # Global styles and theme
│   │   ├── layout.tsx              # Root layout
│   │   └── page.tsx                # Home page
├── public/                         # Static assets
├── package.json
└── README.md
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality

## Design System

The application uses a custom color palette defined in CSS variables:

- **Navy** (`#202B38`): Primary background
- **Maroon** (`#851C3C`): Secondary accent
- **Blush** (`#F1E8E2`): Primary text
- **Taupe** (`#D9C3B9`): Secondary text
- **Accent** (`#D0355B`): Call-to-action elements

## Pages

### Home Page (`/`)
Landing page with welcome message and call-to-action button.

### Dashboard (`/dashboard`)
Main application interface showing:
- Client table with names, last check-in dates, and statuses
- AI-generated summaries for each client
- Color-coded status indicators

### Login Page (`/loginPage`)
Authentication form (currently frontend only).

## Components

### NavBar
- Responsive navigation with logo and menu items
- Links to Home, Dashboard, and Login pages

### ClientTable
- Displays client data in a structured table format
- Color-coded status indicators
- AI summary integration

## Customization

### Adding New Clients
Currently, dummy client data is stored in the `clientTable.tsx` component. In the future, this will be pulled from the company's AirTable no code application via API


### Styling
The application uses Tailwind CSS with custom CSS variables. Modify `globals.css` to adjust the color scheme or add new design tokens.

## Future Enhancements

- Backend integration for dynamic client data
- User authentication system
- Real-time notifications for overdue clients
- Advanced AI summary features
- Client detail pages
- Data export functionality

## License

This project is private to Isa Media Inc and Jennifer Blocker from Launchpad Philly.
