# OAuth PVT App

A modern and responsive OAuth configuration interface built with Next.js 15, TailwindCSS v4, and Shadcn UI.

## Features

- 🎨 **Modern UI Design** - Clean, professional interface following modern design patterns
- 🔄 **Dual Authentication Support** - Switch between Paotang and Nextpass authentication systems
- 🌍 **Multi-Environment** - Support for Development, Staging, and Production environments  
- 📊 **Progress Tracking** - Visual progress indicator showing configuration completion
- 🎯 **Scope Management** - Interactive permissions and scopes configuration
- 🌙 **Dark Mode** - Built-in light/dark theme switching
- 📱 **Responsive Design** - Works seamlessly across all device sizes
- ⚡ **Modern Stack** - Next.js 15 with Turbopack, TypeScript, and latest dependencies

## Technologies Used

- **Next.js 15** - React framework with Turbopack for fast development
- **TailwindCSS v4** - Utility-first CSS framework
- **Shadcn UI** - High-quality accessible components
- **TypeScript** - Type-safe development
- **Lucide React** - Beautiful icons
- **Radix UI** - Headless accessible components

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd oauth-pvt-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
oauth-pvt-app/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout with header/footer
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── switch.tsx
│   │   ├── table.tsx
│   │   ├── badge.tsx
│   │   └── progress.tsx
│   ├── header.tsx        # Application header with theme toggle
│   ├── footer.tsx        # Application footer
│   └── oauth-configuration.tsx  # Main OAuth config component
├── lib/
│   └── utils.ts          # Utility functions
└── components.json       # Shadcn UI configuration
```
## OAuth Configuration Features

### Authentication Types
- **Paotang** - Enterprise OAuth 2.0 provider
- **Nextpass** - Next-generation authentication system

### Environment Support
- **Development** - For development and testing
- **Staging** - Pre-production environment  
- **Production** - Live production environment

### Permission Scopes
- **Read** - Read access to user data (Required)
- **Write** - Write access to user data
- **Profile** - Access to user profile information (Required)
- **Email** - Access to user email address

### UI Components

The application uses a comprehensive set of Shadcn UI components:

- **Cards** - Container components for sections
- **Forms** - Input fields, labels, and validation
- **Tables** - For displaying permission scopes
- **Switches** - Toggle controls for auth types and permissions
- **Badges** - Status indicators and tags
- **Buttons** - Action buttons with variants
- **Progress** - Visual completion indicator

## Configuration Options

The OAuth configuration supports the following settings:

1. **Authentication Provider Selection** - Toggle between Paotang and Nextpass
2. **Environment Configuration** - Choose deployment environment
3. **Client Credentials** - Client ID, Client Secret, and Redirect URI
4. **OAuth Endpoints** - Authorization URL and Token URL
5. **Permission Scopes** - Select required data access permissions
6. **Configuration Testing** - Test connection with current settings

## Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack  
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Components

To add new Shadcn UI components:

```bash
npx shadcn-ui@latest add [component-name]
```

### Customization

The application uses Tailwind CSS v4 with CSS variables for theming. Modify the theme in `app/globals.css`:

```css
:root {
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  /* ... other variables */
}
```

## Deployment

The application is ready to deploy on platforms like:

- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Railway
- Docker containers

### Build for Production

```bash
npm run build
npm run start
```

## License

This project is licensed under the MIT License.
