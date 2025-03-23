'use client';
import React from 'react';
import Actions from '../actions';
import inProduct from '@/models/product';
import ProductsContext from '@/store/product-context';
import Image from 'next/image';

interface ProductProps {
  product: inProduct;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const [isActionVisible, setIsActionVisible] = React.useState<boolean>(false); // Explicitly typed
  const { matchedProductIds } = React.useContext(ProductsContext);

  const isMatched = matchedProductIds.includes(product.id);

  return (
    <article
      onClick={() => setIsActionVisible((prev) => !prev)}
      className={`${
        isMatched ? 'flex' : 'hidden'
      } flex-col items-center hover:opacity-100 transition`}
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
          <Actions {...{ product, isActionVisible }} />
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
