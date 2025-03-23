'use client';
import React from 'react';
import Image from 'next/image';
import { type Session } from 'next-auth';
import SignOutBtn from '../signout-btn';
const UserMenu: React.FC<{
  session: Session | null;
}> = ({ session }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <Image
        onClick={() => setIsOpen((prev) => !prev)}
        className="rounded-full outline-2 outline-gray-200 cursor-pointer"
        src={session?.user?.image || '/new-user.jpg'}
        alt="User Image"
        width={50}
        height={50}
        priority={true}
      />
      <div
        className={`${
          isOpen ? 'flex' : 'hidden'
        } absolute z-10 flex-col items-center justify-center gap-5 min-w-50 min-h-30 bg-gray-200 text-gray-900 -bottom-4 right-0 translate-y-full rounded`}
      >
        <p className="">Hi , {session?.user?.name}</p>
        <SignOutBtn />
      </div>
    </div>
  );
};

export default UserMenu;
