'use client';
import React from 'react';
import Button from '../button';
import ProductsContext from '@/store/product-context';
import PopupContext from '@/store/popup-context';

const DeleteProduct: React.FC = () => {
  const { deleteProduct } = React.useContext(ProductsContext);
  const { closePopup, productId } = React.useContext(PopupContext);

  const deleteHandler = () => {
    if (!productId) {
      console.error('No product selected for deletion.');
      return;
    }
    deleteProduct(Number(productId));
    closePopup();
  };

  const closeHandler = () => {
    closePopup();
  };

  return (
    <div className="border h-full p-5">
      <div className="flex flex-col justify-center gap-5">
        <p className="text-center">Are You Sure To Delete This Product !</p>
        <div className="flex justify-center gap-5">
          <Button text="Delete" onClick={deleteHandler} />
          <Button text="Close" onClick={closeHandler} />
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
