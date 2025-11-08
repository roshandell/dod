# PumpX Micro-SaaS Platform

A professional AI-powered Micro-SaaS platform with cryptocurrency payment integration through Cryptomus. Built with React, Express, tRPC, and MySQL.

## Features

**Multi-AI Integration**
- Access to OpenAI GPT-4 for advanced language processing
- Manus AI integration for specialized AI capabilities
- Seamless switching between AI providers
- Real-time AI response streaming

**Cryptocurrency Payments**
- Secure payment processing via Cryptomus
- Support for multiple cryptocurrencies
- Automatic subscription activation
- Webhook-based payment confirmation

**Subscription Management**
- Three-tier pricing plans (Starter, Professional, Enterprise)
- Monthly AI request limits based on plan
- Automatic usage tracking and monitoring
- Real-time usage statistics

**User Dashboard**
- Interactive AI chat interface
- Usage analytics and insights
- Payment history tracking
- Subscription status monitoring

## Tech Stack

**Frontend**
- React 19 with TypeScript
- Tailwind CSS 4 for styling
- Wouter for routing
- tRPC for type-safe API calls
- shadcn/ui components

**Backend**
- Node.js with Express 4
- tRPC 11 for API layer
- Drizzle ORM for database
- MySQL/TiDB database
- Manus OAuth authentication

**Integrations**
- OpenAI API for GPT-4
- Manus AI API
- Cryptomus payment gateway
- Manus OAuth for authentication

## Quick Start

### Prerequisites
- Node.js 22.x or higher
- MySQL database
- API keys for Cryptomus, OpenAI, and Manus

### Installation

```bash
# Clone repository
git clone https://github.com/roshandell/dod.git
cd dod

# Install dependencies
pnpm install

# Set up database
pnpm db:push

# Start development server
pnpm dev
```

The application will be available at `http://localhost:3000`

## Environment Variables

Create a `.env.local` file with:

```
DATABASE_URL=mysql://user:password@host:port/database
JWT_SECRET=your-secret-key
VITE_APP_ID=your-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im
CRYPTOMUS_API_KEY=your-key
CRYPTOMUS_MERCHANT_UUID=your-uuid
OPENAI_API_KEY=your-key
MANUS_API_KEY=your-key
VITE_APP_TITLE=PumpX Micro-SaaS Platform
NODE_ENV=development
```

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import repository in Vercel
3. Set environment variables
4. Deploy

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## Project Structure

```
├── client/              # Frontend React app
│   ├── src/
│   │   ├── pages/      # Page components
│   │   ├── components/ # Reusable components
│   │   └── lib/        # Utilities
│   └── index.html
├── server/             # Backend Express app
│   ├── routers.ts      # tRPC routes
│   ├── db.ts           # Database queries
│   └── _core/          # Core infrastructure
├── drizzle/            # Database schema
└── shared/             # Shared types
```

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please visit:
- GitHub Issues: https://github.com/roshandell/dod/issues
- Email: support@pumpx.info

---

Built with ❤️ by PumpX Team
