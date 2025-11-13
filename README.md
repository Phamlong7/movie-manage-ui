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
- Node.js 18+ or higher installed on your machine
- npm (comes with Node.js) or yarn package manager
- Backend API server running on `http://localhost:5203` (see backend setup documentation)
- Git installed (for cloning the repository)

### Step-by-Step Installation Guide

#### Step 1: Clone the Repository
```bash
git clone https://github.com/Phamlong7/movie-manage-ui.git
cd movie-manage-ui
```

#### Step 2: Install Dependencies
Install all required packages using npm:
```bash
npm install
```

This will install:
- Next.js 16.0.2
- React 19.2.0
- TypeScript 5
- Tailwind CSS 4
- And other dependencies

#### Step 3: Configure Environment Variables
Create a `.env.local` file in the root directory of the project:

```bash
# For Windows (PowerShell)
New-Item .env.local

# For macOS/Linux
touch .env.local
```

Add the following configuration to `.env.local`:

**Option 1: Using Deployed Backend (Recommended for quick start)**
```env
# Backend API URL - Using deployed backend on Render
NEXT_PUBLIC_API_URL=https://moviemanage.onrender.com/api

# Direct API calls (CORS is enabled on backend)
NEXT_PUBLIC_USE_API_PROXY=false

# Development mode
NODE_ENV=development
```

**Option 2: Using Local Backend**
```env
# Backend API URL - Point to your local backend server
NEXT_PUBLIC_API_URL=http://localhost:5203/api

# Use API Proxy - Set to true if backend doesn't have CORS enabled
NEXT_PUBLIC_USE_API_PROXY=false

# Development mode
NODE_ENV=development
```

**Important Notes:**
- **Deployed Backend:** Already running at `https://moviemanage.onrender.com` - ready to use!
- **Local Backend:** Must be running on `http://localhost:5203` before starting frontend
- CORS is enabled on both deployed and local backend
- If you encounter CORS issues, set `NEXT_PUBLIC_USE_API_PROXY=true`

#### Step 4: Verify Backend API Connection

**If using deployed backend (recommended):**
1. Test the deployed API in your browser:
   ```
   https://moviemanage.onrender.com/api/movies
   ```
2. You should see a JSON response (empty array `[]` is fine)
3. Backend is ready - proceed to Step 5!

**If using local backend:**
1. Start your backend server (it should run on port 5203)
2. Test the local API endpoint in your browser:
   ```
   http://localhost:5203/api/movies
   ```
3. You should see a JSON response (empty array `[]` is fine)
4. Check Swagger documentation (if available):
   ```
   http://localhost:5203/swagger
   ```

#### Step 5: Run the Development Server
Start the Next.js development server:

```bash
npm run dev
```

You should see output similar to:
```
▲ Next.js 16.0.2 (Turbopack)
- Local:        http://localhost:3000
- Network:      http://192.168.x.x:3000
- Environments: .env.local

✓ Starting...
✓ Ready in 1153ms
```

#### Step 6: Open the Application
Open your web browser and navigate to:
```
http://localhost:3000
```

You should see the Movie Management application homepage.

### 🧪 Testing the Application

After the application loads, test the following features:

1. **View Movie List** - Should display empty state if no movies exist
2. **Add New Movie**:
   - Click "Add New Movie" button
   - Fill in the title (required)
   - Optionally add genre, rating, and poster URL
   - Click "Add Movie"
   - You should be redirected to the main page

3. **Search Movies** - Type in the search box to filter by title
4. **Filter by Genre** - Select a genre from the dropdown
5. **Sort Movies** - Choose different sort options
6. **Edit Movie** - Click "Edit" button on any movie card
7. **Delete Movie** - Click "Delete" and confirm the action

### 🛠️ Available Scripts

```bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint to check code quality
npm run lint
```

### 📋 Troubleshooting

#### Issue 1: Port 3000 is already in use
```bash
# Kill the process using port 3000 (Windows PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process

# Or use a different port
npm run dev -- -p 3001
```

#### Issue 2: CORS Error
If you see "CORS policy" errors in the browser console:

**Solution 1:** Enable CORS on your backend server
**Solution 2:** Use the API proxy by updating `.env.local`:
```env
NEXT_PUBLIC_USE_API_PROXY=true
```

#### Issue 3: Cannot connect to backend API
- Verify backend is running: `http://localhost:5203/api/movies`
- Check the `NEXT_PUBLIC_API_URL` in `.env.local`
- Ensure there's no firewall blocking the connection
- Check if the backend port is 5203 (not 5000 or other)

#### Issue 4: Build errors
```bash
# Clear Next.js cache and reinstall dependencies
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

#### Issue 5: Environment variables not loading
- Restart the dev server after changing `.env.local`
- Ensure the file is named exactly `.env.local` (not `.env`)
- Environment variables must start with `NEXT_PUBLIC_` to be available in the browser

### 🌐 Network Access

To access the application from other devices on the same network:

1. Note the Network URL from the dev server output:
   ```
   - Network:      http://192.168.x.x:3000
   ```

2. Open this URL on any device connected to the same network

3. Ensure your firewall allows incoming connections on port 3000

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
