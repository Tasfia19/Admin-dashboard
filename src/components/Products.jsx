import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', color: '', capacity: '' });
  const [searchId, setSearchId] = useState('');
  const [foundProduct, setFoundProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://api.restful-api.dev/objects')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          throw new Error("Invalid data format");
        }
      })
      .catch((error) => {
        setError(error.message || "An error occurred while fetching products");
       // console.error(error);
      });
  }, []);

  //for adding products
  const addProduct = () => {
    const productToAdd = {
      name: newProduct.name,
      data: {
        color: newProduct.color,
        capacity: newProduct.capacity
      }
    };

    axios.post('https://api.restful-api.dev/objects', productToAdd)
      .then((response) => {
        setProducts([...products, response.data]);
        setNewProduct({ name: '', color: '', capacity: '' });
      })
      .catch((error) => {
        setError(error.message || "An error occurred while adding the product");
        console.error(error);
      });
  };

  //for deleting products
  const deleteProduct = (id) => {
    axios.delete(`https://api.restful-api.dev/objects/${id}`)
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
      })
      .catch((error) => {
        setError(error.message || "An error occurred while deleting the product");
        console.error(error);
      });
  };
 //for finding products
  const findProduct = () => {
    if (!searchId) {
      setError("Please enter a product ID");
      setFoundProduct(null);
      return;
    }

    axios.get(`https://api.restful-api.dev/objects/${searchId}`)
      .then((response) => {
        setFoundProduct(response.data);
        setError(null);
      })
      .catch((error) => {
        setError("Product not found");
        setFoundProduct(null);
        console.error(error);
      });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Products</h2>

      {/* Search Product by ID */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter Product ID"
          className="p-2 border rounded mr-2"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button onClick={findProduct} className="p-2 mt-2 bg-blue-500 text-white rounded">
          Find Product
        </button>
      </div>

      {/* Display Found Product */}
      {foundProduct && (
        <div className="p-6 bg-gray-200 rounded shadow mb-6">
          <h3 className="font-semibold">{foundProduct.name}</h3>
          <p><strong>Color:</strong> {foundProduct.data?.color || "Not Available"}</p>
          <p><strong>Capacity:</strong> {foundProduct.data?.capacity || "Not Available"}</p>
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {/* Add Product Form */}
      <div className="mb-6 ">
        <input
          type="text"
          placeholder="Product Name"
          className="p-2 mt-2 border rounded mr-2"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Color"
          className="p-2 mt-2 border rounded mr-2"
          value={newProduct.color}
          onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value })}
        />
        <input
          type="text"
          placeholder="Capacity"
          className="p-2 mt-2 border rounded mr-2"
          value={newProduct.capacity}
          onChange={(e) => setNewProduct({ ...newProduct, capacity: e.target.value })}
        />
        <button onClick={addProduct} className="p-2 mt-2 bg-green-500 text-white rounded">
          Add Product
        </button>
      </div>

      {/* Products List */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <li key={product.id} className="p-6 bg-gray-200 rounded shadow hover:bg-violet-300 transition">
            <h3 className="font-semibold">{product.name}</h3>
            <p><strong>Color:</strong> {product.data?.color || "Not Available"}</p>
            <p><strong>Capacity:</strong> {product.data?.capacity || "Not Available"}</p>
            <button
              onClick={() => deleteProduct(product.id)}
              className="mt-2 p-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
