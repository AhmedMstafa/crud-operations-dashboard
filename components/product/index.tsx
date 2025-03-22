'use client';
import React from 'react';
import Actions from '../actions';
import inProduct from '@/models/product';
import ProductsContext, { ProductActionType } from '@/store/product-context';
import PopupContext, { PopupType } from '@/store/popup-context';

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

  let productClasses: string =
    'order-first flex flex-col items-center gap-5 border my-5 p-5';

  if (!matchedProductIds.includes(product.id)) {
    productClasses =
      'order-last opacity-50 flex flex-col items-center gap-5 border my-5 p-5';
  }

  return (
    <article className={productClasses}>
      <div className="w-full text-center">
        <h2 className="text-2xl font-bold">{product.title}</h2>
      </div>
      <Actions onClick={actionHandler} />
    </article>
  );
};

export default Product;
