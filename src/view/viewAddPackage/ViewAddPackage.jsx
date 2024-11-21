import Header from "../../components/Header/Header";
import { IoArrowBackOutline } from "react-icons/io5";
import { FormProvider, useForm } from "react-hook-form";
import Card from "../../components/cardAddPackage/cardAddPackage";
import TextField from "../../components/Form/TextField/TextField";
import TextArea from "../../components/Form/TextArea/TextArea";
import Button from "../../components/Buttons/Button";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  actualizarStatus,
  dataProduct,
} from "../../store/slices/product/product_reducers";
import axios from "axios";
import toast from "react-hot-toast";
import { Cookies } from "react-cookie";
import { zodResolver } from "@hookform/resolvers/zod";
import { SchemaPackage } from "../../schema/SchemaPackage";
import { useNavigate } from "react-router-dom";
import SuplierLoading from "../../components/Loadings/SuplierLoading/SuplierLoading";

const ViewAddPackage = ({ setStatus, setDataProducts, products }) => {
  const methods = useForm({
    resolver: zodResolver(SchemaPackage),
    mode: "onChange",
  });
  const cookie = new Cookies();
  const { productos } = products;
  const [listProducts, setListProducts] = useState([]);
  const navigate = useNavigate();
  const [isLoadingSubmmit, setIsLoadingSubmit] = useState(false);
  const [isLoadinView, setIsLoadingView] = useState(false);

  const addProductsToList = (p) => {
    const productExists = listProducts.find(
      (product) => product.idProducto === p.idProducto
    );
    if (productExists) {
      setListProducts(
        listProducts.filter((product) => product.idProducto !== p.idProducto)
      );
    } else {
      setListProducts([...listProducts, p]);
    }
  };

  useEffect(() => {
    if (productos.length > 0) {
      return;
    }
    setIsLoadingView(true);
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
        setIsLoadingView(false);
      })
      .catch(() => {
        setIsLoadingView(false);
        toast.error("Error al obtener los productos");
        setStatus("error");
      });
  }, [setDataProducts, setStatus]);

  const handleSubmit = (data) => {
    if (listProducts.length === 0) {
      toast.error("Debes seleccionar al menos un producto");
      return;
    }
    setIsLoadingSubmit(true);

    const information = {
      nombre: data.nombre,
      precio: data.precio,
      descripcion: data.descripcion,
      productos: listProducts,
    };

    const config = {
      method: "POST",
      url: `${import.meta.env.VITE_URL}/paquete/agregar`,
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
        "Content-Type": "application/json",
      },
      data: information,
      body: JSON.stringify(information),
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data === "Paquete agregado exitosamente") {
          toast.success("Paquete creado exitosamente");
          navigate("/list-package");
        }
      })
      .catch(() => {
        setIsLoadingSubmit(false);
        toast.error("Error al crear el paquete");
      });
  };

  return (
    <>
      {isLoadinView && (
        <div className="h-screen bg-white/60  w-screen relative">
          <SuplierLoading />ƒ
        </div>
      )}

      <Header />

      <div className="p-5 lg:w-[90%] mx-auto">
        <div className="flex flex-row justify-start items-center gap-2 font-bold">
          <IoArrowBackOutline
            onClick={() => navigate(-1)}
            size={28}
            color="black"
          />
          <h1>Crear Paquete</h1>
        </div>

        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="flex flex-col justify-center items-center gap-5 my-5 lg:w-[80%] lg:mx-auto"
        >
          <FormProvider {...methods}>
            <TextField
              name="nombre"
              label="Nombre del paquete"
              placeholder="Nombre"
              isError={!!methods.formState.errors.nombre}
              Error={methods.formState.errors.nombre?.message}
              register={methods.register}
              type="text"
              Icon={null}
              isIcon={false}
            />
            <TextField
              name="precio"
              label="Precio del paquete"
              placeholder="$000.00"
              isError={!!methods.formState.errors.precio}
              Error={methods.formState.errors.precio?.message}
              register={methods.register}
              type="number"
              Icon={null}
              isIcon={false}
            />

            <TextArea
              isError={!!methods.formState.errors.descripcion}
              error={methods.formState.errors.descripcion?.message}
              register={methods.register}
              name="descripcion"
              label="Descripción"
              placeholder={"Descripción del paquete"}
            />

            <div className="w-full">
              <p className="font-bold lg:text-[22px]">Productos</p>

              <div className="flex overflow-y-auto gap-5 p-4 whitespace-nowrap">
                {productos.map((producto, index) => (
                  <Card
                    onClick={() => addProductsToList(producto)}
                    key={index}
                    urlImage={producto.urlImage}
                    name={producto.nombre}
                    id={producto.idProducto}
                  />
                ))}
              </div>
            </div>

            <div className="w-full my-5">
              <p className="font-bold lg:text-[22px]">
                Lista del Productos Seleccionados
              </p>
              <ol>
                {listProducts.map((product, index) => (
                  <li className="px-5" key={index}>
                    {product.nombre}
                  </li>
                ))}
              </ol>
            </div>

            <div className="my-5 w-full h-[40px] lg:h-[50px] lg:w-[50%]">
              <Button
                background="bg-[#F58A27]"
                text="Crear Paquete"
                isIcon={false}
                texto="Crear Paquete"
                type="submit"
                Icon={null}
                onClick={() => {}}
                isLoading={isLoadingSubmmit}
              />
            </div>
          </FormProvider>
        </form>
      </div>
    </>
  );
};

ViewAddPackage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewAddPackage);
