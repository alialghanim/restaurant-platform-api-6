'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  image: string | null;
}

export default function HomePage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    void (async () => {
      try {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        
        if (token) {
          // Verify token is valid
          try {
            const verifyResponse = await fetch('http://localhost:3000/auth/verify', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            
            if (!verifyResponse.ok) {
              // Token is invalid, clear it
              localStorage.removeItem('token');
              setIsLoggedIn(false);
            } else {
              setIsLoggedIn(true);
              window.location.href = '/dashboard';
              return;
            }
          } catch (verifyErr) {
            // Error verifying token, clear it
            console.error('Error verifying token:', verifyErr);
            localStorage.removeItem('token');
            setIsLoggedIn(false);
          }
        } else {
          setIsLoggedIn(false);
        }

        // Fetch restaurants
        const response = await fetch('http://localhost:3000/restaurants');
        if (!response.ok) {
          throw new Error('Failed to fetch restaurants');
        }

        const data = (await response.json()) as Restaurant[];
        setRestaurants(data);
      } catch (err) {
        console.error('Error fetching restaurants:', err);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Restaurant Platform</h1>
          <div className="space-x-4">
            {isLoggedIn ? (
              <>
                <Link
                  href="/create-restaurant"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Create Restaurant
                </Link>
                <Link
                  href="/my-restaurants"
                  className="text-gray-600 hover:text-gray-900"
                >
                  My Restaurants
                </Link>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Owner Login
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Explore Restaurants</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {restaurant.image ? (
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                <p className="text-gray-600">{restaurant.cuisine}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
