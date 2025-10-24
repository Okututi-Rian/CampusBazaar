# Campus Bazaar

A secure marketplace exclusively for university students to buy, sell, and connect within their campus communities.

## 🚀 Features

### ✅ MVP Features
- **Authentication**: Email-based signup/login with Clerk
- **Seller Onboarding**: Complete profile setup with university verification
- **Listing Management**: Create, edit, and delete product/service listings
- **Image Uploads**: Secure image storage with ImageKit
- **Browse & Search**: Public browsing with advanced filters
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Seller Dashboard**: Manage listings and view analytics
- **Public Profiles**: View seller information and contact details

### 🚧 Upcoming Features
- Resource Hub with business templates
- Business Planning Templates
- Workshops & Webinars
- In-App Messaging
- Seller Analytics
- Ratings & Reviews

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Authentication**: Clerk
- **Database**: PostgreSQL with NeonDB
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Image Storage**: ImageKit
- **UI Components**: Radix UI + Custom Components
- **Icons**: Lucide React

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (NeonDB recommended)
- Clerk account
- ImageKit account

### 1. Clone the Repository
```bash
git clone <repository-url>
cd campus-bazaar
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Copy `.env.example` to `.env.local` and configure your environment variables:

```bash
cp .env.example .env.local
```

Required environment variables:

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database?schema=public"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# ImageKit
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/your-account"
IMAGEKIT_PUBLIC_KEY="your-public-key"
IMAGEKIT_PRIVATE_KEY="your-private-key"

# App Settings
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Database Setup
Generate Prisma client and push schema to database:

```bash
npm run db:generate
npm run db:push
```

### 5. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## 🗂 Project Structure

```
campus-bazaar/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication routes
│   │   ├── (dashboard)/       # Protected dashboard routes
│   │   ├── api/               # API routes
│   │   ├── browse/            # Browse listings
│   │   ├── about/             # About page
│   │   └── upcoming-features/ # Features page
│   ├── components/            # React components
│   │   ├── ui/               # UI components (Button, Card, etc.)
│   │   ├── navigation/       # Navigation components
│   │   └── home/             # Homepage components
│   ├── lib/                  # Utility functions
│   │   ├── db.ts            # Database connection
│   │   ├── imagekit.ts      # ImageKit configuration
│   │   └── utils.ts         # Helper functions
│   └── hooks/               # Custom React hooks
├── prisma/                  # Database schema
├── public/                 # Static assets
└── package.json
```

## 🔧 Development

### Database Commands
```bash
# Generate Prisma client
npm run db:generate

# Push schema changes to database
npm run db:push

# Open Prisma Studio
npm run db:studio
```

### Code Quality
```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production
Make sure to set all environment variables in your deployment platform:

- `DATABASE_URL`: Your production database URL
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk publishable key
- `CLERK_SECRET_KEY`: Clerk secret key
- `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT`: ImageKit URL endpoint
- `IMAGEKIT_PUBLIC_KEY`: ImageKit public key
- `IMAGEKIT_PRIVATE_KEY`: ImageKit private key

### Database Migration for Production
```bash
# For production deployment
npx prisma migrate deploy
```

## 📱 Mobile Optimization

The application is built with a mobile-first approach:
- Responsive design with Tailwind CSS
- Touch-optimized UI components
- Bottom navigation for mobile
- Optimized images and lazy loading
- PWA-ready structure

## 🔐 Authentication Flow

1. **Sign Up**: Users sign up with email via Clerk
2. **Onboarding**: Complete profile setup (bio, university, contacts)
3. **Verification**: University email verification for trust
4. **Dashboard**: Access seller dashboard and create listings

## 📸 Image Upload Flow

1. User selects images in create listing form
2. Images are uploaded to ImageKit via API route
3. Optimized URLs are stored in the database
4. Images are served via ImageKit CDN

## 🎯 Key Features Implementation

### Listing Creation
- Multi-step form with validation
- Image upload with drag & drop
- Real-time preview
- Price formatting
- Category selection

### Browse & Search
- Public access (no auth required)
- Advanced filtering (type, price, category)
- Search functionality
- Sort options
- Infinite scroll ready

### Seller Dashboard
- Stats overview
- Recent listings
- Quick actions
- Profile management
- Settings access

## 🎨 Design System

The application follows a consistent design system:
- **Colors**: Navy (#1a2332), Orange (#ff6b35), Green (#06d6a0)
- **Typography**: Satoshi for headings, system fonts for body
- **Components**: Reusable UI components with variants
- **Animations**: Subtle transitions and micro-interactions
- **Accessibility**: WCAG compliant with proper contrast ratios

## 🔧 Configuration Files

### Next.js Config (`next.config.js`)
- ImageKit domain configuration
- App Router enabled
- TypeScript support

### Tailwind Config (`tailwind.config.js`)
- Custom color palette
- Animation keyframes
- Responsive breakpoints

### Prisma Schema (`prisma/schema.prisma`)
- User and Listing models
- Enum definitions
- Relation configuration

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection**
   - Ensure DATABASE_URL is correct
   - Check database permissions
   - Verify network access

2. **Image Upload Issues**
   - Check ImageKit credentials
   - Verify file size limits
   - Ensure CORS configuration

3. **Authentication Problems**
   - Verify Clerk configuration
   - Check redirect URLs
   - Ensure middleware is properly configured

4. **Build Errors**
   - Run `npm run build` locally first
   - Check TypeScript errors
   - Verify all environment variables

## 📞 Support

For support or questions:
- Email: contact@campusbazaar.com
- Phone: +254 700 000 000
- Twitter: @CampusBazaar
- Instagram: @CampusBazaarOfficial

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ for the student community