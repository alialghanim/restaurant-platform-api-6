'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ManageMenuPage;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
function ManageMenuPage() {
    const params = (0, navigation_1.useParams)();
    const restaurantId = params?.id;
    const [menus, setMenus] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const fetchMenus = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Authentication required');
                }
                const response = await fetch(`http://localhost:3000/restaurants/${restaurantId}/menus`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to load menus');
                }
                const data = (await response.json());
                setMenus(data);
            }
            catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            }
            finally {
                setLoading(false);
            }
        };
        if (restaurantId) {
            void fetchMenus();
        }
    }, [restaurantId]);
    if (loading) {
        return (<div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </div>
      </div>);
    }
    if (error) {
        return (<div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 text-red-500 p-4 rounded mb-4">
            Error: {error}
          </div>
        </div>
      </div>);
    }
    return (<div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Manage Restaurant Menu</h1>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Menus</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => {
        }}>
              Create New Menu
            </button>
          </div>

          {menus.length === 0 ? (<p className="text-gray-500">
              No menus found. Create your first menu to get started.
            </p>) : (<div className="space-y-4">
              {menus.map((menu) => (<div key={menu.id} className="border rounded p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{menu.name}</h3>
                    <p className="text-gray-600">{menu.description}</p>
                  </div>
                  <div className="space-x-2">
                    <button className="text-blue-600 hover:text-blue-800" onClick={() => {
                }}>
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800" onClick={() => {
                }}>
                      Delete
                    </button>
                  </div>
                </div>))}
            </div>)}
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=page.jsx.map