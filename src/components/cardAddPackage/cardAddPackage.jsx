import { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";

const Card = ({ urlImage, onClick }) => {
  const [isSelect, setIsSelect] = useState(false);
  return (
    <div
      onClick={() => {
        onClick();
        setIsSelect(!isSelect);
      }}
      className="relative flex-shrink-0 w-[80px] h-[80px] lg:w-[120px] lg:h-[120px] bg-gray-200 rounded-full shadow-lg"
    >
      <img
        src={urlImage}
        className="w-full h-full object-cover rounded-full"
        alt="Producto"
      />
      <div className="absolute bottom-2 right-2 lg:bottom52 lg:right-5 transform translate-x-1/2 translate-y-1/2">
        {isSelect ? (
          <FaCheckCircle size={32} className="text-[#F58A27]" />
        ) : (
          <IoAddCircleOutline size={32} className="text-[#F58A27]" />
        )}
      </div>
    </div>
  );
};

export default Card;
