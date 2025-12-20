# SONCIS - Premium Bags E-Commerce

A modern, full-featured e-commerce platform for selling premium bags, built with Next.js, TypeScript, and Paystack payment integration.

## Features

- 🛍️ **Product Catalog**: Browse and view detailed product information
- 🛒 **Shopping Cart**: Add items, manage quantities, and apply coupon codes
- 💳 **Paystack Integration**: Secure payment processing with Paystack
- 📱 **Responsive Design**: Mobile-first, works on all devices
- 🎨 **Modern UI**: Clean, minimalist design with Tailwind CSS
- 🌍 **Ghana Cedi Support**: Prices displayed in GHS (₵)
- 📦 **Order Management**: Track orders and view order history
- 👤 **User Profile**: Manage settings and saved addresses

## Tech Stack

- **Framework**: Next.js 16.0.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Payment**: Paystack
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/lurich1/sonicsbag.com.git
cd sonicsbag.com
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your environment variables to `.env.local`:
```env
# Backend API URL (REQUIRED for production)
NEXT_PUBLIC_API_BASE_URL=https://sonicsbag.poultrycore.com
# For local development, use: http://localhost:5000

# Admin Dashboard Credentials
ADMIN_EMAIL=your-soncis@gmail.com
ADMIN_PASSWORD=admin123soncis

# Paystack Keys
PAYSTACK_SECRET_KEY=sk_live_your_secret_key
PAYSTACK_PUBLIC_KEY=pk_live_your_public_key
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_your_public_key
```

**Note:** 
- For production, use live keys (starting with `sk_live_` and `pk_live_`). For testing, use test keys (starting with `sk_test_` and `pk_test_`).
- Admin credentials are used to access the admin dashboard at `/admin/login`

5. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

### Backend API (REQUIRED)
- `NEXT_PUBLIC_API_BASE_URL`: Backend API URL
  - Production: `https://sonicsbag.poultrycore.com`
  - Local: `http://localhost:5000`

### Admin Dashboard
- `ADMIN_EMAIL`: Email address for admin login (default: `admin@soncis.com`)
- `ADMIN_PASSWORD`: Password for admin login (default: `admin123`)

### Paystack Payment
- `PAYSTACK_SECRET_KEY`: Your Paystack secret key (server-side)
- `PAYSTACK_PUBLIC_KEY`: Your Paystack public key (server-side)
- `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`: Your Paystack public key (client-side)

**Note:** 
- For production, use live keys instead of test keys
- **IMPORTANT:** Set `NEXT_PUBLIC_API_BASE_URL` in Vercel environment variables for production deployment
- Make sure to set all environment variables in your deployment platform (Vercel, etc.)

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── paystack/      # Paystack payment endpoints
│   ├── about/             # About page
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout page
│   ├── product/           # Product detail pages
│   └── shop/              # Shop listing page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── ...               # Feature components
├── public/               # Static assets
└── lib/                  # Utility functions
```

## Payment Integration

This project uses Paystack for payment processing. The integration includes:

- Payment initialization
- Payment verification
- Order management
- Error handling

Test cards are available in the Paystack dashboard for testing.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

Make sure to set all environment variables in your deployment platform.

## Production Checklist

- [ ] Replace test Paystack keys with live keys
- [ ] Update environment variables in deployment platform
- [ ] Test payment flow with real transactions
- [ ] Set up error monitoring (e.g., Sentry)
- [ ] Configure domain and SSL
- [ ] Set up analytics (optional)

## License

This project is private and proprietary.

## Support

For issues or questions, please contact the development team.

