import React from 'react';
import ProductsContext, { ProductActionType } from '@/store/product-context';
import PopupContext, { PopupType } from '@/store/popup-context';
import inProduct from '@/models/product';

const Actions: React.FC<{
  isActionVisible: boolean;
  product: inProduct;
}> = ({ product, isActionVisible }) => {
  const { openPopup } = React.useContext(PopupContext);
  const { viewDetails } = React.useContext(ProductsContext);

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

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`${
        isActionVisible ? 'translate-y-0' : 'translate-y-full'
      } absolute flex justify-evenly bg-black text-white bottom-0 left-0 right-0 text-center group-hover:translate-y-0 transition`}
    >
      <button
        onClick={actionHandler?.bind(null, ProductActionType.DELETE_PRODUCT)}
        className="grow-1 py-2 hover:bg-red-700 cursor-pointer transition"
      >
        Delete
      </button>
      <button
        onClick={actionHandler?.bind(null, ProductActionType.EDIT_PRODUCT)}
        className="grow-1 py-2 hover:bg-slate-700 cursor-pointer transition"
      >
        Edit
      </button>
      <button
        onClick={actionHandler?.bind(null, ProductActionType.VIEW_DETAILS)}
        className="grow-1 py-2 hover:bg-slate-700 cursor-pointer transition"
      >
        View
      </button>
    </div>
  );
};

export default Actions;
