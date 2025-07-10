'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HomePage;
const link_1 = __importDefault(require("next/link"));
const react_1 = require("react");
function HomePage() {
    const [restaurants, setRestaurants] = (0, react_1.useState)([]);
    const [isLoggedIn, setIsLoggedIn] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        void (async () => {
            try {
                const token = localStorage.getItem('token');
                setIsLoggedIn(!!token);
                if (token) {
                    window.location.href = '/dashboard';
                    return;
                }
                const response = await fetch('http://localhost:3000/restaurants');
                if (!response.ok) {
                    throw new Error('Failed to fetch restaurants');
                }
                const data = (await response.json());
                setRestaurants(data);
            }
            catch (err) {
                console.error('Error fetching restaurants:', err);
            }
        })();
    }, []);
    return (<div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Restaurant Platform</h1>
          <div className="space-x-4">
            {isLoggedIn ? (<>
                <link_1.default href="/create-restaurant" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Create Restaurant
                </link_1.default>
                <link_1.default href="/my-restaurants" className="text-gray-600 hover:text-gray-900">
                  My Restaurants
                </link_1.default>
              </>) : (<link_1.default href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Owner Login
              </link_1.default>)}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Explore Restaurants</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (<div key={restaurant.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {restaurant.image ? (<img src={restaurant.image} alt={restaurant.name} className="w-full h-48 object-cover"/>) : (<div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>)}
              <div className="p-4">
                <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                <p className="text-gray-600">{restaurant.cuisine}</p>
              </div>
            </div>))}
        </div>
      </main>
    </div>);
}
//# sourceMappingURL=page.jsx.map