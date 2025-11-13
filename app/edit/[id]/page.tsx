'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { movieAPI, MovieDto } from '@/lib/api';

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

export default function EditMovie() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<MovieDto>({
    title: '',
    genre: '',
    rating: undefined,
    posterImage: '',
  });

  const fetchMovie = useCallback(async () => {
    if (!id) {
      console.error('No ID provided');
      router.push('/');
      return;
    }

    try {
      setLoading(true);
      const movie = await movieAPI.getById(parseInt(id));
      setFormData({
        title: movie.title,
        genre: movie.genre || '',
        rating: movie.rating || undefined,
        posterImage: movie.posterImage || '',
      });
    } catch (err) {
      console.error('Error fetching movie:', err);
      alert(`Movie not found: ${err instanceof Error ? err.message : 'Unknown error'}`);
      router.push('/');
    } finally {
      setLoading(false);
    }
  }, [id, router]);

  useEffect(() => {
    fetchMovie();
  }, [fetchMovie]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) {
      alert('Movie ID not found');
      return;
    }
    
    setSaving(true);

    try {
      await movieAPI.update(parseInt(id), {
        title: formData.title,
        genre: formData.genre?.trim() || undefined,
        rating: formData.rating || undefined,
        posterImage: formData.posterImage?.trim() || undefined,
      });
      router.push('/');
    } catch (err) {
      console.error('Error updating movie:', err);
      alert('Failed to update movie. Please try again.');
      setSaving(false);
    }
  };

  const renderStarRating = () => {
    return (
      <div className="flex gap-2 items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setFormData({ ...formData, rating: star })}
            className={`text-3xl transition-all ${
              formData.rating && star <= formData.rating
                ? 'text-yellow-400 hover:text-yellow-500'
                : 'text-gray-300 hover:text-gray-400'
            }`}
          >
            ★
          </button>
        ))}
        {formData.rating && (
          <button
            type="button"
            onClick={() => setFormData({ ...formData, rating: undefined })}
            className="ml-2 text-sm text-red-500 hover:text-red-600"
          >
            Clear
          </button>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-b-4 border-purple-600"></div>
          <p className="mt-4 text-gray-600 text-sm sm:text-base">Loading movie...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 py-8 sm:py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="mb-6 sm:mb-8">
          <Link href="/" className="text-purple-600 hover:text-purple-700 font-medium text-sm sm:text-base inline-flex items-center gap-2">
            <span>←</span> Back to Movies
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800">
            ✏️ Edit Movie
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                maxLength={200}
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
              />
              <p className="mt-1 text-xs sm:text-sm text-gray-500">
                {formData.title.length}/200 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Genre (Optional)
              </label>
              <select
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-sm sm:text-base"
              >
                <option value="">Select a genre</option>
                {GENRES.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Rating (Optional, 1-5 stars)
              </label>
              {renderStarRating()}
              {formData.rating && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {formData.rating}/5 stars
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Poster Image URL (Optional)
              </label>
              <input
                type="url"
                maxLength={500}
                value={formData.posterImage}
                onChange={(e) => setFormData({ ...formData, posterImage: e.target.value })}
                className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
              />
              {formData.posterImage && (
                <div className="mt-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={formData.posterImage}
                    alt="Preview"
                    className="w-full max-w-sm h-64 object-cover rounded-lg border border-gray-200 mx-auto"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="w-full sm:flex-1 px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {saving ? '⏳ Saving...' : '💾 Save Changes'}
              </button>
              <Link href="/" className="w-full sm:flex-1">
                <button
                  type="button"
                  className="w-full px-6 py-2.5 sm:py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-semibold text-sm sm:text-base"
                >
                  ❌ Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
