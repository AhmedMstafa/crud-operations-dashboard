'use client';
import React from 'react';
import AddProduct from '../add-product';
import ProductDetails from '../product-details';
import UpdateProduct from '../update-product';
import DeleteProduct from '../delete-product';
import PopupContext, { PopupType } from '@/store/popup-context';
import { use } from 'react';

const PopUp: React.FC = () => {
  const { isOpen, popupType } = use(PopupContext);

  return (
    <div
      className={`${
        !isOpen ? 'hidden' : ''
      } fixed bg-white/20 top-0 left-0 right-0 bottom-0 z-50`}
    >
      <div className="border absolute left-[50%] top-[50%] translate-[-50%] max-h-screen w-90 bg-gray-900">
        {popupType === PopupType.ADD_PRODUCT ? (
          <AddProduct />
        ) : popupType === PopupType.EDIT_PRODUCT ? (
          <UpdateProduct />
        ) : popupType === PopupType.DELETE_PRODUCT ? (
          <DeleteProduct />
        ) : (
          <ProductDetails />
        )}
      </div>
    </div>
  );
};

export default PopUp;
