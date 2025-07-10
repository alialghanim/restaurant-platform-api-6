'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoginPage;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const link_1 = __importDefault(require("next/link"));
function LoginPage() {
    const router = (0, navigation_1.useRouter)();
    const [formData, setFormData] = (0, react_1.useState)({
        email: '',
        password: '',
    });
    const [error, setError] = (0, react_1.useState)('');
    const [loading, setLoading] = (0, react_1.useState)(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        void (async () => {
            setLoading(true);
            setError('');
            try {
                const response = await fetch('http://localhost:3001/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                if (!response.ok) {
                    throw new Error('Invalid credentials');
                }
                const data = (await response.json());
                localStorage.setItem('token', data.access_token);
                router.push('/dashboard');
            }
            catch (err) {
                setError('Invalid email or password. Please try again.');
                console.error('Login error:', err);
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
    return (<div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to Your Store
        </h2>
        {error && (<div className="bg-red-50 text-red-500 p-3 rounded mb-4">{error}</div>)}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} placeholder="you@example.com" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"/>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input type="password" id="password" name="password" required value={formData.password} onChange={handleChange} placeholder="********" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"/>
          </div>
          <button type="submit" disabled={loading} className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <link_1.default href="/signup" className="text-blue-600 hover:text-blue-500">
              Sign up here
            </link_1.default>
          </p>
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=page.jsx.map