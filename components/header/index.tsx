import React from 'react';
import Link from 'next/link';
const Header: React.FC = () => {
  return (
    <header className="p-5">
      <nav>
        <ul className="flex justify-center">
          <li>
            <Link href="/products">products</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
