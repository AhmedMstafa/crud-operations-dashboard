'use client';
import React, { createContext, useState, ReactNode } from 'react';

export enum PopupType {
  ADD_PRODUCT = 'ADD_PRODUCT',
  VIEW_PRODUCT_DETAILS = 'VIEW_PRODUCT_DETAILS',
  EDIT_PRODUCT = 'EDIT_PRODUCT',
  DELETE_PRODUCT = 'DELETE_PRODUCT',
}

interface PopupContextData {
  isOpen: boolean;
  productId: number | null;
  popupType: PopupType | null;
  openPopup: (productId: number | null, popupType: PopupType) => void;
  closePopup: () => void;
}

const PopupContext = createContext<PopupContextData>({
  isOpen: false,
  productId: null,
  popupType: null,
  openPopup: () => {},
  closePopup: () => {},
});

export const PopupContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [productId, setProductId] = useState<number | null>(null);
  const [popupType, setPopupType] = useState<PopupType | null>(null);

  const openPopup = (id: number | null, type: PopupType) => {
    setProductId(id);
    setPopupType(type);
    setIsOpen(true);
  };

  const closePopup = () => {
    setProductId(null);
    setPopupType(null);
    setIsOpen(false);
  };

  return (
    <PopupContext.Provider
      value={{ isOpen, productId, popupType, openPopup, closePopup }}
    >
      {children}
    </PopupContext.Provider>
  );
};

export default PopupContext;
