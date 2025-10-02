# SportsX - Proof of Fandom Platform

SportsX is an AI-powered Proof of Fandom platform that creates the first portable, fan-owned identity layer across global sports. Transform your fandom into verifiable reputation assets with decentralized sports prediction markets.

## 🚀 Features

- **Fan-Owned Identity**: Your data belongs to you, not platforms
- **Cross-Platform Recognition**: Prove your fandom across leagues and clubs
- **Proof of Fandom (PoF)**: Earn verifiable points for engagement
- **AI-Powered Prediction Markets**: Skill-based sports predictions
- **Privy Authentication**: Secure wallet-based authentication
- **Black & White Design**: Clean, monochrome aesthetic

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Authentication**: Privy (Web3 authentication)
- **Styling**: CSS (Black & White theme)
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Build Tool**: Vite
- **Package Manager**: Bun/NPM

## 📁 Project Structure

```
proof-of-fandom-hub/
├── public/                          # Static assets
│   ├── favicon.ico                  # Browser tab icon (logo.png)
│   ├── images/                      # Image assets
│   │   └── logo.png                # Main application logo
│   ├── assets/                     # Additional assets
│   │   ├── sportsx-logo.png        # Additional logo
│   │   └── sportsx-og.jpg          # OG banner
│   ├── placeholder.svg             # Placeholder image
│   └── sitemap.xml                 # Site map
├── src/                            # Source code
│   ├── components/                 # Reusable UI components
│   │   ├── ui/                     # Base UI components (shadcn/ui)
│   │   │   ├── button.tsx          # Button component
│   │   │   ├── card.tsx            # Card component
│   │   │   ├── input.tsx           # Input component
│   │   │   ├── table.tsx           # Table component
│   │   │   ├── tabs.tsx            # Tabs component
│   │   │   ├── toast.tsx           # Toast notifications
│   │   │   ├── tooltip.tsx         # Tooltip component
│   │   │   ├── shader-lines.tsx    # Animated background
│   │   │   └── ...                 # Other UI components
│   │   ├── BadgeDisplay.tsx        # Badge showcase component
│   │   ├── Breadcrumbs.tsx         # Navigation breadcrumbs
│   │   ├── DailyCheckinCard.tsx    # Daily check-in feature
│   │   ├── ErrorBoundary.tsx       # Error handling wrapper
│   │   ├── FandomTagSelector.tsx   # Tag selection component
│   │   ├── FanProfile.tsx          # User profile display
│   │   ├── FanProfileCard.tsx      # Profile card component
│   │   ├── ImageOptimized.tsx      # Optimized image component
│   │   ├── Leaderboard.tsx         # Leaderboard display
│   │   ├── Navigation.tsx          # Main navigation bar
│   │   ├── PointsChart.tsx         # Points visualization
│   │   ├── PredictionMarkets.tsx  # Prediction markets UI
│   │   ├── TagSelector.tsx         # Tag selection interface
│   │   ├── TicketReviewModal.tsx   # Ticket review popup
│   │   ├── TicketUploadCard.tsx   # Ticket upload interface
│   │   └── WalletCard.tsx          # Wallet information card
│   ├── context/                    # React Context providers
│   │   └── AuthContext.tsx         # Authentication context (Privy)
│   ├── hooks/                      # Custom React hooks
│   │   ├── use-mobile.tsx          # Mobile detection hook
│   │   ├── use-toast.ts            # Toast notification hook
│   │   ├── useAdmin.tsx            # Admin functionality hook
│   │   ├── useFanPoints.tsx        # Fan points management
│   │   ├── useLeaderboard.tsx      # Leaderboard data hook
│   │   ├── usePredictionMarkets.tsx # Prediction markets hook
│   │   ├── useProfile.tsx          # User profile hook
│   │   └── useTags.tsx             # Tags management hook
│   ├── lib/                        # Utility libraries
│   │   ├── privy.ts                # Privy authentication config
│   │   ├── utils.ts                # General utilities
│   │   └── web3.ts                 # Web3 configuration
│   ├── pages/                      # Page components
│   │   ├── About.tsx               # About page
│   │   ├── About.css               # About page styles
│   │   ├── AdminDashboard.tsx     # Admin dashboard page
│   │   ├── AdminDashboard.css     # Admin dashboard styles
│   │   ├── Dashboard.tsx           # Main dashboard page
│   │   ├── Dashboard.css           # Dashboard styles
│   │   ├── Landing.tsx             # Landing/home page
│   │   ├── Landing.css             # Landing page styles
│   │   ├── LeaderboardPage.tsx    # Leaderboard page
│   │   ├── LeaderboardPage.css    # Leaderboard styles
│   │   ├── NotFound.tsx           # 404 error page
│   │   ├── NotFound.css            # 404 page styles
│   │   ├── PredictionMarketsPage.tsx # Prediction markets page
│   │   ├── PredictionMarketsPage.css # Prediction markets styles
│   │   ├── Profile.tsx             # User profile page
│   │   └── Profile.css             # Profile page styles
│   ├── utils/                      # Utility functions
│   │   └── seo.ts                  # SEO utilities (removed)
│   ├── App.tsx                     # Main application component
│   ├── App.css                     # Global application styles
│   ├── index.css                   # Base CSS styles
│   ├── main.tsx                    # Application entry point
│   └── vite-env.d.ts               # Vite type definitions
├── .cursorrules                    # Cursor AI coding rules
├── .env                            # Environment variables (local)
├── .env.example                    # Environment variables template
├── .gitignore                      # Git ignore rules
├── components.json                 # shadcn/ui configuration
├── index.html                      # HTML entry point
├── package.json                    # Dependencies and scripts
├── playwright.config.ts            # Playwright test config
├── postcss.config.js               # PostCSS configuration
├── tailwind.config.ts              # Tailwind CSS configuration
├── tsconfig.app.json               # TypeScript app config
├── tsconfig.json                   # TypeScript config
├── tsconfig.node.json              # TypeScript node config
├── vite.config.ts                  # Vite build configuration
└── vitest.config.ts                # Vitest test config
```

