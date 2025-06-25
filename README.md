# Dashen Bank Diaspora Portal

A comprehensive banking portal designed specifically for the Ethiopian diaspora community, providing access to banking services, exchange rates, investment tools, and community features.

## 🚀 Features

- **Diaspora Account Management**: Special banking accounts for Ethiopians living abroad
- **Exchange Rates**: Real-time currency exchange rates and management
- **Investment Tools**: Advanced calculators and investment growth tracking
- **Event Management**: Shareholder events and community gatherings
- **Knowledge Base**: Comprehensive banking information and FAQs
- **Chatbot Integration**: AI-powered customer support via Chatbase
- **Authentication**: Secure user authentication with NextAuth.js
- **Responsive Design**: Modern, mobile-friendly interface

## 🛠️ Recent Fixes Applied

### 1. **Database Connection Issues**
- ✅ Fixed missing environment variable handling
- ✅ Added graceful fallback when database is unavailable
- ✅ Improved error handling in API routes
- ✅ Database features now work in development without full setup

### 2. **Build Errors**
- ✅ Fixed duplicate import in layout.tsx
- ✅ Resolved viewport metadata configuration for Next.js 15
- ✅ Removed problematic event handlers from Script components
- ✅ Fixed pre-rendering issues with client components

### 3. **Environment Configuration**
- ✅ Created comprehensive environment variable documentation
- ✅ Added better error messages and guidance
- ✅ Made database operations optional during development

### 4. **Rebranding to Dashen Bank**
- ✅ Updated all references from Dashen Bank to Dashen Bank
- ✅ Replaced logo with Dashen Bank branding
- ✅ Updated chatbot responses and content
- ✅ Modified contact information and links

## 📋 Prerequisites

- Node.js 18+ 
- npm or pnpm
- Neon PostgreSQL database (optional for full functionality)

## 🚀 Quick Start

### 1. Clone and Install
```bash
git clone <repository-url>
cd seeddatabasesimple1
npm install
```

### 2. Environment Setup
Create a `.env.local` file in the root directory:

```bash
# Copy the example file
cp env.example .env.local
```

Edit `.env.local` with your actual values:

```env
# Required for full functionality
NEON_DATABASE_URL=postgresql://username:password@hostname:port/database
NEXTAUTH_SECRET=your-nextauth-secret-key-here
NEXTAUTH_URL=http://localhost:3000
CHATBASE_SECRET_KEY=your-chatbase-secret-key-here

# Optional
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🔧 Development vs Production

### Development Mode
- ✅ Works without database setup
- ✅ Features gracefully degrade when services unavailable
- ✅ Helpful warning messages guide setup
- ✅ All UI components functional

### Production Mode
- ⚠️ Requires all environment variables
- ⚠️ Database connection mandatory for full functionality
- ⚠️ Authentication services must be configured

## 📁 Project Structure

```
├── app/                    # Next.js 15 App Router
│   ├── (auth)/            # Authentication routes
│   ├── (main)/            # Main application routes
│   ├── admin/             # Admin panel
│   ├── api/               # API routes
│   └── ...
├── components/            # React components
│   ├── ui/               # Shadcn/ui components
│   ├── auth/             # Authentication components
│   └── ...
├── lib/                  # Utility libraries
│   ├── neon-db.ts        # Database connection
│   ├── exchange-rates.ts # Exchange rate management
│   └── ...
└── scripts/              # Database seeding scripts
```

## 🗄️ Database Setup (Optional)

### 1. Create Neon Database
1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string to `NEON_DATABASE_URL`

### 2. Initialize Database
```bash
npm run db:init
```

### 3. Seed Sample Data
```bash
npm run db:seed
```

## 🔐 Authentication Setup

### NextAuth Configuration
1. Set `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32`)
2. Configure `NEXTAUTH_URL` for your domain
3. Set up authentication providers in `app/api/auth/[...nextauth]/route.ts`

### Chatbase Integration
1. Create account at [chatbase.co](https://chatbase.co)
2. Get your secret key and set `CHATBASE_SECRET_KEY`
3. Update chatbot ID in components if needed

## 🧪 Testing

```bash
# Run build test
npm run build

# Run linting
npm run lint

# Start development server
npm run dev
```

## 🐛 Troubleshooting

### Common Issues

1. **Build Fails with Database Errors**
   - Solution: Set up environment variables or run in development mode
   - Database features will be disabled but app will work

2. **Authentication Not Working**
   - Check `NEXTAUTH_SECRET` and `NEXTAUTH_URL` are set
   - Verify authentication provider configuration

3. **Exchange Rates Not Loading**
   - Database connection required for real data
   - App will show empty state gracefully

4. **Chatbot Not Appearing**
   - Check `CHATBASE_SECRET_KEY` is set
   - Verify chatbot ID in components

### Development Tips

- Use `npm run dev` for development with hot reload
- Check console for helpful warning messages
- Database features are optional in development
- All UI components work without backend services

## 📝 Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEON_DATABASE_URL` | Yes* | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Yes* | NextAuth.js secret key |
| `NEXTAUTH_URL` | Yes* | Application URL for NextAuth |
| `CHATBASE_SECRET_KEY` | Yes* | Chatbase API secret key |
| `NEXT_PUBLIC_APP_URL` | No | Public application URL |

*Required for production, optional for development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software for Dashen Bank.

---

**Note**: This application is designed to work gracefully even without full backend setup, making it perfect for development and demonstration purposes. 