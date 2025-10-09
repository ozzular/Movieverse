# MovieVerse 🎬

A modern, cinematic movie explorer web application for searching, discovering, and browsing films using the TMDb API. Built with React, TypeScript, and Tailwind CSS, featuring a dark galaxy-themed UI.

## ✨ Features

### Current Features ✅
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Modern UI**: Dark galaxy-themed interface with purple and red accents
- **Movie Discovery**: Browse trending and top-rated movies
- **Movie Details**: Comprehensive movie information pages
- **Search Functionality**: Built-in search bar (ready for TMDb integration)
- **Favorites System**: UI ready for user favorites (implementation pending)
- **Trailer Support**: UI prepared for movie trailer integration

### Upcoming Features 🔄
- TMDb API Integration (in progress)
- User Authentication
- Advanced Filtering
- Watchlist Management

## 🚀 Tech Stack

- **Frontend**: React 18 with TypeScript
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **API**: TMDb (The Movie Database) API
- **Deployment**: Vercel

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd movieverse-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
movieverse-app/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Header.tsx          # Navigation and search
│   │   ├── HeroBanner.tsx      # Featured movie banner
│   │   ├── MovieCard.tsx       # Individual movie card
│   │   └── MovieRow.tsx        # Horizontal movie carousel
│   ├── pages/
│   │   ├── Home.tsx           # Main dashboard
│   │   └── MovieDetails.tsx   # Detailed movie view
│   ├── services/
│   │   └── tmdbApi.ts         # API integration (pending)
│   ├── types/
│   │   └── index.ts           # TypeScript definitions
│   ├── utils/
│   │   └── helpers.ts         # Utility functions (pending)
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # Entry point
│   └── style.css             # Global styles & Tailwind
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Design System

### Colors
- **Primary Dark**: `#0a0a0a` - Main background
- **Secondary Dark**: `#1a1a1a` - Cards and sections
- **Galaxy Purple**: `#9333ea` - Accents and highlights
- **Galaxy Red**: `#dc2626` - Call-to-action buttons
- **Galaxy Pink**: `#ec4899` - Special highlights

### Typography
- **Font Family**: Inter (system-ui fallback)
- **Headings**: Bold with glow effects
- **Body Text**: Clean and readable on dark backgrounds

## 🌟 Component Architecture

### Header Component
- Responsive navigation bar
- MovieVerse branding
- Search functionality (UI ready)
- Mobile-friendly hamburger menu

### HeroBanner Component
- Full-screen featured movie display
- Gradient overlays for text readability
- Action buttons (Watch Now, Add to Favorites)
- Scroll indicator

### MovieCard Component
- Movie poster display
- Hover effects and animations
- Rating badges
- Click-through to details

### MovieRow Component
- Horizontal scrolling movie lists
- Navigation arrows
- Responsive design
- Smooth scrolling

## 🔧 Development Progress

### Part 3 Capstone Progress ✅
- ✅ Project structure and setup
- ✅ Core React application with TypeScript
- ✅ Responsive UI components
- ✅ Basic routing and navigation
- ✅ Galaxy-themed styling system
- 🔄 TMDb API integration (next phase)
- 🔄 Advanced features (favorites, trailers)

## 🚀 Deployment

The application is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## 📝 API Integration

Currently using mock data for development. TMDb API integration includes:

- **Trending Movies**: Popular movies endpoint
- **Top Rated**: Highest rated movies
- **Search**: Movie search by title
- **Movie Details**: Complete movie information
- **Genres**: Movie categorization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of a capstone coursework and is intended for educational purposes.

## 🙏 Acknowledgments

- **TMDb**: Movie data and API
- **React Team**: Excellent framework
- **Tailwind CSS**: Utility-first styling
- **Vite**: Fast build tool

---

**Built with ❤️ for MovieVerse Capstone Project**