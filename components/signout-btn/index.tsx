'use client';

import React from 'react';
import { redirect } from 'next/navigation';

const SignOutBtn: React.FC = () => {
  return (
    <button
      onClick={() => redirect('/api/auth/signout')}
      className="capitalize cursor-pointer"
    >
      Sign Out
    </button>
  );
};

export default SignOutBtn;
