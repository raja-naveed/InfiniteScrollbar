import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts([...products, ...data]);
        setHasMore(data.length > 0);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-4">Product List</h1>
      <InfiniteScroll
        dataLength={products.length}
        next={fetchProducts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <li key={product.id} className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-700">Price: ${product.price}</p>
              <p className="text-gray-700">Category: {product.category}</p>
              <p className="text-gray-700">Description: {product.description}</p>
              <img
                src={product.image}
                alt={product.title}
                className="mt-2"
              />
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
}

export default ProductList;
