# 🔐 Vaulted

> **Secure, Modern, and Beautiful**

A modern, secure web application built with Next.js 15, featuring a beautiful UI, robust authentication, and well-organized architecture following industry best practices.

![Vaulted Banner](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma)

## ✨ Features

- 🎨 **Beautiful UI** with modern design and smooth animations
- 🔐 **Secure Authentication** powered by Kinde Auth
- 📱 **Responsive Design** that works on all devices
- 🏗️ **Well-Structured Architecture** following Next.js best practices
- 🎯 **TypeScript** for type safety and better developer experience
- 🎨 **Tailwind CSS** for rapid and consistent styling
- 🗄️ **Prisma ORM** for database management
- ⚡ **Performance Optimized** with Next.js 15 features

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vaulted
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
vaulted/
├── 📁 app/                     # Next.js App Router
├── 📁 src/                     # Source code
│   ├── 📁 components/          # React components
│   │   ├── 📁 ui/              # Generic UI components
│   │   ├── 📁 layout/          # Layout components
│   │   ├── 📁 forms/           # Form components
│   │   └── 📁 features/        # Feature-specific components
│   ├── 📁 hooks/               # Custom React hooks
│   ├── 📁 utils/               # Utility functions
│   ├── 📁 types/               # TypeScript definitions
│   ├── 📁 constants/           # Application constants
│   ├── 📁 styles/              # Global styles
│   └── 📁 assets/              # Static assets
├── 📁 prisma/                  # Database schema
├── 📁 public/                  # Static files
├── 📁 docs/                    # Documentation
└── 📁 tests/                   # Test files
```

> 📖 For detailed folder structure documentation, see [docs/FOLDER_STRUCTURE.md](./docs/FOLDER_STRUCTURE.md)

## 🛠️ Tech Stack

### Core
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type safety

### Styling & UI
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Lucide React](https://lucide.dev/)** - Beautiful icons
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components

### Backend & Database
- **[Prisma](https://www.prisma.io/)** - Database ORM
- **[Kinde Auth](https://kinde.com/)** - Authentication service

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS processing

## 🎨 Design System

The project features a modern design system with:

- **Gradient Backgrounds** - Beautiful color transitions
- **Smooth Animations** - Powered by Framer Motion
- **Responsive Design** - Mobile-first approach
- **Accessible Components** - WCAG compliant
- **Consistent Typography** - Using Geist font family

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema to database
npx prisma studio    # Open Prisma Studio
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="file:./dev.db"

# Kinde Auth
KINDE_CLIENT_ID="your_client_id"
KINDE_CLIENT_SECRET="your_client_secret"
KINDE_ISSUER_URL="your_issuer_url"
KINDE_SITE_URL="http://localhost:3000"
KINDE_POST_LOGOUT_REDIRECT_URL="http://localhost:3000"
KINDE_POST_LOGIN_REDIRECT_URL="http://localhost:3000/dashboard"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Path Aliases

The project uses TypeScript path mapping for clean imports:

```typescript
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants';
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy!

### Other Platforms

The application can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- Docker
- Traditional hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Team](https://nextjs.org/) for the amazing framework
- [Vercel](https://vercel.com/) for the deployment platform
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Prisma](https://www.prisma.io/) for the excellent ORM

---

<div align="center">
  <p>Built with ❤️ by the Vaulted Team</p>
  <p>
    <a href="#-vaulted">Back to top</a>
  </p>
</div>
