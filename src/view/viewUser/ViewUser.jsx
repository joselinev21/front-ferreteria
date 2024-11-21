import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Cookies } from "react-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { dataUsuarios } from "../../store/slices/users/users_reducer";
import SupliearLoading from "../../components/Loadings/SuplierLoading/SuplierLoading";
import Modal from "../../components/Modal/Modal";
import { FaTrash, FaPlus } from "react-icons/fa";

const ViewUser = ({ setDataUsuarios, usuariosState, setStatus }) => {
  const cookie = new Cookies();
  const { usuarios } = usuariosState;
  const [isLoadingView, setIsLoadingView] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isSelectItem, setIsSelectItem] = useState(null);

  useEffect(() => {
    if (usuarios.length > 0) {
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
        "Content-Type": "application/json",
      },
      method: "GET",
      url: `${import.meta.env.VITE_URL}/usuario/obtener-usuarios`,
    };

    setIsLoadingView(true);
    axios
      .request(config)
      .then((response) => {
        setDataUsuarios(response.data);
        setIsLoadingView(false);
      })
      .catch(() => {
        toast.error("Error al obtener los usuarios");
        setIsLoadingView(false);
      });
  }, []);

  const handleDelete = () => {
    const config = {
      method: "PUT",
      url: `${import.meta.env.VITE_URL}/usuario/eliminar?idUsuario=${
        isSelectItem.idUsuario
      }`,
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
        "Content-Type": "application/json",
      },
    };

    setIsLoadingDelete(true);
    axios
      .request(config)
      .then((response) => {
        if (response.data === "Usuario eliminado") {
          const newItems =
            usuarios.length > 0 &&
            usuarios?.filter((i) => {
              return i.idUsuario !== isSelectItem.idUsuario;
            });
          setDataUsuarios(newItems);
          setIsSelectItem(null);
          setIsLoadingDelete(false);
          setShowModal(false);
          toast.success("Usuario eliminado correctamente");
        }
      })
      .catch((err) => {
        console.log(err);

        toast.error("Error al eliminar el usuario");
        setShowModal(false);
      });
  };

  return (
    <>
      {showModal && (
        <div className="absolute z-50 flex justify-center items-center w-screen h-screen bg-black/50">
          <Modal
            text="¿Estás seguro de que deseas eliminar el usuario?"
            onDelete={handleDelete}
            onCancel={() => setShowModal(false)}
            isLoading={isLoadingDelete}
          />
        </div>
      )}

      <Header />

      {isLoadingView && (
        <div className="w-screen h-screen absolute">
          <SupliearLoading />
        </div>
      )}

      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row justify-between items-center p-5 w-full">
          <p className="font-bold text-[24px]">Usuarios</p>

          <div className="flex flex-row items-center gap-3">
            <FaTrash
              onClick={() => {
                isSelectItem && setShowModal(true);
              }}
              color={isSelectItem ? "red" : "gray"}
              size={24}
              className="cursor-pointer"
            />

            <div className="bg-F58A27 rounded-md text-white flex flex-row justify-center items-center p-1 gap-1 cursor-pointer">
              <a
                href="/add-user"
                className="flex flex-row justify-center items-center"
              >
                <FaPlus size={32} color="white" />
                <p className="hidden lg:flex">Agregar Usuario</p>
              </a>
            </div>
          </div>
        </div>

        <div className="w-[90%]">
          <table className="w-full">
            <thead className="w-full">
              <tr className="w-full">
                <th>Nombre</th>
                <th>Teléfono</th>
                <th className="hidden lg:table-cell">Correo</th>
                <th className="hidden lg:table-cell">RFC</th>
                <th>Sueldo</th>
                <th>Usuario</th>
              </tr>
            </thead>
            <tbody>
              {usuarios?.map((user) => (
                <tr
                  key={user?.usuario}
                  className={`border-solid border-black/30 border-b-[1px] p-2 text-center ${
                    isSelectItem === user ? "bg-black/10" : ""
                  }`}
                  onClick={() => setIsSelectItem(user)}
                >
                  <td>{user?.nombre}</td>
                  <td>{user?.telefono}</td>
                  <td className="hidden lg:table-cell">{user?.correo}</td>
                  <td className="hidden lg:table-cell">{user?.rfc}</td>
                  <td>{user?.sueldo}</td>
                  <td>{user?.usuario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

ViewUser.propTypes = {
  setDataUsuarios: PropTypes.func.isRequired,
  usuariosState: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    usuariosState: state.usuarios,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDataUsuarios: (data) => dispatch(dataUsuarios(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewUser);
