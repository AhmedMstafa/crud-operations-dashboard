'use client';
import React, { useReducer, useEffect, ReactNode } from 'react';
import inProduct from '@/models/product';

export enum ProductActionType {
  SET_PRODUCTS = 'SET_PRODUCTS',
  ADD_PRODUCT = 'ADD_PRODUCT',
  EDIT_PRODUCT = 'EDIT_PRODUCT',
  DELETE_PRODUCT = 'DELETE_PRODUCT',
  VIEW_DETAILS = 'VIEW_DETAILS',
  SET_MATCHES_SEARCH_TERM = 'SET_MATCHES_SEARCH_TERM',
}

interface SetProductsAction {
  type: ProductActionType.SET_PRODUCTS;
  payload: inProduct[];
}

interface AddProductAction {
  type: ProductActionType.ADD_PRODUCT;
  payload: inProduct;
}

interface EditProductAction {
  type: ProductActionType.EDIT_PRODUCT;
  payload: {
    id: number;
    updatedProduct: Partial<inProduct>;
  };
}

interface DeleteProductAction {
  type: ProductActionType.DELETE_PRODUCT;
  payload: {
    id: number;
  };
}

interface ViewDetailsAction {
  type: ProductActionType.VIEW_DETAILS;
  payload: {
    id: number;
  };
}

interface SetMatchesSearchTermAction {
  type: ProductActionType.SET_MATCHES_SEARCH_TERM;
  payload: {
    searchTerm: string;
  };
}

type ProductAction =
  | SetProductsAction
  | AddProductAction
  | EditProductAction
  | DeleteProductAction
  | ViewDetailsAction
  | SetMatchesSearchTermAction;

interface ProductState {
  products: inProduct[];
  selectedProduct: inProduct | null;
  matchedProductIds: number[];
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  matchedProductIds: [],
};

const ProductsContext = React.createContext<{
  products: inProduct[];
  selectedProduct: inProduct | null;
  matchedProductIds: number[];
  addProduct: (product: inProduct) => void;
  editProduct: (id: number, updatedProduct: Partial<inProduct>) => void;
  deleteProduct: (id: number) => void;
  viewDetails: (id: number) => void;
  setMatchesSearchTerm: (searchTerm: string) => void;
  setProducts: (products: inProduct[]) => void;
}>({
  products: [],
  selectedProduct: null,
  matchedProductIds: [],
  addProduct: () => {},
  editProduct: () => {},
  deleteProduct: () => {},
  viewDetails: () => {},
  setMatchesSearchTerm: () => {},
  setProducts: () => {},
});

function productsHandler(
  state: ProductState,
  action: ProductAction
): ProductState {
  switch (action.type) {
    case ProductActionType.SET_PRODUCTS:
      const allProductIds = action.payload.map((product) => product.id);
      return {
        ...state,
        products: action.payload,
        matchedProductIds: allProductIds,
      };

    case ProductActionType.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
        matchedProductIds: [...state.matchedProductIds, action.payload.id], // Add new product ID to matched list
      };

    case ProductActionType.EDIT_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? { ...product, ...action.payload.updatedProduct }
            : product
        ),
      };

    case ProductActionType.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? { ...product, isDeleted: true }
            : product
        ),
      };

    case ProductActionType.VIEW_DETAILS: {
      const selected =
        state.products.find((product) => product.id === action.payload.id) ||
        null;
      return { ...state, selectedProduct: selected };
    }

    case ProductActionType.SET_MATCHES_SEARCH_TERM: {
      const term = action.payload.searchTerm.trim().toLowerCase();
      const matchedProductIds = state.products
        .filter((product) => product.title.toLowerCase().includes(term))
        .map((product) => product.id);
      return {
        ...state,
        matchedProductIds,
      };
    }

    default:
      return state;
  }
}

export const ProductsContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(productsHandler, initialState);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          'https://api.escuelajs.co/api/v1/products'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch products.');
        }
        const data: inProduct[] = await response.json();
        dispatch({ type: ProductActionType.SET_PRODUCTS, payload: data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchProducts();
  }, []);

  const addProduct = (product: inProduct) => {
    dispatch({ type: ProductActionType.ADD_PRODUCT, payload: product });
  };

  const editProduct = (id: number, updatedProduct: Partial<inProduct>) => {
    dispatch({
      type: ProductActionType.EDIT_PRODUCT,
      payload: { id, updatedProduct },
    });
  };

  const deleteProduct = (id: number) => {
    dispatch({
      type: ProductActionType.DELETE_PRODUCT,
      payload: { id },
    });
  };

  const viewDetails = (id: number) => {
    dispatch({
      type: ProductActionType.VIEW_DETAILS,
      payload: { id },
    });
  };

  const setMatchesSearchTerm = (searchTerm: string) => {
    dispatch({
      type: ProductActionType.SET_MATCHES_SEARCH_TERM,
      payload: { searchTerm },
    });
  };

  const setProducts = (products: inProduct[]) => {
    dispatch({ type: ProductActionType.SET_PRODUCTS, payload: products });
  };

  return (
    <ProductsContext.Provider
      value={{
        products: state.products,
        selectedProduct: state.selectedProduct,
        matchedProductIds: state.matchedProductIds,
        addProduct,
        editProduct,
        deleteProduct,
        viewDetails,
        setMatchesSearchTerm,
        setProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
