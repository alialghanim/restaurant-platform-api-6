'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MyRestaurantsPage;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const link_1 = __importDefault(require("next/link"));
function MyRestaurantsPage() {
    const router = (0, navigation_1.useRouter)();
    const [restaurants, setRestaurants] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        void (async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push('/login');
                    return;
                }
                const response = await fetch('http://localhost:3001/restaurants', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch restaurants');
                }
                const data = (await response.json());
                setRestaurants(data);
            }
            catch (err) {
                console.error('Error fetching restaurants:', err);
            }
            finally {
                setLoading(false);
            }
        })();
    }, [router]);
    if (loading) {
        return (<div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>);
    }
    return (<div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Restaurants</h1>
          <div className="space-x-4">
            <link_1.default href="/dashboard" className="text-gray-600 hover:text-gray-900">
              Back to Dashboard
            </link_1.default>
            <link_1.default href="/create-restaurant" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Create New Restaurant
            </link_1.default>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {restaurants.length === 0 ? (<div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">
              No restaurants yet
            </h2>
            <p className="text-gray-500 mb-6">
              Create your first restaurant to get started
            </p>
            <link_1.default href="/create-restaurant" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
              Create Restaurant
            </link_1.default>
          </div>) : (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (<div key={restaurant.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {restaurant.image ? (<img src={restaurant.image} alt={restaurant.name} className="w-full h-48 object-cover"/>) : (<div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>)}
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">
                    {restaurant.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{restaurant.cuisine}</p>
                  <div className="flex space-x-2">
                    <link_1.default href={`/restaurant/${restaurant.id}/manage-menu`} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                      Manage Menu
                    </link_1.default>
                    <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">
                      Edit
                    </button>
                  </div>
                </div>
              </div>))}
          </div>)}
      </main>
    </div>);
}
//# sourceMappingURL=page.jsx.map