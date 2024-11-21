import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { FaTrash, FaPen, FaPlus } from "react-icons/fa"; // Íconos de editar y borrar
import { FaBoxOpen } from "react-icons/fa"; // Ícono de la caja
import { Cookies } from "react-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "../../components/Modal/Modal";
import {
  dataPaquetes,
  updateStatus,
} from "../../store/slices/package/package_reducers";
import SuplierLoading from "../../components/Loadings/SuplierLoading/SuplierLoading";

const ViewListPackage = ({ setDataPaquetes, setStatus, paquetesState }) => {
  const cookie = new Cookies();
  const { paquetes } = paquetesState;
  const [isLoadinView, setIsLoadingView] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [idDeltePackage, setIdDeletePackage] = useState("");
  const [isLoadingDelte, setIsLoadingDelete] = useState(false);

  useEffect(() => {
    const config = {
      method: "GET",
      url: `${import.meta.env.VITE_URL}/producto-paquete/obtener`,
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
        "Content-Type": "application/json",
      },
    };

    setIsLoadingView(true);
    setStatus("loading");
    axios
      .request(config)
      .then((response) => {
        if (response.status === 200) {
          const paquetesUnicos = response.data.reduce((acc, item) => {
            const { idPaquete, nombre, descripcion, precio, idProducto } = item;

            if (!acc[idPaquete]) {
              acc[idPaquete] = {
                idPaquete,
                nombre,
                descripcion,
                precio,
                productos: [],
              };
            }
            acc[idPaquete].productos.push(nombre);
            return acc;
          }, {});
          const paquetesFormateados = Object.values(paquetesUnicos);

          setDataPaquetes(paquetesFormateados);
          setStatus("succeeded");
          setIsLoadingView(false);
        }
      })
      .catch(() => {
        setIsLoadingView(false);
        setStatus("error");
        toast.error("Error al obtener los paquetes");
      });
  }, [setStatus]);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleDelete = () => {
    const config = {
      method: "DELETE",
      url: `${
        import.meta.env.VITE_URL
      }/paquete/eliminar?idPaquete=${idDeltePackage}`,
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
        "Content-Type": "application/json",
      },
    };

    setIsLoadingDelete(true);

    axios
      .request(config)
      .then((response) => {
        if (response.data === "Paquete eliminado exitosamente") {
          const newItems =
            paquetes.length > 0 &&
            paquetes?.filter((i) => {
              return i.idPaquete !== idDeltePackage;
            });
          setIsLoadingDelete(false);
          setShowModal(false);
          setDataPaquetes(newItems);
          setStatus("success");
          toast.success("Paquete eliminado exitosamente");
        }
      })
      .catch(() => {
        setIsLoadingDelete(false);
        toast.error("Error al eliminar el paquete");
      });
  };

  return (
    <div>
      {showModal && (
        <div className="absolute z-50 flex justify-center items-center w-screen h-screen bg-black/50">
          <Modal
            text="¿Estás seguro de que deseas eliminar el producto?"
            onDelete={handleDelete}
            onCancel={() => {
              setShowModal(false);
            }}
            isLoading={isLoadingDelte}
          />
        </div>
      )}

      <Header />

      {isLoadinView && <SuplierLoading />}

      <div className="flex flex-col w-full max-w-[2000px] mx-auto">
        <div className="flex items-center m-5">
          <h2 className="font-bold text-2xl ml-4">Paquetes</h2>
          <div className="w-full flex justify-end px-5">
            <a
              href="/add-package"
              className="flex flex-row gap-1 bg-primary text-white p-2 rounded-md"
            >
              <FaPlus size={24} color="white" />
              <p className="hidden lg:flex">Agregar Paquete</p>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5 bg-gray-100 mx-auto justify-center w-full">
          {paquetes &&
            paquetes.length > 0 &&
            paquetes.map((p, index) => {
              return (
                <div
                  key={index}
                  className="w-[300px] lg:w-[400px] shadow-md rounded-md p-5 flex flex-col gap-5 justify-between items-center"
                >
                  <div className="flex flex-row justify-between items-center w-full">
                    <p>{"Paquete " + (index + 1)}</p>
                    <FaBoxOpen color="#F58A27" size={32} />
                  </div>
                  <div className="flex flex-row justify-between items-center w-full">
                    <div>
                      <p>Lista de Productos</p>
                      <ul>
                        {p.productos.map((producto, idx) => (
                          <li key={idx}>{producto}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="font-bold">Descripción</p>
                      <p>{p.descripcion}</p>
                    </div>
                  </div>

                  <div className="flex flex-row justify-between items-center w-full">
                    <div className="flex flex-row justify-center items-center gap-4">
                      {cookie.get("rol") !== "Vendedor" ? (
                        <FaTrash
                          onClick={() => {
                            setIdDeletePackage(p.idPaquete);
                            handleShowModal();
                          }}
                          color="#F58A27"
                          size={24}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    <p className="font-bold">Precio: ${p.precio}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

ViewListPackage.propTypes = {
  setDataPaquetes: PropTypes.func,
  setStatus: PropTypes.func,
  paquetesState: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    paquetesState: state.paquetes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDataPaquetes: (data) => dispatch(dataPaquetes(data)),
    setStatus: (status) => dispatch(updateStatus(status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewListPackage);
