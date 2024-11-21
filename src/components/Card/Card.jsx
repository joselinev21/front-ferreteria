import PropTypes from "prop-types";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaTruck } from "react-icons/fa";

const Card = ({ nombre, telefono, correo, id, direccion }) => {
  return (
    <div
      key={id}
      className="shadow-md rounded-md p-5  flex flex-col gap-5 w-[300px]"
    >
      <div className="flex flex-row justify-between items-center">
        <article>
          <h2 className="font-bold text-[20px]">Empresa</h2>
          <p className="text-[16px]">{nombre}</p>
          <p className="text-[16px]">{direccion}</p>
        </article>

        <div className="flex gap-3 flex-col">
          <FaPhone className="cursor-pointer" size={28} color="#F58A27" />
          <MdEmail className="cursor-pointer" size={28} color="#F58A27" />
        </div>
      </div>

      <div className="flex flex-row justify-between items-center">
        <FaTruck className="cursor-pointer" size={32} color="#F58A27" />

        <div className="flex flex-row gap-1">
          <MdEdit className="cursor-pointer" size={32} color="#F58A27" />
          <MdDelete className="cursor-pointer" size={32} color="#F58A27" />
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  nombre: PropTypes.string.isRequired,
  telefono: PropTypes.string.isRequired,
  correo: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  direccion: PropTypes.string.isRequired,
};

export default Card;
