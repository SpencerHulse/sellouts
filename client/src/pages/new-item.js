import { useState } from "react";
import { useMutation, useLazyQuery } from "@apollo/client";
import { ADD_PRODUCT } from "../graphql/mutations";
import { QUERY_URL } from "../graphql/queries";
import { useCategories } from "../hooks/categoryHooks";
import { capitalizeFirstLetter } from "../utils/helpers";

const NewItem = () => {
  const [addProduct] = useMutation(ADD_PRODUCT);
  const [getURL] = useLazyQuery(QUERY_URL);

  const categories = useCategories();

  const [formState, setFormState] = useState({
    title: "",
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
  const [imageState, setImageState] = useState("");

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
    const { title, description, price, category, inventory } = formState;
    const details = [];

    // Checks to ensure all required parts of the form are filled out
    if (!title || !description || !price || !category) return;

    // Puts all the created details into an array
    for (const key in detailsState) {
      if (detailsState[key] !== "") {
        details.push(detailsState[key]);
      }
    }

    // Gets an s3 Secure URL and uploads the image to a bucket
    if (imageState) {
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
        addProduct({
          variables: {
            input: {
              name: title,
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

        window.location.assign("/");
      });
    } else {
      addProduct({
        variables: {
          input: {
            name: title,
            description: description,
            details: details,
            price: parseFloat(price),
            inventory: parseInt(inventory),
            images: ["https://nsense-images.s3.amazonaws.com/default.jpg"],
            mainImage: "https://nsense-images.s3.amazonaws.com/default.jpg",
            category: category,
          },
        },
      });

      window.location.assign("/");
    }
  }

  return (
    <div className="fullpage bg-tint">
      <div className="container">
        <div className="row">
          <div className="mt-5 dialog">
            <form action="submit" onSubmit={handleSubmit}>
              <div className="dialog-section">
                <h2 className="fw-light">Title</h2>
                <p className="description">
                  A short title that will be displayed throughout your online
                  store
                </p>
                <label htmlFor="title" className="d-none">
                  Title
                </label>
                <input
                  id="title"
                  name="title"
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
                    placeholder="Write a short description of your item. Max. 500 characters."
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
                    placeholder="Enter a detail of a maximum 100 characters"
                    maxLength="100"
                    className="default-input item-detail"
                    onChange={handleDetailsChange}
                  />
                  <input
                    id="detail2"
                    name="detail2"
                    type="text"
                    placeholder="Enter a detail of a maximum 100 characters"
                    maxLength="100"
                    className="default-input item-detail"
                    onChange={handleDetailsChange}
                  />
                  <input
                    id="detail3"
                    name="detail3"
                    type="text"
                    placeholder="Enter a detail of a maximum 100 characters"
                    maxLength="100"
                    className="default-input item-detail"
                    onChange={handleDetailsChange}
                  />
                  <input
                    id="detail4"
                    name="detail4"
                    type="text"
                    placeholder="Enter a detail of a maximum 100 characters"
                    maxLength="100"
                    className="default-input item-detail"
                    onChange={handleDetailsChange}
                  />
                  <input
                    id="detail5"
                    name="detail5"
                    type="text"
                    placeholder="Enter a detail of a maximum 100 characters"
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
              <button className="default-button button-filled">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewItem;
