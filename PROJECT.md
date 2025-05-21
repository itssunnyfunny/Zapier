# Zapier-like Automation Platform - Project Documentation

## Project Overview
This is a comprehensive automation platform that allows users to create and manage automated workflows (Zaps) between different services and applications. The project follows a microservices architecture with multiple components working together to provide a seamless automation experience.

## System Architecture

### Components

1. **Frontend Application** (`/frontend`)
   - Built with Next.js and TypeScript
   - Modern UI using Tailwind CSS
   - Features:
     - User authentication
     - Zap creation and management
     - Visual workflow builder
     - Real-time status monitoring

2. **Primary Backend** (`/primary-backend`)
   - Main API server
   - Handles core business logic
   - Features:
     - User management
     - Zap CRUD operations
     - Authentication and authorization
     - Database interactions via Prisma

3. **Worker Service** (`/worker`)
   - Handles background jobs
   - Processes Zap executions
   - Manages task queues

4. **Processor Service** (`/processor`)
   - Processes individual Zap actions
   - Handles service integrations
   - Manages action execution logic

5. **Hooks Service** (`/hooks`)
   - Manages webhook endpoints
   - Handles incoming webhook requests
   - Routes webhook data to appropriate Zaps

## Technology Stack

### Frontend
- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **HTTP Client**: Axios
- **Build Tools**: 
  - ESLint for code linting
  - PostCSS for CSS processing
  - TypeScript for type checking

### Backend
- **Runtime**: Node.js
- **Language**: TypeScript
- **Database**: Prisma ORM
- **API**: RESTful architecture
- **Authentication**: Token-based (JWT)

## Project Structure

```
├── frontend/                 # Next.js frontend application
│   ├── app/                 # Next.js app directory
│   ├── components/          # Reusable React components
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
│
├── primary-backend/         # Main backend service
│   ├── src/                # Source code
│   ├── prisma/             # Database schema and migrations
│   └── package.json        # Backend dependencies
│
├── worker/                  # Background job processor
│   └── src/                # Worker service code
│
├── processor/              # Action processor service
│   └── src/                # Processor service code
│
└── hooks/                  # Webhook handling service
    └── src/                # Hooks service code
```

## Core Features

### Zap Management
- Create, read, update, and delete Zaps
- Visual workflow builder
- Trigger and action configuration
- Real-time status monitoring

### Service Integration
- Multiple service connectors
- Webhook support
- Custom action creation
- Service authentication management

### User Management
- User registration and authentication
- Profile management
- Team collaboration features
- Access control and permissions

### Monitoring and Logging
- Zap execution history
- Error tracking and reporting
- Performance monitoring
- Usage statistics

## Development Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database
- Git

### Environment Setup
1. Clone the repository
2. Install dependencies for each service:
   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd ../primary-backend
   npm install

   # Worker
   cd ../worker
   npm install

   # Processor
   cd ../processor
   npm install

   # Hooks
   cd ../hooks
   npm install
   ```

3. Set up environment variables:
   - Create `.env` files in each service directory
   - Configure database connections
   - Set up service URLs and ports
   - Configure authentication secrets

4. Database setup:
   ```bash
   cd primary-backend
   npx prisma migrate dev
   ```

### Running the Project
1. Start the backend services:
   ```bash
   # Primary Backend
   cd primary-backend
   npm run dev

   # Worker
   cd ../worker
   npm run dev

   # Processor
   cd ../processor
   npm run dev

   # Hooks
   cd ../hooks
   npm run dev
   ```

2. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

## API Documentation

### Authentication Endpoints
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/me` - Get current user

### Zap Endpoints
- `GET /api/v1/zap` - List all Zaps
- `POST /api/v1/zap` - Create new Zap
- `GET /api/v1/zap/:id` - Get Zap details
- `PUT /api/v1/zap/:id` - Update Zap
- `DELETE /api/v1/zap/:id` - Delete Zap

### Webhook Endpoints
- `POST /hooks/catch/:id` - Webhook endpoint for Zap triggers

## Contributing

### Development Workflow
1. Create a new branch for your feature
2. Make your changes
3. Write/update tests
4. Submit a pull request

### Code Style
- Follow TypeScript best practices
- Use ESLint for code linting
- Write meaningful commit messages
- Document new features and changes

## Deployment

### Production Requirements
- Node.js environment
- PostgreSQL database
- Redis for caching (optional)
- Environment variables configuration
- SSL certificates for HTTPS

### Deployment Steps
1. Build all services
2. Set up production environment variables
3. Run database migrations
4. Deploy services to production servers
5. Configure reverse proxy (e.g., Nginx)
6. Set up monitoring and logging

## Security Considerations

### Authentication
- JWT-based authentication
- Secure password hashing
- Token expiration and refresh
- Rate limiting

### Data Protection
- Input validation
- SQL injection prevention
- XSS protection
- CSRF protection

### API Security
- HTTPS enforcement
- API key management
- Request validation
- Error handling

## Monitoring and Maintenance

### Logging
- Application logs
- Error tracking
- Performance metrics
- User activity logs

### Performance
- Database optimization
- Caching strategies
- Load balancing
- Resource monitoring

## Support and Resources

### Documentation
- API documentation
- User guides
- Developer documentation
- Deployment guides

### Community
- Issue tracking
- Feature requests
- Bug reports
- Community contributions 