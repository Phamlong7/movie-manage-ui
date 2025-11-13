'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { movieAPI, Movie } from '@/lib/api';

const GENRES = [
  'Action',
  'Comedy',
  'Drama',
  'Horror',
  'Romance',
  'Sci-Fi',
  'Thriller',
  'Animation',
  'Documentary',
  'Fantasy',
];

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [sortByField, setSortByField] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await movieAPI.getAll(search, genreFilter, sortByField, sortOrder);
      setMovies(data);
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError('Failed to load movies. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [search, genreFilter, sortByField, sortOrder]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleSortChange = (value: string) => {
    if (!value) {
      setSortByField('title');
      setSortOrder('asc');
    } else if (value === 'title-asc') {
      setSortByField('title');
      setSortOrder('asc');
    } else if (value === 'title-desc') {
      setSortByField('title');
      setSortOrder('desc');
    } else if (value === 'rating-asc') {
      setSortByField('rating');
      setSortOrder('asc');
    } else if (value === 'rating-desc') {
      setSortByField('rating');
      setSortOrder('desc');
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      await movieAPI.delete(id);
      await fetchMovies(); // Refresh list
    } catch (err) {
      console.error('Error deleting movie:', err);
      alert('Failed to delete movie. Please try again.');
    }
  };

  const renderStars = (rating?: number | null) => {
    if (!rating) return <span className="text-gray-400 text-sm">No rating</span>;
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-lg ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            ★
          </span>
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating}/5)</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            🎬 Movie Management
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Manage your watchlist - Add, edit, search, and organize your movies
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <input
              type="text"
              placeholder="🔍 Search by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
            />
            <select
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
              className="px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-sm sm:text-base"
            >
              <option value="">🎭 All Genres</option>
              {GENRES.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <select
              value={`${sortByField}-${sortOrder}`}
              onChange={(e) => handleSortChange(e.target.value)}
              className="px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-sm sm:text-base"
            >
              <option value="title-asc">🔤 Title (A-Z)</option>
              <option value="title-desc">🔡 Title (Z-A)</option>
              <option value="rating-asc">⭐ Rating (Low to High)</option>
              <option value="rating-desc">⭐ Rating (High to Low)</option>
            </select>
            <Link href="/create" className="w-full">
              <button className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg text-sm sm:text-base">
                ➕ Add New Movie
              </button>
            </Link>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-16 sm:py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-b-4 border-purple-600"></div>
            <p className="mt-4 text-gray-600 text-sm sm:text-base">Loading movies...</p>
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center py-16 sm:py-20 bg-white rounded-2xl shadow-lg">
            <div className="text-5xl sm:text-6xl mb-4">🎬</div>
            <p className="text-lg sm:text-xl text-gray-600 mb-2">
              {search || genreFilter ? 'No movies found' : 'No movies yet'}
            </p>
            <p className="text-sm sm:text-base text-gray-500">
              {search || genreFilter
                ? 'Try adjusting your filters' 
                : 'Add your first movie to get started'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {movie.posterImage ? (
                  <div className="relative h-64 sm:h-72 overflow-hidden bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={movie.posterImage}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 
                          'https://via.placeholder.com/400x600?text=No+Poster';
                      }}
                    />
                  </div>
                ) : (
                  <div className="h-64 sm:h-72 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-6xl sm:text-7xl">🎬</span>
                  </div>
                )}
                
                <div className="p-4 sm:p-5">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800 line-clamp-2 min-h-[3.5rem]">
                    {movie.title}
                  </h3>
                  
                  {movie.genre && (
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs sm:text-sm font-medium">
                        🎭 {movie.genre}
                      </span>
                    </div>
                  )}

                  <div className="mb-3">
                    {renderStars(movie.rating)}
                  </div>

                  <div className="text-xs text-gray-400 mb-4">
                    📅 {new Date(movie.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/edit/${movie.id}`} className="flex-1">
                      <button className="w-full px-3 sm:px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium text-sm sm:text-base">
                        ✏️ Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(movie.id, movie.title)}
                      className="flex-1 px-3 sm:px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium text-sm sm:text-base"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
