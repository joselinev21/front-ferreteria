import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const CardPresentationProject = ({ proyecto, showModal, changeStateID }) => {
  const {
    idProyecto,
    nombre,
    telefono,
    correo,
    rfc,
    calle_persona,
    numero_persona,
    colonia_persona,
    ciudad_persona,
    calle_proyecto,
    numero_proyecto,
    colonia_proyecto,
    ciudad_proyecto,
  } = proyecto;

  const handleClic = () => {
    changeStateID(idProyecto);
    showModal();
  };

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-project/${idProyecto}`);
  }

  return (
    <div className="bg-white rounded-md shadow-md w-[90%] p-5 flex flex-row justify-between items-center">
      <div className="w-[50%]">
        <p className="text-[18px] lg:text-[24px] font-bold">Proyecto #1</p>
        <article className="">
          <h3 className="font-bold mb-5">Encargado</h3>
          <p>Nombre: {nombre || "N/A"}</p>
          <p>Teléfono: {telefono || "N/A"} </p>
          <p>Correo: {correo || "N/A"}</p>
          <p>RFC: {rfc || "N/A"}</p>
        </article>
      </div>

      <div className="w-[50%]">
        <div>
          <article>
            <h3 className="font-bold text-[15px]">Dirección del encargado</h3>
            <p className="text-[12px]">
              {calle_persona || "N/A"} {numero_persona || "N/A"}{" "}
              {colonia_persona || "N/A"} {ciudad_persona || "N/A"}
            </p>
          </article>

          <article>
            <h3 className="font-bold text-[15px]">Dirección del Proyecto</h3>
            <p className="text-[12px]">
              {calle_proyecto || "N/A"} {numero_proyecto || "N/A"}{" "}
              {colonia_proyecto || "N/A"} {ciudad_proyecto || "N/A"}
            </p>
          </article>
        </div>

        <div className="flex flex-row justify-end items-center gap-4 my-5">
          <MdDelete
            onClick={handleClic}
            size={32}
            color="black"
            className="cursor-pointer"
          />
          <MdEdit onClick={handleEdit} size={32} color="black" className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default CardPresentationProject;
