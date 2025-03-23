'use client';
import React from 'react';
import Product from '../product';
import ProductsContext from '@/store/product-context';

const ProductsList: React.FC = () => {
  const { products } = React.useContext(ProductsContext);

  return (
    <section>
      <div className="container grid gap-6 place-content-center p-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {products.map((product) =>
          !product.isDeleted ? (
            <Product key={product.id} product={product} />
          ) : null
        )}
      </div>
    </section>
  );
};

export default ProductsList;
