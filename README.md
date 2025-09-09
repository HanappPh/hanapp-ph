# HanApp PH

A modern fullstack application built with Next.js, NestJS, and Supabase.

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: NestJS, TypeScript
- **Database**: Supabase (PostgreSQL)
- **Storage**: AWS S3 + CloudFront
- **Monorepo**: Nx
- **Testing**: Jest, Cypress
- **CI/CD**: GitHub Actions
- **Code Quality**: ESLint, Prettier, Husky

## 📋 Prerequisites

- Node.js 20.x or later
- npm 10.x or later
- Docker (optional, for containerization)

## 🛠️ Development Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/hanapp-ph.git
   cd hanapp-ph
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment setup**

   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

4. **Start development servers**

   ```bash
   # Start both API and Web concurrently
   npm run start:dev

   # Or start individually
   npm run dev:api    # API server on port 3001
   npm run dev:web    # Web server on port 3000
   ```

## 🧪 Testing

```bash
# Run all tests
npm run test:all

# Run affected tests only
npm run test:affected

# Run E2E tests
npm run e2e:web
```

## 🔍 Code Quality

```bash
# Lint all projects
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Type check
npm run typecheck
```

## 🏗️ Building

```bash
# Build all projects
npm run build:all

# Build specific project
npm run build:web
npm run build:api
```

## 🐳 Docker

```bash
# Build Docker image
npm run docker:build

# Run containerized application
npm run docker:run
```

## 📁 Project Structure

```
apps/
├── api/              # NestJS backend
├── api-e2e/          # API E2E tests
├── web/              # Next.js frontend
└── web-e2e/          # Web E2E tests

libs/                 # Shared libraries (when created)

tools/                # Custom tools and scripts
```

## 🚀 Deployment

The application is configured for deployment on various platforms:

- **Frontend**: Vercel, Netlify
- **Backend**: Railway, Heroku, AWS
- **Database**: Supabase
- **Storage**: AWS S3 + CloudFront

## 📖 Available Scripts

| Script              | Description                           |
| ------------------- | ------------------------------------- |
| `npm run start:dev` | Start both API and Web in development |
| `npm run dev:web`   | Start Web app only                    |
| `npm run dev:api`   | Start API only                        |
| `npm run build:all` | Build all applications                |
| `npm run test:all`  | Run all tests                         |
| `npm run lint`      | Lint all projects                     |
| `npm run format`    | Format code with Prettier             |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Support

For support, email support@hanapp-ph.com or join our Slack channel.
