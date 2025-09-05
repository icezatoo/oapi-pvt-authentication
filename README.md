# OAuth PVT App

A modern and responsive OAuth configuration interface built with Next.js 15, TailwindCSS v4, and Shadcn UI. This application provides a user-friendly interface for managing OAuth configurations with support for multiple authentication providers and environments.

## ✨ Features

- 🎨 **Modern UI Design** - Clean, professional interface following modern design patterns
- 🔄 **Multiple Authentication Providers** - Support for Paotang and other authentication systems
- 🌍 **Multi-Environment** - Configure for Development, Staging, and Production environments
- 🔄 **State Management** - Built with React Query for efficient data fetching and state synchronization
- 📊 **Progress Tracking** - Visual indicators showing configuration completion status
- 🎯 **Scope Management** - Interactive permissions and OAuth scopes configuration
- 🔒 **Secure Storage** - Configuration persistence with secure client-side storage
- 🌙 **Dark Mode** - Built-in light/dark theme switching
- 📱 **Responsive Design** - Works seamlessly across all device sizes
- ⚡ **Modern Stack** - Next.js 15 with Turbopack, TypeScript, and latest dependencies

## 🛠️ Technologies Used

- **Next.js 15** - React framework with Turbopack for fast development
- **React Query** - Data synchronization and state management
- **TypeScript** - Type-safe development
- **TailwindCSS v4** - Utility-first CSS framework
- **Shadcn UI** - High-quality accessible components
- **Lucide React** - Beautiful and consistent icons
- **Radix UI** - Unstyled, accessible components
- **Zod** - TypeScript-first schema validation
- **React Hook Form** - Form state management and validation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- Git
- Docker (optional, for containerized development)

### Installation

1. Clone the repository:
```bash
git clone https://gitdev.devops.krungthai.com/open-api/poc/oapi-pvt-authentication.git
cd oapi-pvt-authentication
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### 🐳 Docker Development

1. Build the development image:
   ```bash
   docker build -t oauth-pvt-app:dev --target development .
   ```

2. Run the development container:
   ```bash
   docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules --env-file .env.local --name oauth-dev oauth-pvt-app:dev
   ```

### 🐳 Production Build with Docker

1. Build the production image:
   ```bash
   docker build -t oauth-pvt-app:prod --target production .
   ```

2. Run the production container:
   ```bash
   docker run -p 3000:3000 --env-file .env.production --name oauth-prod oauth-pvt-app:prod
   ```

   > **Note**: Make sure to create a `.env.production` file with your production environment variables.

## 🏗️ Project Structure

```
├── app/                  # Next.js 13+ app directory
├── components/           # Reusable UI components
│   └── oauth/            # OAuth specific components
├── config/               # Application configuration
├── context/              # React context providers
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
├── types/                # TypeScript type definitions
└── README.md             # This file
```

## 🔄 Development Workflow

1. **Branching**
   - `main` - Production-ready code
   - `develop` - Integration branch for features
   - `feature/*` - New features and improvements

2. **Committing Changes**
   - Use conventional commit messages
   - Reference issue numbers when applicable

3. **Pull Requests**
   - Create PRs from feature branches to `develop`
   - Include clear descriptions and screenshots when applicable
   - Request reviews from team members

## 📦 Available Scripts

- `dev` - Start development server
- `build` - Build for production
- `start` - Start production server
- `lint` - Run ESLint
- `type-check` - Check TypeScript types
- `format` - Format code with Prettier

## 🔒 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=your_api_base_url

# OAuth Configuration
NEXT_PUBLIC_OAUTH_CLIENT_ID=your_client_id
NEXT_PUBLIC_OAUTH_REDIRECT_URI=your_redirect_uri

# Feature Flags
NEXT_PUBLIC_ENABLE_EXPERIMENTAL_FEATURES=false
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Shadcn UI Documentation](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)

## 📚 Additional Documentation

For detailed API documentation and integration guides, please refer to:
- [API Reference](https://docs.example.com/api)
- [OAuth Integration Guide](https://docs.example.com/oauth)
- [Troubleshooting](https://docs.example.com/troubleshooting)

## 🔍 Permission Scopes

The application supports the following OAuth 2.0 scopes:

- `read` - Read access to user data (Required)
- `write` - Write access to user data
- `profile` - Access to user profile information (Required)
- `email` - Access to user email address

## 🆘 Support

For support, please contact the development team or open an issue in the repository.

## ⚙️ Configuration Options

The application can be configured using environment variables. See the [Environment Variables](#-environment-variables) section for details.

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
