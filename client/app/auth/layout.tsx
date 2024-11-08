// import ThemeToggle from '@/components/core/toggle-theme/ToggleTheme';
import React, { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex h-screen w-full flex-col md:flex-row">
      {/* Left Section */}
      <section className="flex-1 flex items-center justify-center bg-gray-100 p-6">
        {/* <ThemeToggle /> */}
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-4">Welcome to Our Platform</h1>
          <p className="text-lg text-gray-600">
            Explore our features and enjoy a seamless experience.
          </p>
        </div>
      </section>
      {/* Right Section (for children) */}
      <section className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {children}
        </div>
      </section>
    </main>
  );
};

export default AuthLayout;