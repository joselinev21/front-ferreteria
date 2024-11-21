import Header from "../../components/Header/Header";
import TextField from "../../components/Form/TextField/TextField";
import Modal from "../../components/Modal/Modal";

import axios from "axios";
import toast from "react-hot-toast";
import clsx from "clsx";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  dataProduct,
  actualizarStatus,
} from "../../store/slices/product/product_reducers";

import { FormProvider, useForm } from "react-hook-form";
import { IoIosSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { Cookies } from "react-cookie";
import SuplierLoading from "../../components/Loadings/SuplierLoading/SuplierLoading";

const ViewProducts = ({ setDataProducts, products, setStatus }) => {
  const methods = useForm();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { productos } = products;
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const cookie = new Cookies();
  const [isLoadinView, setIsLoadinView] = useState(true);

  const productosFiltrados = productos?.filter((product) =>
    product.nombre
      ?.toLowerCase()
      .includes(methods.watch("buscador")?.toLowerCase())
  );

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
        "Content-Type": "application/json",
      },
      method: "GET",
      url: `${import.meta.env.VITE_URL}/producto/obtener-productos`,
    };

    setStatus("loading");
    axios
      .request(config)
      .then((response) => {
        setDataProducts(response.data);
        setStatus("succeeded");
        setIsLoadinView(false);
      })
      .catch(() => {
        toast.error("Error al obtener los productos");
        setStatus("error");
      });
  }, [setDataProducts, setStatus]);

  const handleDelte = () => {
    if (!selectedProduct) return;
    const config = {
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
      url: `${import.meta.env.VITE_URL}/producto/eliminar-producto?id=${
        selectedProduct.idProducto
      }`,
    };

    setStatus("loading");
    axios
      .request(config)
      .then((res) => {
        if (res.status === 200) {
          const newItems = productos?.filter((i) => {
            return i.idProducto !== selectedProduct.idProducto;
          });
          setDataProducts(newItems);
          setStatus("success");
          setSelectedProduct(null);
          setShowModal(false);
          toast.success("Producto eliminado correctamente");
        } else {
          toast.error("Error al eliminar el producto");
          setStatus("error");
        }
      })
      .catch(() => {
        toast.error("Error al eliminar el producto");
      });
  };

  const handleEdit = () => {
    if (!selectedProduct) return;
    navigate(`/edit-product/${selectedProduct.idProducto}`);
  };

  return (
    <>
      <Header />

      {showModal && (
        <div className="absolute z-50 flex justify-center items-center w-screen h-screen bg-black/50">
          <Modal
            text="¿Estás seguro de que deseas eliminar el producto?"
            onDelete={handleDelte}
            onCancel={() => {
              setShowModal(false);
            }}
          />
        </div>
      )}

      <div className="relative p-5 w-full h-full">
        {isLoadinView && (
          <div className="h-screen bg-white/60  w-screen absolute">
            <SuplierLoading />
          </div>
        )}

        <h2 className="font-bold text-[18px] lg:text-[22px] w-full">
          Productos
        </h2>

        <div className="flex justify-center items-center flex-col gap-5 max-w-[1200px] mx-auto">
          <form className="w-[320px] lg:w-[600px]">
            <FormProvider {...methods}>
              <TextField
                placeholder="Buscar producto"
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

          <div className="w-full flex flex-row justify-between items-center">
            <div className="flex flex-row items-center justify-start">
              <MdModeEdit
                onClick={handleEdit}
                className="cursor-pointer"
                size={32}
                color={clsx(selectedProduct ? "black" : "gray")}
              />
              <MdDelete
                onClick={() => {
                  setShowModal(true);
                }}
                className="cursor-pointer"
                size={32}
                color={clsx(selectedProduct ? "black" : "gray")}
              />
            </div>

            <div className="bg-F58A27 rounded-md text-white flex flex-row justify-center items-center p-1 gap-1 cursor-pointer">
              <a
                href="/create-product"
                className="flex flex-row justify-center items-center"
              >
                <FaPlus size={32} color="white" />
                <p className="hidden lg:flex">Agregar Producto</p>
              </a>
            </div>
          </div>

          <div className="w-full flex flex-row justify-center items-start gap-5">
            <table className="w-full lg:w-[80%]">
              <thead>
                <tr className="table-row">
                  <th className="border-solid border-[#d2d2d2] border-[1px]">
                    Foto
                  </th>
                  <th className="border-solid border-[#d2d2d2] border-[1px]">
                    Nombre
                  </th>
                  <th className="border-solid border-[#d2d2d2] border-[1px]">
                    Cantidad Disponible
                  </th>
                  <th className="border-solid border-[#d2d2d2] border-[1px]">
                    Costo
                  </th>
                  <th className="border-solid border-[#d2d2d2] border-[1px] hidden lg:table-cell">
                    Precio menudeo
                  </th>
                  <th className="border-solid border-[#d2d2d2] border-[1px] hidden lg:table-cell">
                    Precio mayoreo
                  </th>
                </tr>
              </thead>

              <tbody>
                {productosFiltrados?.map((product, index) => {
                  return (
                    <tr
                      key={index}
                      className={clsx(
                        "table-row",
                        product.idProducto === selectedProduct?.idProducto &&
                          "bg-[#ececec]"
                      )}
                      onClick={() => {
                        setSelectedProduct(product);
                      }}
                    >
                      <td className="border-solid border-[#d2d2d2] border-[1px] text-center flex justify-center items-center p-2">
                        <img
                          src={product.urlImage}
                          className="w-[50px] h-[50px] lg:w-[80px] lg:h-[80px] object-contain rounded-md"
                        />
                      </td>
                      <td className="border-solid border-[#d2d2d2] border-[1px] text-center ">
                        {product.nombre}
                      </td>
                      <td className="border-solid border-[#d2d2d2] border-[1px] text-center ">
                        {product.cantidad}
                      </td>
                      <td className="border-solid border-[#d2d2d2] border-[1px] text-center ">
                        {product.costo}
                      </td>
                      <td className="border-solid border-[#d2d2d2] border-[1px] text-center  hidden lg:table-cell">
                        {product.precioMenudeo}
                      </td>
                      <td className="border-solid border-[#d2d2d2] border-[1px] text-center  hidden lg:table-cell">
                        {product.precioMayoreo}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {selectedProduct !== null ? (
              <div className="bg-primary h-[700px] max-h-[600px] place-items-center rounded-md p-5 text-white hidden lg:block">
                <div className="flex flex-row justify-between items-center">
                  <div>
                    <h2 className="font-bold text-[22px] my-1">
                      Información del Producto
                    </h2>
                    <h2>Nombre: {selectedProduct?.nombre}</h2>
                    <p>Cantidad disponible: {selectedProduct?.cantidad}</p>
                    <p>Costo de proveedor: ${selectedProduct?.costo}</p>
                    <p>Precio por menudeo: ${selectedProduct?.precioMenudeo}</p>
                    <p>Precio por mayoreo: ${selectedProduct?.precioMayoreo}</p>
                  </div>

                  <img
                    src={selectedProduct?.urlImage}
                    className="w-[120px] h-[120px] rounded-md"
                  />
                </div>

                <div className="flex flex-col justify-start items-start w-full">
                  <h2 className="font-bold text-[22px] my-1">
                    Información del Proveedor
                  </h2>
                  <h2>
                    Nombre del Proveedor: {selectedProduct?.nombrePersona}
                  </h2>
                  <p>Teléfono: {selectedProduct?.telefono}</p>
                  <p>Correo: {selectedProduct?.correo}</p>
                </div>
              </div>
            ) : (
              <div className="bg-primary h-[700px] max-h-[600px] place-items-center rounded-sm lg:flex justify-center items-center hidden">
                <h2 className="text-white text-[30px] font-bold text-center">
                  Debes seleccionar un producto
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

ViewProducts.propTypes = {
  setDataProducts: PropTypes.func.isRequired,
  products: PropTypes.any,
  setStatus: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    products: state.productos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDataProducts: (data) => dispatch(dataProduct(data)),
    setStatus: (status) => dispatch(actualizarStatus(status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewProducts);
