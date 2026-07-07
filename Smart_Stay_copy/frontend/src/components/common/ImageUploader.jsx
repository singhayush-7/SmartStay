import { useRef, useEffect } from "react";
import { Upload, X } from "lucide-react";
import toast from "react-hot-toast";

const DEFAULT_MAX_IMAGES = 6;
const MAX_FILE_SIZE = 5 * 1024 * 1024; 

const ImageUploader = ({
  images = [],
  setImages,
  maxImages = DEFAULT_MAX_IMAGES,
}) => {
  const fileInputRef = useRef(null);

  
  useEffect(() => {
    return () => {
      images.forEach((image) => {
        if (image.preview) {
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, [images]);

  const handleSelect = (event) => {
    const files = Array.from(event.target.files);

    if (!files.length) return;

    const remainingSlots = maxImages - images.length;

    if (remainingSlots <= 0) {
      toast.error(`Maximum ${maxImages} images allowed.`);
      event.target.value = "";
      return;
    }

    const validImages = [];

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image.`);
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} exceeds 5 MB.`);
        continue;
      }

      validImages.push({
        file,
        preview: URL.createObjectURL(file),
      });

      if (validImages.length >= remainingSlots) {
        break;
      }
    }

    setImages((prev) => [...prev, ...validImages]);

    event.target.value = "";
  };

  const removeImage = (index) => {
    const image = images[index];

    if (image.preview) {
      URL.revokeObjectURL(image.preview);
    }

    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-5">
      {}

      <button
        type="button"
        onClick={() => fileInputRef.current.click()}
        className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-300 p-8 transition hover:border-indigo-600 hover:bg-slate-50"
      >
        <Upload size={22} />

        <span className="font-medium">
          Upload Property Images
        </span>
      </button>

      <input
        hidden
        multiple
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleSelect}
      />

      {}

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl border"
            >
              <img
                src={
                  image.preview ||
                  image.secure_url
                }
                alt="Preview"
                className="h-36 w-full object-cover"
              />

              <button
                type="button"
                onClick={() =>
                  removeImage(index)
                }
                className="absolute right-2 top-2 rounded-full bg-red-600 p-1 text-white transition hover:bg-red-700"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="text-sm text-slate-500">
        {images.length} / {maxImages} images selected
      </p>
    </div>
  );
};

export default ImageUploader;