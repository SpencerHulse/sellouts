import React, { useState, useEffect } from "react";
import { useMutation, useLazyQuery } from "@apollo/client";
import { QUERY_URL } from "../../graphql/queries";
import { UPDATE_PRODUCT } from "../../graphql/mutations";
import { useProducts } from "../../hooks/productHooks";

function ImageUpload() {
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const [getURL, { data }] = useLazyQuery(QUERY_URL);
  const productData = useProducts();
  const [image, setImage] = useState();

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  useEffect(() => {
    if (image) {
      getURL({ variables: { mainImage: image.name } });
    }
    console.log(image);
  }, [image, getURL]);
  console.log(data);
  const updateProductHandler = async (event) => {
    event.preventDefault();
    const { _id, mainImage, images } = productData[0];
    // Upload the image (if it exists) to the AWS s3 Bucket
    let imageUrl;
    if (image) {
      await fetch(data.uploadImage.url, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: image,
      });
      // Gets the URL for src
      imageUrl = data.uploadImage.url.split("?")[0];
    }

    let mainImageCheck;
    if (image) {
      mainImageCheck = imageUrl;
    } else {
      mainImageCheck = mainImage;
    }

    updateProduct({
      variables: {
        input: {
          _id: _id,
          mainImage: mainImageCheck,
          images: images,
        },
      },
    });
  };

  return (
    <form action="submit" onSubmit={updateProductHandler}>
      {" "}
      <label htmlFor="mainImage" id="mainImage">
        Main Image:{" "}
      </label>
      <input
        id="imageInput"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <br />
      {/* Change to select... */}
      <button className="add-button">Submit</button>
    </form>
  );
}

export default ImageUpload;