## 🔧 File & Folder Functionality

### **Core Application Files**

#### `src/App.tsx`
- Main application component
- Sets up providers (Privy, Auth, QueryClient, Router)
- Defines application routes
- Error boundary wrapper

#### `src/main.tsx`
- Application entry point
- React DOM rendering
- Root component mounting

#### `src/index.css`
- Global CSS styles
- CSS variables for theming
- Base typography and layout styles

### **Authentication System**

#### `src/context/AuthContext.tsx`
- Privy authentication integration
- User state management
- Login/logout functionality
- Session handling

#### `src/lib/privy.ts`
- Privy configuration
- Environment-based App ID (secure)
- Wallet creation utilities
- Authentication options
- Error handling for missing environment variables

### **Page Components**

#### `src/pages/Landing.tsx` + `Landing.css`
- Homepage with hero section
- Feature showcase
- FAQ section
- Call-to-action buttons
- Black & white styling

#### `src/pages/Dashboard.tsx` + `Dashboard.css`
- User dashboard
- Statistics display
- Activity cards
- Quick actions
- Points overview

#### `src/pages/Profile.tsx` + `Profile.css`
- User profile management
- Badge display
- Activity timeline
- Profile editing forms

#### `src/pages/LeaderboardPage.tsx` + `LeaderboardPage.css`
- Fan rankings display
- Filtering options
- User statistics
- Competition view

#### `src/pages/PredictionMarketsPage.tsx` + `PredictionMarketsPage.css`
- Prediction markets interface
- Betting functionality
- Market data display
- User predictions

#### `src/pages/AdminDashboard.tsx` + `AdminDashboard.css`
- Admin control panel
- User management
- Ticket approval system
- Statistics overview

#### `src/pages/About.tsx` + `About.css`
- Company information
- Team showcase
- Mission statement
- Contact details

#### `src/pages/NotFound.tsx` + `NotFound.css`
- 404 error page
- Navigation suggestions
- Error handling

### **Reusable Components**

#### `src/components/Navigation.tsx`
- Main navigation bar with all page links
- Logo display
- User menu (Dashboard, Profile, Leaderboard, Predictions, About)
- Admin menu (admin users only)
- Authentication buttons (Sign In/Sign Out)

#### `src/components/ui/`
- Base UI component library (shadcn/ui)
- Reusable components (Button, Card, Input, etc.)
- Consistent styling system

#### `src/components/PredictionMarkets.tsx`
- Prediction market cards
- Betting interface
- Outcome selection
- Market data display

#### `src/components/Leaderboard.tsx`
- Leaderboard table
- User rankings
- Statistics display

#### `src/components/TicketUploadCard.tsx`
- Ticket upload interface
- File handling
- Progress tracking
- Validation

#### `src/components/DailyCheckinCard.tsx`
- Daily check-in feature
- Points earning
- Streak tracking

