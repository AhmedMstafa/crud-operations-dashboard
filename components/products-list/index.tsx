'use client';
import React from 'react';
import Product from '../product';
import ProductsContext from '@/store/product-context';

const ProductsList: React.FC = () => {
  const { products } = React.useContext(ProductsContext);

  return (
    <section className="flex flex-col p-5">
      {products.map((product) =>
        !product.isDeleted ? (
          <Product key={product.id} product={product} />
        ) : null
      )}
    </section>
  );
};

export default ProductsList;
