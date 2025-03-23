'use client';
import React from 'react';
import Actions from '../actions';
import inProduct from '@/models/product';
import ProductsContext, { ProductActionType } from '@/store/product-context';
import PopupContext, { PopupType } from '@/store/popup-context';
import Image from 'next/image';

interface ProductProps {
  product: inProduct;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const { openPopup } = React.useContext(PopupContext);
  const { matchedProductIds, viewDetails } = React.useContext(ProductsContext);

  function actionHandler(action: ProductActionType) {
    switch (action) {
      case ProductActionType.EDIT_PRODUCT:
        openPopup(product.id, PopupType.EDIT_PRODUCT);
        viewDetails(product.id);
        break;

      case ProductActionType.DELETE_PRODUCT:
        openPopup(product.id, PopupType.DELETE_PRODUCT);
        break;

      case ProductActionType.VIEW_DETAILS:
        openPopup(product.id, PopupType.VIEW_PRODUCT_DETAILS);
        viewDetails(product.id);
        break;

      default:
        break;
    }
  }

  const isMatched = matchedProductIds.includes(product.id);

  return (
    <article
      className={`order-${
        isMatched ? 'first' : 'last opacity-10'
      } flex flex-col items-center hover:opacity-100 transition`}
    >
      <div className="space-y-2">
        <div className="relative overflow-hidden bg-gray-100 flex justify-center group cursor-pointer border">
          <div className="relative w-[260px] md:w-[325px] h-[260px] md:h-[325px]">
            <Image
              src={product.images[0]}
              alt="product image"
              fill
              sizes="100%"
              className="object-cover max-w-full"
              priority
            />
          </div>
          <Actions onClick={actionHandler} />
        </div>
      </div>
      <div className="w-[260px] md:w-[325px]">
        <p className=" text-center">{product.title}</p>
        <strong className="mt-auto text-center block">${product.price}</strong>
      </div>
    </article>
  );
};

export default Product;