### **Custom Hooks**

#### `src/hooks/useAuth.tsx`
- Authentication state
- User data management
- Login/logout functions

#### `src/hooks/useProfile.tsx`
- User profile data
- Profile management
- Wallet creation

#### `src/hooks/useFanPoints.tsx`
- Points system
- Activity tracking
- Rewards management

#### `src/hooks/usePredictionMarkets.tsx`
- Market data
- Prediction handling
- Betting functionality

#### `src/hooks/useLeaderboard.tsx`
- Ranking data
- User statistics
- Competition metrics

#### `src/hooks/useAdmin.tsx`
- Admin functionality
- User management
- Content moderation

### **Configuration Files**

#### `package.json`
- Dependencies management
- Script definitions
- Project metadata

#### `vite.config.ts`
- Build configuration
- Development server
- Plugin setup

#### `tailwind.config.ts`
- Tailwind CSS configuration
- Custom theme settings
- Utility classes

#### `tsconfig.json`
- TypeScript configuration
- Compiler options
- Path mapping

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd proof-of-fandom-hub
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Start development server**
   ```bash
   bun dev
   # or
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:8080
   ```

### Environment Setup

The application uses Privy for authentication and requires environment variables to be configured:

1. **Copy environment template**
   ```bash
   cp .env.example .env
   ```

2. **Configure Privy App ID**
   - Get your Privy App ID from [https://dashboard.privy.io/](https://dashboard.privy.io/)
   - Replace `your_privy_app_id_here` in `.env` with your actual Privy App ID

3. **Environment Variables**
   - `VITE_PRIVY_APP_ID` - Your Privy authentication app ID (required)
   - `NODE_ENV` - Environment mode (development/production)
   - `VITE_HOST` - Development server host (default: 0.0.0.0)
   - `VITE_PORT` - Development server port (default: 8080)

**Security Note**: The Privy App ID is now stored securely in environment variables and not hardcoded in the source code.

## 🎨 Design System

### Color Scheme
- **Primary**: Black (`#000000`)
- **Secondary**: White (`#ffffff`)
- **Accent**: Grays (`#666666`, `#999999`, `#f8f8f8`, `#e5e5e5`)
- **No colorful designs** - Pure monochrome aesthetic

### Typography
- Clean, readable fonts
- Consistent sizing scale
- Proper contrast ratios

### Layout
- Responsive design
- Mobile-first approach
- Clean spacing and alignment

## 🔐 Authentication Flow

1. User clicks "Start Building Your PoF" button
2. Privy authentication modal opens
3. User authenticates with email
4. Embedded wallet is created automatically
5. User is redirected to dashboard
6. Session persists across page refreshes

## 📱 Features

### Proof of Fandom (PoF)
- Earn points for engagement
- Verifiable reputation system
- Cross-platform recognition
- Badge system

### Prediction Markets
- AI-powered predictions
- Skill-based betting
- Community-driven markets
- Transparent outcomes

### Fan Identity
- Portable across platforms
- User-owned data
- Verifiable credentials
- Reputation tracking

## 🔄 Recent Updates

### Security Improvements
- **Environment Variables**: Privy App ID now stored securely in `.env` file
- **No Hardcoded Secrets**: Removed sensitive data from source code
- **Error Handling**: Clear error messages for missing environment variables

### Navigation Updates
- **Complete Page Coverage**: All pages now accessible through navigation bar
- **About Page**: Added to main navigation menu
- **Consistent UX**: Unified navigation experience across all pages

### Environment Setup
- **`.env.example`**: Template file for easy setup
- **`.env`**: Local environment configuration (gitignored)
- **Documentation**: Clear setup instructions for new developers

## 🛠️ Development

### Available Scripts
- `bun dev` - Start development server
- `bun build` - Build for production
- `bun preview` - Preview production build
- `bun lint` - Run ESLint

### Code Style
- TypeScript for type safety
- Functional components
- Custom hooks for logic
- CSS for styling (no CSS-in-JS)
- Black & white color scheme

### Project Rules (.cursorrules)
- Use black and white color scheme
- Avoid external UI libraries when possible
- Each page has both .tsx and .css files
- Store contexts in `/src/context`
- Store ABIs in `/src/abi`
- Use React Router for navigation

## 📄 License

This project is proprietary software. All rights reserved.

## 🤝 Contributing

This is a private project. For internal development, follow the established patterns and coding standards outlined in `.cursorrules`.

---

**SportsX** - Transforming fandom into verifiable reputation assets.