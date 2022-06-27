import { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_PRODUCT } from "../../../graphql/mutations";
import { useProducts } from "../../../hooks/productHooks";

function DeleteProduct() {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  const products = useProducts();

  function handleSelect(event) {
    const { value } = event.target;
    setSelectedProduct(value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!selectedProduct) return;

    deleteProduct({ variables: { id: selectedProduct } });

    window.location.assign("/admin/products");
  }

  return (
    <>
      {products && (
        <div>
          <div className="dialog">
            <form action="submit" onSubmit={handleSubmit}>
              <div className="dialog-section">
                <h2 className="fw-light">Products</h2>
                <p className="description">
                  Select the product you want to update
                </p>
                <label htmlFor="product" className="d-none">
                  Product
                </label>
                <select
                  className="default-input"
                  name="product"
                  id="product"
                  required
                  onChange={handleSelect}
                >
                  <option value="">Select a Product</option>
                  {products.map((product) => (
                    <option value={product._id} key={product._id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>
              <button className="default-button button-filled">Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteProduct;
