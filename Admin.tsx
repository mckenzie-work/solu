
import { useState } from 'react';
import Navigation from '../components/Navigation';

// TODO: Implement proper authentication with Django backend
// This is a placeholder component for future admin functionality

interface LoginForm {
  email: string;
  password: string;
}

const Admin = () => {
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Replace with actual Django authentication endpoint
    // const response = await fetch('/api/auth/login/', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'X-CSRFToken': getCsrfToken(),
    //   },
    //   body: JSON.stringify({
    //     email: formData.email,
    //     password: formData.password
    //   })
    // });

    console.log('Admin login attempt:', {
      email: formData.email,
      timestamp: new Date().toISOString()
    });

    // Placeholder delay
    setTimeout(() => {
      setIsLoading(false);
      alert('Admin authentication will be implemented with Django backend');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-barbershop-gray-50">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="max-w-md mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-space font-light text-barbershop-black mb-8 text-center">
              Admin Access
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-barbershop-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="premium-input"
                  placeholder="admin@Solutionbarbershop.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-barbershop-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="premium-input"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`premium-button w-full ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-8 p-4 bg-barbershop-gray-50 rounded-lg">
              <p className="text-sm text-barbershop-gray-600 text-center">
                <strong>Development Note:</strong> Admin dashboard will be implemented 
                with Django backend integration for booking management, customer data, 
                and business analytics.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
