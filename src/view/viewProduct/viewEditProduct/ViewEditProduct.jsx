import { zodResolver } from "@hookform/resolvers/zod";
import { SchemaProduct } from "../../../schema/SchemaProduct";
import Header from "../../../components/Header/Header";
import TextField from "../../../components/Form/TextField/TextField";
import { FormProvider, useForm } from "react-hook-form";
import { IoArrowBackOutline } from "react-icons/io5";
import Button from "../../../components/Buttons/Button";
import { IoIosSave } from "react-icons/io";
import PhotoComponent from "../../../components/Photo/Photo";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  actualizarStatus,
  dataProduct,
} from "../../../store/slices/product/product_reducers";
import { Cookies } from "react-cookie";
import clsx from "clsx";
import TextArea from "../../../components/Form/TextArea/TextArea";

const ViewEditProduct = ({ productosState }) => {
  const methods = useForm({
    resolver: zodResolver(SchemaProduct),
    mode: "onChange",
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const { productos } = productosState;
  const cookie = new Cookies();
  const [isLoad, setIsLoad] = useState(false);
  const [product, setProduct] = useState({});
  const [proveedores, setProveedores] = useState([]);
  const [proveedor, setProveedor] = useState("");

  console.log(methods.formState.errors);

  useEffect(() => {
    const config = {
      method: "GET",
      url: `${import.meta.env.VITE_URL}/proveedor/obtener`,
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
        "Content-Type": "application/json",
      },
    };

    axios.request(config).then((response) => {
      setProveedores(response.data);
    });
  }, []);

  useEffect(() => {
    if (productos) {
      const editProducto = productos.find((p) => {
        if (p.idProducto === id) return p;
      });
      if (editProducto) {
        setProduct(editProducto);
        methods.setValue("urlImage", editProducto.urlImage);
        methods.setValue("nombre", editProducto.nombre);
        methods.setValue("cantidad", editProducto.cantidad);
        methods.setValue("stockMinimo", editProducto.stockMinimo);
        methods.setValue("costo", editProducto.costo);
        methods.setValue("precioMenudeo", editProducto.precioMenudeo);
        methods.setValue("precioMayoreo", editProducto.precioMayoreo);
        methods.setValue("descripcion", editProducto.descripcion);
      }
    }
  }, [productos, id, methods]);

  const onSubmit = (data) => {
    const dataSend = {
      ...data,
      idProducto: product.idProducto,
      codigo: product.codigo,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
      url: `${import.meta.env.VITE_URL}/producto/editar-producto?id=${id}`,
      data: dataSend,
    };

    setIsLoad(true);

    axios
      .request(config)
      .then((response) => {
        if (response.data === "Datos del producto guardados exitosamente") {
          navigate("/products");
        } else {
          toast.error("Error al editar el producto");
          setIsLoad(false);
        }
      })
      .catch(() => {
        toast.error("Error al editar el producto");
        setIsLoad(false);
      });
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col gap-1">
        <div className="flex flex-row justify-start items-center gap-2 w-full p-5">
          <IoArrowBackOutline size={32} onClick={() => navigate(-1)} />
          <p className="font-bold text-[18px]">Editar Producto</p>
        </div>

        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col justify-evenly items-center gap-5 lg:flex-row lg:items-start lg:justify-center"
        >
          <FormProvider {...methods}>
            <div className="my-5 lg:w-[300px]">
              <PhotoComponent
                Error={methods?.formState.errors?.urlImage?.message}
                isError={!!methods?.formState.errors?.urlImage?.message}
                directory={"productos"}
                name="urlImage"
                register={methods.register}
              />
            </div>

            <div className=" w-full lg:w-1/2 flex flex-col justify-center items-center gap-5 px-5">
              <TextField
                label="Nombre"
                name="nombre"
                type="text"
                placeholder="Nombre del producto"
                register={methods.register}
                Error={methods?.formState.errors?.nombre?.message}
                isError={!!methods?.formState.errors?.nombre?.message}
              />

              <label
                className={clsx(
                  "pl-2 w-full font-bold lg:text-[20px] text-black"
                )}
              >
                Seleccionar proveedor
              </label>
              {proveedores.length > 0 && (
                <select
                  className="border-[1px] border-solid border-black w-full h-[44px] outline-none shadow-md rounded-md p-1"
                  onChange={(event) => setProveedor(event.target.value)}
                  value={proveedor.idPersona}
                >
                  <option value="">Seleccionar</option>
                  {proveedores.map((proveedor) => (
                    <option
                      value={proveedor.idPersona}
                      key={proveedor.idPersona}
                    >
                      {proveedor.nombre}
                    </option>
                  ))}
                </select>
              )}

              <TextField
                label="Cantidad"
                name="cantidad"
                type="text"
                placeholder="Cantidad del producto"
                register={methods.register}
                Error={methods?.formState.errors?.cantidad?.message}
                isError={!!methods?.formState.errors?.cantidad?.message}
              />

              <TextField
                label="Stock mínimo"
                name="stockMinimo"
                type="text"
                placeholder="1"
                register={methods.register}
                Error={methods?.formState.errors?.stockMinimo?.message}
                isError={!!methods?.formState.errors?.stockMinimo?.message}
              />

              <TextField
                label="Costo"
                name="costo"
                type="text"
                placeholder="0.00"
                register={methods.register}
                Error={methods?.formState.errors?.costo?.message}
                isError={!!methods?.formState.errors?.costo?.message}
              />

              <TextField
                label="Precio a menudeo"
                name="precioMenudeo"
                type="text"
                placeholder="Precio del producto"
                register={methods.register}
                Error={methods?.formState.errors?.precioMenudeo?.message}
                isError={!!methods?.formState.errors?.precioMenudeo?.message}
              />

              <TextField
                label="Precio a mayoreo"
                name="precioMayoreo"
                type="text"
                placeholder="Precio del producto"
                register={methods.register}
                Error={methods?.formState.errors?.precioMayoreo?.message}
                isError={!!methods?.formState.errors?.precioMayoreo?.message}
              />

              <TextArea
                label="Descripción"
                name="descripcion"
                placeholder="Descripción del producto"
                isError={!!methods?.formState.errors?.descripcion?.message}
                error={methods?.formState.errors?.descripcion?.message}
                register={methods.register}
              />

              <div className="w-[200px] lg:w-[300px] lg:h-[50px] my-5">
                <Button
                  texto="Guardar"
                  background="bg-blue"
                  onClick={() => {}}
                  type="submit"
                  isLoading={isLoad}
                  isIcon={true}
                  Icon={<IoIosSave size={32} color="white" />}
                />
              </div>
            </div>
          </FormProvider>
        </form>
      </div>
    </div>
  );
};

ViewEditProduct.propTypes = {
  setDataProducts: PropTypes.func.isRequired,
  productosState: PropTypes.any,
  setStatus: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    productosState: state.productos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDataProducts: (data) => dispatch(dataProduct(data)),
    setStatus: (status) => dispatch(actualizarStatus(status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewEditProduct);
