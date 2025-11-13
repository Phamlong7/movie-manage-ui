# 🎬 Movie Management Web App

A simple and elegant web application for managing movies you want to watch. Built with Next.js and designed to meet the following requirements:

## 📋 Features

### 1. **Main Page (Movie List)**
- Display all movies with:
  - **Title** (Required)
  - **Genre** (Optional)
  - **Rating** (Optional, 1-5 stars)
  - **Poster Image** (Optional)
- Search movies by title
- Filter by genre
- Sort by rating or title
- Delete confirmation prompt

### 2. **Add Movie**
- Add new movie with:
  - Title (Required)
  - Genre (Optional)
  - Rating (Optional, 1-5)
  - Poster Image URL (Optional)

### 3. **Edit Movie**
- Click on a movie to navigate to edit page
- Update title, genre, rating, and poster image
- Redirects back to movie list after saving

### 4. **Delete Movie**
- Delete movies with confirmation prompt

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Backend API running (see backend setup)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd movie-manage-ui
```

2. Install dependencies:
```bash
npm install
```

3. Configure API URL:

Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5203/api
# Optional: Use proxy to avoid CORS issues
NEXT_PUBLIC_USE_API_PROXY=false
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

## 🛠️ Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **API Integration**: Fetch API with custom hooks
- **Responsive Design**: Mobile-first approach

## 📁 Project Structure

```
movie-manage-ui/
├── app/
│   ├── page.tsx              # Main page - Movie list
│   ├── create/
│   │   └── page.tsx          # Add new movie
│   ├── edit/
│   │   └── [id]/
│   │       └── page.tsx      # Edit movie
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── lib/
│   └── api.ts                # API client & types
└── public/                   # Static assets
```

## 🎨 UI Features

- **Modern Design**: Gradient backgrounds, smooth animations
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Interactive Elements**: 
  - Star rating system (1-5 stars)
  - Genre badges
  - Image previews
  - Hover effects
- **User Feedback**: Loading states, error messages, confirmation dialogs

## 🔌 API Integration

The app connects to a backend API with the following endpoints:

- `GET /api/movies` - Get all movies (supports search, genre filter, sort)
- `GET /api/movies/{id}` - Get movie by ID
- `POST /api/movies` - Create new movie
- `PUT /api/movies/{id}` - Update movie
- `DELETE /api/movies/{id}` - Delete movie

## 📝 Development Notes

- Uses Next.js App Router
- Client-side rendering for interactive components
- API proxy support for CORS issues
- TypeScript for type safety
- ESLint for code quality

## 🚢 Deployment

### Deploy on Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables:
   - `NEXT_PUBLIC_API_URL` - Your backend API URL

### Build for Production

```bash
npm run build
npm start
```

## 📄 License

This project is created for educational purposes.
