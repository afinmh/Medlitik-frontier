'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthDebug() {
  const [authState, setAuthState] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check localStorage only
    const user = localStorage.getItem('user');
    
    setAuthState({
      localStorage: {
        user: user ? JSON.parse(user) : null
      },
      currentPath: pathname
    });
  }, [pathname]);

  const testRedirect = () => {
    router.push('/user');
  };

  const clearAuth = () => {
    localStorage.removeItem('user');
    // Use router.refresh() to reload the current page
    router.refresh();
  };

  if (!authState) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Auth Debug</h1>
      
      <div className="bg-white p-4 rounded mb-4">
        <h2 className="font-bold mb-2">Current Path:</h2>
        <p>{authState.currentPath}</p>
      </div>
      
      <div className="bg-white p-4 rounded mb-4">
        <h2 className="font-bold mb-2">LocalStorage:</h2>
        {authState.localStorage.user ? (
          <div>
            <p>User: {authState.localStorage.user.firstName} {authState.localStorage.user.lastName}</p>
            <p>Email: {authState.localStorage.user.email}</p>
            <p>Role: {authState.localStorage.user.role}</p>
          </div>
        ) : (
          <p>No user data</p>
        )}
      </div>
      
      <div className="space-x-4">
        <button 
          onClick={testRedirect}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Test Redirect to /user
        </button>
        
        <button 
          onClick={clearAuth}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear Auth & Reload
        </button>
      </div>
    </div>
  );
}
