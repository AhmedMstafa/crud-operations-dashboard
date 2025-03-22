'use client';

import React from 'react';
import { signIn } from 'next-auth/react';

const SigninBtn: React.FC<{ provider: string }> = ({ provider }) => {
  return (
    <button
      onClick={() => signIn(provider, { redirect: true, callbackUrl: '/' })}
      className="capitalize cursor-pointer"
    >{`signin with ${provider}`}</button>
  );
};

export default SigninBtn;
