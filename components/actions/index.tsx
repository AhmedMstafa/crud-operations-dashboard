import React from 'react';
import { ProductActionType } from '@/store/product-context';

const Actions: React.FC<{ onClick?: (action: ProductActionType) => void }> = ({
  onClick,
}) => {
  return (
    <div className="absolute flex justify-evenly bg-black text-white bottom-0 left-0 right-0 text-center translate-y-full group-hover:translate-y-0 transition">
      <button
        onClick={onClick?.bind(null, ProductActionType.DELETE_PRODUCT)}
        className="grow-1 py-2 hover:bg-red-700 cursor-pointer transition"
      >
        Delete
      </button>
      <button
        onClick={onClick?.bind(null, ProductActionType.EDIT_PRODUCT)}
        className="grow-1 py-2 hover:bg-slate-700 cursor-pointer transition"
      >
        Edit
      </button>
      <button
        onClick={onClick?.bind(null, ProductActionType.VIEW_DETAILS)}
        className="grow-1 py-2 hover:bg-slate-700 cursor-pointer transition"
      >
        View
      </button>
    </div>
  );
};

export default Actions;
