import { useState, useEffect } from "react";
import { useMutation, useLazyQuery, useQuery } from "@apollo/client";
import { UPDATE_PRODUCT } from "../../../graphql/mutations";
import { QUERY_URL, QUERY_PRODUCTS } from "../../../graphql/queries";
import { useCategories } from "../../../hooks/categoryHooks";
import { useProducts } from "../../../hooks/productHooks";
import { capitalizeFirstLetter } from "../../../utils/helpers";

const UpdateProduct = () => {
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const [getURL] = useLazyQuery(QUERY_URL);

  const categories = useCategories();
  const products = useProducts();

  const [productData, setProductData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    price: 0,
    inventory: 0,
    category: "",
  });
  const [detailsState, setDetailsState] = useState({
    detail1: "",
    detail2: "",
    detail3: "",
    detail4: "",
    detail5: "",
  });
  const [imageState, setImageState] = useState({ images: [], mainImage: "" });

  useEffect(() => {
    const product = products.filter(
      (product) => product._id === selectedProduct
    );

    setProductData(product);
  }, [products, selectedProduct]);

  useEffect(() => {
    if (!productData.length) return;
    const {
      name,
      description,
      details,
      price,
      inventory,
      images,
      mainImage,
      category,
    } = productData[0];
    const categoryId = category._id;

    setFormState({
      name: name,
      description: description,
      price: price,
      inventory: inventory,
      category: categoryId,
    });

    setImageState({ images: images, mainImage: mainImage });

    const newDetails = {};
    for (let i = 1; i <= 5; i++) {
      const key = `detail${i}`;
      if (!details[i - 1]) {
        newDetails[key] = "";
      } else {
        newDetails[key] = details[i - 1];
      }
    }
    setDetailsState(newDetails);
  }, [productData]);

  useEffect(() => {
    if (!formState) {
      return;
    }

    for (let key in formState) {
      const formData = formState[key];
      if (key === "Category") {
        document.getElementById(key).selected = formData._id;
      } else {
        document.getElementById(key).value = formData;
      }
    }

    for (let key in detailsState) {
      const detail = detailsState[key];
      document.getElementById(key).value = detail;
    }
  }, [formState, detailsState]);

  function handleSelect(event) {
    const { value } = event.target;
    setSelectedProduct(value);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  }

  function handleDetailsChange(event) {
    const { name, value } = event.target;
    setDetailsState({
      ...detailsState,
      [name]: value,
    });
  }

  async function handleImageChange(event) {
    if (event.target.files[0] !== undefined) {
      setImageState(event.target.files[0]);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const { name, description, price, category, inventory } = formState;
    const details = [];

    // Checks to ensure all required parts of the form are filled out
    if (!name || !description || !price || !category) return;

    // Puts all the created details into an array
    for (const key in detailsState) {
      if (detailsState[key] !== "") {
        details.push(detailsState[key]);
      }
    }

    // IMPORTANT !!! The image portion of update should be its own thing,
    // and it should upload a new image or delete one immediately upon click

    // Gets an s3 Secure URL and uploads the image to a bucket
    /* if (imageState) {
      // Gets the secure URL for the s3 bucket
      getURL({ variables: { mainImage: imageState.name } }).then(({ data }) => {
        // Uses the data from the getURL query to upload the image
        fetch(data.uploadImage.url, {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: imageState,
        });
        // Gets the URL for src and pushes it to the the images array
        const bucketLink = data.uploadImage.url.split("?")[0];
        // Adds a new product
        updateProduct({
          variables: {
            input: {
              name: name,
              description: description,
              details: details,
              price: parseFloat(price),
              inventory: parseInt(inventory),
              images: [bucketLink],
              mainImage: bucketLink,
              category: category,
            },
          },
        });

        window.location.assign("/admin");
      });
    } */

    updateProduct({
      variables: {
        input: {
          _id: selectedProduct,
          name: name,
          description: description,
          details: details,
          price: parseFloat(price),
          inventory: parseInt(inventory),
          category: category,
        },
      },
    });

    window.location.assign("/admin");
  }

  return (
    <>
      {formState && (
        <div className="fullpage bg-tint">
          <div className="container">
            <div className="row">
              <div className="mt-5 dialog">
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
                  <div className="dialog-section">
                    <h2 className="fw-light">Title</h2>
                    <p className="description">
                      A short title that will be displayed throughout your
                      online store
                    </p>
                    <label htmlFor="name" className="d-none">
                      Title
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Item Title"
                      className="default-input"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="dialog-section">
                    <h2 className="fw-light">Category</h2>
                    <p className="description">
                      Select the category that best suits the item
                    </p>
                    <label htmlFor="category" className="d-none">
                      Category
                    </label>
                    <select
                      className="default-input"
                      name="category"
                      id="category"
                      required
                      onChange={handleChange}
                    >
                      <option value="">Select a Category</option>
                      {categories.map((category) => (
                        <option value={category._id} key={category._id}>
                          {capitalizeFirstLetter(category.name)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="dialog-section">
                    <h2 className="fw-light">Item images</h2>
                    <input
                      type="file"
                      accept="image/*"
                      id="image"
                      onChange={handleImageChange}
                    />
                  </div>
                  <div className="dialog-section">
                    <h2 className="fw-light">Item Details</h2>
                    <div>
                      <label htmlFor="description">Full description</label>
                      <textarea
                        id="description"
                        name="description"
                        type="text"
                        required
                        rows="6"
                        maxLength="500"
                        placeholder="Write a short description of your item with a max of 500 characters."
                        className="default-input"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="details">Item Details</label>
                      <input
                        id="detail1"
                        name="detail1"
                        type="text"
                        placeholder="Enter a detail of a maximum 100 characters."
                        maxLength="100"
                        className="default-input item-detail"
                        onChange={handleDetailsChange}
                      />
                      <input
                        id="detail2"
                        name="detail2"
                        type="text"
                        placeholder="Enter a detail of a maximum 100 characters."
                        maxLength="100"
                        className="default-input item-detail"
                        onChange={handleDetailsChange}
                      />
                      <input
                        id="detail3"
                        name="detail3"
                        type="text"
                        placeholder="Enter a detail of a maximum 100 characters."
                        maxLength="100"
                        className="default-input item-detail"
                        onChange={handleDetailsChange}
                      />
                      <input
                        id="detail4"
                        name="detail4"
                        type="text"
                        placeholder="Enter a detail of a maximum 100 characters."
                        maxLength="100"
                        className="default-input item-detail"
                        onChange={handleDetailsChange}
                      />
                      <input
                        id="detail5"
                        name="detail5"
                        type="text"
                        placeholder="Enter a detail of a maximum 100 characters."
                        maxLength="100"
                        className="default-input item-detail"
                        onChange={handleDetailsChange}
                      />
                    </div>
                  </div>

                  <div className="dialog-section">
                    <h2 className="fw-light">Pricing and Inventory</h2>
                    <div className="dialog-subsection">
                      <div className="row">
                        <div className="col">
                          <h4 className="fw-light">Regular price</h4>
                          <div className="price-input-group d-flex">
                            <div className="currency">$</div>
                            <input
                              className="price-input"
                              id="price"
                              name="price"
                              type="number"
                              step="0.01"
                              min="0.99"
                              required
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col">
                          <h4 className="fw-light">Inventory</h4>
                          <div className="price-input-group d-flex">
                            <div className="currency"></div>
                            <input
                              className="price-input"
                              id="inventory"
                              name="inventory"
                              type="number"
                              min="0"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="default-button button-filled">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProduct;
