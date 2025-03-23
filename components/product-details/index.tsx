'use client';
import React from 'react';
import Button from '../button';
import ProductsContext from '@/store/product-context';
import PopupContext from '@/store/popup-context';

const ProductDetails: React.FC = () => {
  const { selectedProduct } = React.useContext(ProductsContext);
  const { closePopup } = React.useContext(PopupContext);

  const closeHandler = () => {
    closePopup();
  };

  if (!selectedProduct) return null;

  return (
    <div className="p-5">
      <div className="flex flex-col justify-center gap-5">
        <h2 className="text-2xl font-bold text-center">
          {selectedProduct.title}
        </h2>
        <p className="text-center">{selectedProduct.description}</p>
        <p className="text-center font-semibold">
          Price: ${selectedProduct.price}
        </p>
        <p className="text-center">Category: {selectedProduct.category.name}</p>
        {selectedProduct.images && selectedProduct.images.length > 0 && (
          <div className="flex justify-center gap-3 flex-wrap">
            {selectedProduct.images.map((img, idx) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={idx}
                src={img}
                alt={`${selectedProduct.title} image ${idx + 1}`}
                className="w-16 h-16 object-cover rounded"
              />
            ))}
          </div>
        )}
        <Button text="Close" onClick={closeHandler} />
      </div>
    </div>
  );
};

export default ProductDetails;
