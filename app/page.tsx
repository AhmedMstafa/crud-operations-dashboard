import React from 'react';
import Header from '@/components/header';
import ProductsList from '@/components/products-list';
import { ProductsContextProvider } from '@/store/product-context';
import { PopupContextProvider } from '@/store/popup-context';
import PopUp from '@/components/popup';
import MainNav from '@/components/main-nav';

const Home: React.FC = () => {
  return (
    <ProductsContextProvider>
      <Header />
      <main>
        <PopupContextProvider>
          <MainNav />
          <ProductsList />
          <PopUp />
        </PopupContextProvider>
      </main>
    </ProductsContextProvider>
  );
};

export default Home;
