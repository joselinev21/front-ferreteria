import { IoIosCloseCircle } from "react-icons/io";

const CardItemProduct = ({ urlImage, cantidad, precioUnitario }) => {
  const total = cantidad * precioUnitario;
  return (
    <div className="flex flex-row justify-evenly items-center gap-5 text-center">
      <img
        src={urlImage}
        className="w-[40px] h-[40px] border-[1px] border-solid border-black rounded-md"
      />

      <div>
        <p className="font-bold">Cantidad</p>
        <p>{cantidad}</p>
      </div>

      <div>
        <p className="font-bold">Precio</p>
        <p>${precioUnitario}</p>
      </div>

      <div>
        <p className="font-bold">Precio Total</p>
        <p>${total}</p>
      </div>

      <IoIosCloseCircle color="red" size={32} />
    </div>
  );
};

export default CardItemProduct;
