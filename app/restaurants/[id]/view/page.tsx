'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  image: string | null;
  description?: string;
}

export default function ViewRestaurantPage() {
  const params = useParams();
  const restaurantId = params?.id as string;
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/public/restaurants/${restaurantId}`,
        );

        if (!response.ok) {
          throw new Error('Failed to fetch restaurant');
        }

        const data = (await response.json()) as Restaurant;
        setRestaurant(data);
      } catch (err) {
        console.error('Error fetching restaurant:', err);
        setError(
          err instanceof Error ? err.message : 'Failed to load restaurant details',
        );
      } finally {
        setLoading(false);
      }
    })();
  }, [restaurantId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">{error || 'Restaurant not found'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{restaurant.name}</h1>
          <Link
            href="/my-restaurants"
            className="text-gray-600 hover:text-gray-900"
          >
            Back to My Restaurants
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {restaurant.image && (
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-64 object-cover"
            />
          )}
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Restaurant Details</h2>
              <p className="text-gray-600">Cuisine: {restaurant.cuisine}</p>
              {restaurant.description && (
                <p className="text-gray-600 mt-2">{restaurant.description}</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
