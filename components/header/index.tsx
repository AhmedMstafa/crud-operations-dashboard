import React from 'react';
import { type Session, getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth';
import Image from 'next/image';
import SignOutBtn from '../signout-btn';

const Header: React.FC = async () => {
  const session: Session | null = await getServerSession(authOptions);

  return (
    <header className="p-5">
      <nav>
        <ul className="flex  justify-between">
          {session && (
            <>
              <li>
                <div className="min-w-[50px] min-h-[50px]">
                  <Image
                    className="mx-auto rounded-full"
                    src={(session.user?.image as string) || '/new-user.jpg'}
                    alt="User Image"
                    width={50}
                    height={50}
                  />
                  <h1 className="text-[12px] text-center p-1">
                    {session?.user?.name?.split(' ')[0]}
                  </h1>
                </div>
              </li>
              <li className="flex">
                <SignOutBtn />
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
