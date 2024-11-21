import Header from "../../components/Header/Header";
import { FormProvider, useForm } from "react-hook-form";
import TextField from "../../components/Form/TextField/TextField";
import { IoIosSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import Card from "../../components/cardSuplier/cardSuplier";
import Modal from "../../components/Modal/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  dataProveedores,
  updateStatus,
} from "../../store/slices/proveedor/proveedor_reducers";
import { Cookies } from "react-cookie";
import SuplierLoading from "../../components/Loadings/SuplierLoading/SuplierLoading";

const ViewListSuplier = ({
  setDataProveedores,
  setStatus,
  proveedoresState,
}) => {
  const methods = useForm();
  const [openModal, setOpenModal] = useState(false);
  const { proveedores } = proveedoresState;
  const [idSelectSuplier, setIdSelectSuplier] = useState(null);
  const cookie = new Cookies();
  const [isLoading, setIsLoading] = useState(true);

  const filterProveedor = proveedores.filter((proveedor) => {
    return proveedor.nombre
      .toLowerCase()
      .includes(methods.watch("buscador")?.toLowerCase());
  });

  useEffect(() => {
    setStatus("loading");
    const config = {
      method: "GET",
      url: `${import.meta.env.VITE_URL}/proveedor/obtener`,
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data == null) {
          toast.error("No hay proveedores registrados");
        } else {
          setStatus("succeeded");
          setDataProveedores(response.data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        setStatus("error");
        toast.error("Error al cargar los proveedores");
      });
  }, [setDataProveedores, setStatus]);

  const handleDeleteSuplier = () => {
    const config = {
      method: "DELETE",
      url: `${
        import.meta.env.VITE_URL
      }/proveedor/eliminar?id=${idSelectSuplier}`,
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((data) => {
        if (data.data.message === "Proveedor eliminado correctamente") {
          const newItems =
            proveedores.length > 0 &&
            proveedores?.filter((i) => {
              return i.idPersona !== idSelectSuplier;
            });
          setDataProveedores(newItems);
          setStatus("success");
          setOpenModal(false);
          toast.success("Proveedor eliminado correctamente");
        }
      })
      .catch(() => {
        toast.error("Error al eliminar el proveedor");
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center relative">
      {isLoading && <SuplierLoading />}

      <Header />

      {openModal && (
        <div className="absolute w-screen z-50 h-screen bg-[#000]/60 flex justify-center items-center">
          <Modal
            onCancel={() => {
              setOpenModal(false);
            }}
            onDelete={handleDeleteSuplier}
            text="¿Desea borrar al proveedor?"
          />
        </div>
      )}

      <div className="flex flex-col justify-center items-center p-5 w-full mx-auto">
        <div className="w-full text-left">
          <p className="font-bold text-[18px]">Proveedores</p>
        </div>

        <div className="w-full px-5 my-5 text-center">
          <p className="font-bold text-[18px] mb-3">Busca tu proveedor</p>
          <form className="w-[320px] lg:w-[600px] mx-auto">
            <FormProvider {...methods}>
              <TextField
                placeholder="Buscar proveedor"
                isError={!!methods.formState.errors.search}
                Error={methods.formState.errors.search?.message}
                register={methods.register}
                name="buscador"
                type="text"
                isIcon={true}
                Icon={<IoIosSearch size={32} color="black" />}
              />
            </FormProvider>
          </form>
        </div>

        <div className="w-full flex justify-end px-5">
          <a
            href="/create-suplier"
            className="flex flex-row gap-1 bg-primary text-white p-2 rounded-md"
          >
            <FaPlus size={24} color="white" />
            <p className="hidden lg:flex">Agregar Proveedor</p>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5 bg-gray-100 w-full mx-auto justify-center">
          {filterProveedor.length > 0 &&
            filterProveedor?.map((proveedor, index) => {
              return (
                <Card
                  key={index}
                  nombre={proveedor.nombre}
                  telefono={proveedor.telefono}
                  correo={proveedor.correo}
                  id={proveedor.idPersona}
                  direccion={
                    proveedor.calle +
                    " #" +
                    proveedor.numero +
                    " " +
                    proveedor.colonia +
                    ", " +
                    proveedor.ciudad
                  }
                  handleModal={() => {
                    setOpenModal(true);
                    setIdSelectSuplier(proveedor.idPersona);
                  }}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

ViewListSuplier.propTypes = {
  setDataProveedores: PropTypes.func,
  setStatus: PropTypes.func,
  proveedoresState: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    proveedoresState: state.proveedores,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDataProveedores: (data) => dispatch(dataProveedores(data)),
    setStatus: (status) => dispatch(updateStatus(status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewListSuplier);
