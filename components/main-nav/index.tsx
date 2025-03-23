import React from 'react';
import SearchPar from '../search-bar';
import AddBtn from './add-btn';
import { type Session, getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth';
import UserMenu from '../user-menu';
const MainNav: React.FC = async () => {
  const session: Session | null = await getServerSession(authOptions);
  return (
    <nav className="bg-gray-900 py-4 mb-6">
      <div className="container relative flex flex-col-reverse sm:flex-row gap-8 items-center">
        <SearchPar />
        <div className="w-full sm:w-fit flex items-center justify-around gap-5 sm:ms-auto">
          <AddBtn />
          <UserMenu {...{ session }} />
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
