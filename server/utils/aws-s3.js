const aws = require("aws-sdk");
require("dotenv").config();
const crypto = require("crypto");
const { promisify } = require("util");
const randomBytes = promisify(crypto.randomBytes);

const region = process.env.AWS_S3_REGION;
const bucketName = process.env.AWS_S3_BUCKET;
const accessKeyId = process.env.AWS_S3_ACCESS_KEY;
const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

async function generateUploadURL(image) {
  let imageName = image;
  if (imageName !== "default") {
    const rawBytes = await randomBytes(16);
    imageName = rawBytes.toString("hex");
  }

  // Creates a URL valid for 600 seconds
  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 600,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
}

// Will delete an object in the bucket
/* s3.deleteObject(
  {
    Bucket: bucketName,
    Key: "2448b01648d16acf54716a89bb6b4074",
  },
  function (err, data) {}
); */

module.exports = { generateUploadURL };
