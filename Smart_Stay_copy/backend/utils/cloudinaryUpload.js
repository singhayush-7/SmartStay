import cloudinary from "../config/cloudinary.js";
import ApiError from "./ApiError.js";


const uploadSingleImage = async (
  file,
  folder = "SmartStay"
) => {
  try {
    if (!file) return null;

    const base64 = `data:${file.mimetype};base64,${file.buffer.toString(
      "base64"
    )}`;

    const result = await cloudinary.uploader.upload(base64, {
      folder,
    });

    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };
  } catch (error) {
    throw new ApiError(500, "Image upload failed.");
  }
};


const uploadMultipleImages = async (
  files,
  folder = "SmartStay"
) => {
  try {
    if (!files || files.length === 0) {
      return [];
    }

    const uploadedImages = [];

    for (const file of files) {
      const base64 = `data:${file.mimetype};base64,${file.buffer.toString(
        "base64"
      )}`;

      const result = await cloudinary.uploader.upload(base64, {
        folder,
      });

      uploadedImages.push({
        public_id: result.public_id,
        secure_url: result.secure_url,
      });
    }

    return uploadedImages;
  } catch (error) {
    console.error("Cloudinary Error:", error);
    throw new ApiError(500, "Image upload failed: " + error.message);
  }
};


const deleteSingleImage = async (publicId) => {
  try {
    if (!publicId) return;

    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new ApiError(500, "Failed to delete image.");
  }
};


const deleteMultipleImages = async (images = []) => {
  try {
    if (!images.length) return;

    for (const image of images) {
      await cloudinary.uploader.destroy(image.public_id);
    }
  } catch (error) {
    throw new ApiError(500, "Failed to delete images.");
  }
};

export {
  uploadSingleImage,
  uploadMultipleImages,
  deleteSingleImage,
  deleteMultipleImages,
};