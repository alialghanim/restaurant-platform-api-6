'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CreateRestaurantPage;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
function CreateRestaurantPage() {
    const router = (0, navigation_1.useRouter)();
    const [formData, setFormData] = (0, react_1.useState)({
        name: '',
        phone: '',
        location: '',
        cuisine: '',
    });
    const [error, setError] = (0, react_1.useState)('');
    const [loading, setLoading] = (0, react_1.useState)(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        void (async () => {
            setLoading(true);
            setError('');
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Authentication required');
                }
                const response = await fetch('http://localhost:3000/restaurants', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                });
                if (!response.ok) {
                    throw new Error('Failed to create restaurant');
                }
                const data = (await response.json());
                router.push(`/restaurant/${data.id}/manage-menu`);
            }
            catch (err) {
                setError('An error occurred while creating the restaurant. Please try again.');
                console.error('Error:', err);
            }
            finally {
                setLoading(false);
            }
        })();
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    return (<div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6">Create New Restaurant</h2>
        {error && (<div className="bg-red-50 text-red-500 p-3 rounded mb-4">{error}</div>)}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Restaurant Name
            </label>
            <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"/>
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"/>
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input type="text" id="location" name="location" required value={formData.location} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"/>
          </div>
          <div>
            <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700">
              Cuisine Type
            </label>
            <input type="text" id="cuisine" name="cuisine" required value={formData.cuisine} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"/>
          </div>
          <button type="submit" disabled={loading} className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {loading ? 'Creating...' : 'Create Restaurant'}
          </button>
        </form>
      </div>
    </div>);
}
//# sourceMappingURL=page.jsx.map