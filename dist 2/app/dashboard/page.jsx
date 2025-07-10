'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DashboardPage;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const link_1 = __importDefault(require("next/link"));
function DashboardPage() {
    const router = (0, navigation_1.useRouter)();
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        void (async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push('/login');
                    return;
                }
                const response = await fetch('http://localhost:3000/auth/verify', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    localStorage.removeItem('token');
                    router.push('/login');
                    return;
                }
                setLoading(false);
            }
            catch (err) {
                setError('Failed to verify authentication');
                console.error('Auth error:', err);
                setLoading(false);
            }
        })();
    }, [router]);
    if (error) {
        return (<div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>);
    }
    if (loading) {
        return (<div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>);
    }
    return (<div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h2>
          <p className="text-gray-600 mb-8">
            Manage your restaurants, menus, and more.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <link_1.default href="/create-restaurant" className="block p-6 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                Create Restaurant
              </h3>
              <p className="text-blue-600">
                Add a new restaurant to your platform
              </p>
            </link_1.default>

            <link_1.default href="/my-restaurants" className="block p-6 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                Manage Restaurants
              </h3>
              <p className="text-green-600">
                View and edit your existing restaurants
              </p>
            </link_1.default>

            <link_1.default href="/restaurant/menu" className="block p-6 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors">
              <h3 className="text-xl font-semibold text-purple-700 mb-2">
                Manage Menus
              </h3>
              <p className="text-purple-600">Update menus and menu items</p>
            </link_1.default>
          </div>
        </div>
      </main>
    </div>);
}
//# sourceMappingURL=page.jsx.map