'use client';
import Button from '../button';
import PopupContext, { PopupType } from '@/store/popup-context';
import React from 'react';
import SearchPar from '../search-bar';

const MainNav: React.FC = () => {
  const { openPopup } = React.use(PopupContext);

  function onClickHandler() {
    openPopup(null, PopupType.ADD_PRODUCT);
  }

  return (
    <nav className="border flex mx-5">
      <SearchPar />
      <div className="text-center">
        <Button text="Add New" onClick={onClickHandler} />
      </div>
    </nav>
  );
};

export default MainNav;
