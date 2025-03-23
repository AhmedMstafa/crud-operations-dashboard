'use client';

import React from 'react';
import { redirect } from 'next/navigation';

const SignOutBtn: React.FC = () => {
  return (
    <button
      onClick={() => redirect('/api/auth/signout')}
      className="capitalize cursor-pointer bg-gray-600 hover:bg-gray-500 transition py-1 px-3 rounded-full text-white"
    >
      Sign Out
    </button>
  );
};

export default SignOutBtn;
