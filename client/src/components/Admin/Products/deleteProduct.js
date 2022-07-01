import { useState } from "react";
import { ToastContainer, ToastHeader, Toast } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { DELETE_PRODUCT } from "../../../graphql/mutations";
import { useProducts } from "../../../hooks/productHooks";

function DeleteProduct() {
  const [show, setShow] = useState(false);
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
    setShow(true);

    setTimeout(function () {
      window.location.assign("/admin/products");
    }, 1000);
  }

  return (
    <>
      <ToastContainer style={{ position: "fixed", top: 0, right: 0 }}>
        <Toast onClose={() => setShow(false)} show={show} delay={2000} autohide>
          <ToastHeader className="justify-content-between me-2">
            <Toast.Body>Product successfully deleted!</Toast.Body>
          </ToastHeader>
        </Toast>
      </ToastContainer>
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
