# Overview

This is a premium e-commerce landing page application built with Angular 19. The application serves as a lead generation and sales platform for qualified business leads and Shopify scraping tools. It features a modern, high-end design with gradient theming (blue-purple primary colors with green accents), smooth animations powered by GSAP, and a comprehensive user experience optimized for conversions.

The application follows a component-based architecture with standalone Angular components, server-side rendering (SSR) capabilities, and a focus on performance, accessibility, and mobile-first responsive design.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework**: Angular 19 with standalone components architecture
- **Rationale**: Modern Angular approach eliminates the need for NgModules, resulting in better tree-shaking, smaller bundle sizes, and simpler component structure
- **Routing**: Declarative routing configured in `main.ts` using `provideRouter` with component input binding
- **State Management**: Component-local state with RxJS for async operations and GSAP for animation state
- **Styling**: SCSS with custom variables, mobile-first responsive design using Tailwind-inspired breakpoints (sm/640px, md/768px, lg/1024px, xl/1280px)

**Component Structure**:
- **App Component**: Root component managing theme persistence (dark mode) via localStorage with periodic theme checking
- **Navbar Component**: Sticky navigation with search functionality, user dropdown, mobile menu, and animated interactions
- **Landing Component**: Hero section with full-screen immersive design, feature cards, testimonials, and scroll-triggered animations
- **Article List Component**: Product/pack listing with filtering capabilities (all/starter/pro/enterprise), grid layout, and selection state management
- **Payment Component**: Checkout flow initialization, loads selected article details and creates payment session
- **Order Confirmation Component**: Post-payment status checking with polling mechanism (5-second intervals), displays payment confirmation with transaction details
- **Footer Component**: Multi-column layout with links, social media integration, and dynamic copyright year

**Animation Strategy**:
- GSAP core library for premium animations (fade-ins, scale transforms, scroll-triggered reveals)
- ScrollTrigger plugin registered for scroll-based animations
- 60fps optimization target with mobile performance considerations
- Staggered animations for list items and cards

**Responsive Design**:
- Mobile-first approach with progressive enhancement
- Flexible grid layouts (1-column mobile scaling to 4-column desktop)
- Adaptive navigation (hamburger menu on mobile, full menu on desktop)
- Touch-optimized interactions

## Backend Integration

**API Communication**:
- HttpClient for REST API calls with dependency injection
- Environment-based configuration for API URLs (development vs production)
- **Development API**: Points to Replit-hosted backend (`https://066af060-bb6a-43ce-857c-1865266ccaf6-00-u5mex18qlglt.riker.replit.dev`)
- **Production API**: Configured for localhost (`http://localhost:3000`)

**API Endpoints** (expected from backend):
- `GET /articles` - Fetch available products/packs
- Payment creation and status checking endpoints (referenced in payment flow)
- Order management endpoints

**Data Models**:
- **Article**: Product information with id, name, description, price (in cents)
- **Order**: Order tracking with orderId, articleId, and status
- **Payment**: Payment session data with orderId, amount, paymentUrl, paymentId
- **PaymentStatus**: Status tracking with paymentId, status (pending/confirmed/failed), optional transaction hash

## Server-Side Rendering (SSR)

**Implementation**: Angular Universal with Express.js server
- **Purpose**: Improves SEO, initial page load performance, and enables server-side pre-rendering
- **Configuration**: Separate server configuration in `app.config.server.ts` with matching route definitions
- **Build Output**: Generates both browser and server bundles in `dist/landing-page/`
- **Server Entry**: Express server at `dist/landing-page/server/server.mjs`

## Security & SEO

**Content Security Policy**: 
- Defined in `index.html` with strict script-src and style-src policies
- Allows necessary external resources (Google Fonts, Google Tag Manager)
- Uses 'unsafe-inline' and 'unsafe-eval' for Angular's runtime requirements

**Meta Tags & SEO**:
- Comprehensive meta tags for description, keywords, author
- Open Graph protocol tags for social media sharing
- Theme color for progressive web app appearance
- Structured semantic HTML with ARIA labels

**Accessibility**:
- ARIA labels on interactive elements (navigation links, social media icons)
- Semantic HTML structure (nav, footer, article elements)
- Keyboard navigation support with tabindex where needed
- Color contrast considerations in design system

## Theme System

**Dark Mode Implementation**:
- Toggle managed through localStorage with key 'theme'
- Body class manipulation ('dark' class added/removed)
- Cross-tab synchronization via storage event listener
- Fallback polling mechanism (100ms interval) for theme changes
- CSS variables expected to handle light/dark theme variations in SCSS files

## Performance Optimization

**Build Configuration**:
- Production build with file replacements for environment configs
- Budget limits configured for bundle size monitoring
- Tree-shaking enabled through standalone components
- Style preprocessor configuration for SCSS with custom include paths

**Lazy Loading**:
- Component-based code splitting potential through Angular's module system
- Assets served from `public` directory
- Polyfills isolated to specific requirements (zone.js)

**Development Workflow**:
- Concurrent script (`start:all`) to run frontend and backend simultaneously
- Watch mode for development builds
- Hot module replacement during development

# External Dependencies

## Core Framework Dependencies
- **@angular/core** (^19.2.0): Core Angular framework
- **@angular/common** (^19.2.0): Common Angular directives and pipes
- **@angular/platform-browser** (^19.2.0): Browser platform support
- **@angular/router** (^19.2.0): Client-side routing
- **@angular/forms** (^19.2.0): Form handling and validation
- **@angular/ssr** (^19.2.13): Server-side rendering capabilities
- **@angular/platform-server** (^19.2.0): Server platform for SSR

## Animation & Interaction
- **gsap** (^3.13.0): Professional-grade animation library for premium UI interactions
- **ScrollTrigger**: GSAP plugin for scroll-based animations (imported from gsap package)

## HTTP & Server
- **axios** (^1.12.2): HTTP client for API requests (note: Angular HttpClient also available)
- **express** (^4.18.2): Web server framework for SSR
- **@angular/common/http**: Angular's built-in HTTP client module

## Utilities
- **rxjs** (~7.8.0): Reactive programming library for async operations
- **zone.js** (~0.15.0): Execution context management for Angular
- **tslib** (^2.3.0): TypeScript runtime library helpers

## Development Tools
- **@angular/cli** (^19.2.13): Angular command-line interface
- **@angular/compiler-cli** (^19.2.0): Angular template compiler
- **@angular-devkit/build-angular** (^19.2.13): Build system for Angular applications
- **TypeScript** (~5.7.2): Primary language for development
- **Jasmine & Karma**: Testing framework and test runner
- **@types/***: TypeScript type definitions for Express, Jasmine, and Node.js

## Backend System (Separate Service)
The application expects a separate backend service running on a different server/repository:
- REST API providing articles/products data
- Payment processing endpoints
- Order management system
- Expected to run on port 3000 in production or Replit-hosted URL in development
- Startup script available: `npm run start:backend` (navigates to `../backend` directory)