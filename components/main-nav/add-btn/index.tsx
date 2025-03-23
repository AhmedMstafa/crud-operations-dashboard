'use client';
import React from 'react';
import PopupContext, { PopupType } from '@/store/popup-context';
import { IoAddOutline } from 'react-icons/io5';

const AddBtn: React.FC = () => {
  const { openPopup } = React.use(PopupContext);

  return (
    <button
      onClick={() => openPopup(null, PopupType.ADD_PRODUCT)}
      className="element-center gap-0.5 text-nowrap cursor-pointer bg-gray-700 hover:bg-gray-600 duration-150 py-1 px-2.5 rounded-sm"
    >
      Add New
      <IoAddOutline />
    </button>
  );
};

export default AddBtn;
