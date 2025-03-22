import React from 'react';
import Button from '../button';
import { ProductActionType } from '@/store/product-context';

const Actions: React.FC<{ onClick?: (action: ProductActionType) => void }> = ({
  onClick,
}) => {
  return (
    <div className="flex gap-5">
      <Button
        onClick={onClick?.bind(null, ProductActionType.DELETE_PRODUCT)}
        text="Delete"
      />
      <Button
        onClick={onClick?.bind(null, ProductActionType.EDIT_PRODUCT)}
        text="Update"
      />
      <Button
        onClick={onClick?.bind(null, ProductActionType.VIEW_DETAILS)}
        text="Show Details"
      />
    </div>
  );
};

export default Actions;
