import { useRef, useState } from "react";
import { MdPhotoCamera } from "react-icons/md";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "../../utils/FirebaseService";
import { useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import clsx from "clsx";
const storage = getStorage(app);

const Photo = ({ isError, Error, directory, register, name }) => {
  const refImage = useRef(null);
  const [image, setImage] = useState("");
  const { setValue, watch } = useFormContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsLoading(true);
    const file = e.target.files[0];
    if (file) {
      const refArchivo = ref(storage, `${directory}/${file.name}`);
      await uploadBytes(refArchivo, file);
      const ulrImDesc = await getDownloadURL(refArchivo);
      if (ulrImDesc !== null) {
        setImage(ulrImDesc);
        setValue("urlImage", ulrImDesc);
        setIsLoading(false);
      }
    }
  };

  const ImagenEsqueleto = () => {
    return (
      <div>
        <img
          src={image}
          className="bg-[#f2f2f2] w-[120px] h-[120px] lg:w-[220px] lg:h-[220px] rounded-full flex justify-center items-center animate-pulse"
        />
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center flex-col">
      {isLoading ? (
        <ImagenEsqueleto />
      ) : (
        <div
          className="w-[120px] h-[120px] lg:w-[220px] lg:h-[220px]"
          onClick={() => {
            if (refImage.current) {
              refImage.current.click();
            } else {
              console.log("No existe el ref");
            }
          }}
        >
          <picture className="relative w-[120px] h-[120px] lg:w-[220px] lg:h-[220px]">
            {watch(name) ? (
              <div className="w-[120px] h-[120px] lg:w-[220px] lg:h-[220px]">
                <img
                  {...register(name)}
                  src={watch(name)}
                  className="w-[120px] h-[120px] lg:w-[220px] lg:h-[220px] rounded-full flex justify-center items-center object-cover"
                />
                <MdPhotoCamera
                  color="#F58A27"
                  size={50}
                  className="absolute  right-[-10px] bottom-[-10px] lg:right-[0px] lg:bottom-[0px]"
                />
              </div>
            ) : (
              <div className="w-[120px] h-[120px] lg:w-[220px] lg:h-[220px]">
                <div
                  className={clsx(
                    "bg-[#f2f2f2] w-[120px] h-[120px] lg:w-[220px] lg:h-[220px] rounded-full flex justify-center items-center",
                    isError ? "border-error border-solid border-[1px]" : ""
                  )}
                ></div>
                <MdPhotoCamera
                  color="#F58A27"
                  size={50}
                  className="absolute right-[-10px] bottom-[-10px] lg:right-0 lg:bottom-0 "
                />
              </div>
            )}
          </picture>
          <input
            type="file"
            ref={refImage}
            style={{ display: "none" }}
            onChange={handleChange}
            accept="image/*"
          />
        </div>
      )}
      {isError && <p className="text-error text-sm p-2">{Error}</p>}
    </div>
  );
};

Photo.propTypes = {
  isError: PropTypes.bool.isRequired,
  Error: PropTypes.string.isRequired,
  directory: PropTypes.string.isRequired,
  register: PropTypes.any,
  name: PropTypes.string,
};

export default Photo;
