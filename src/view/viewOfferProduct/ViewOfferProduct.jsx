import Header from "../../components/Header/Header";
import { IoArrowBackOutline } from "react-icons/io5";
import { FormProvider, useForm } from "react-hook-form";
import Card from "../../components/cardAddPackage/cardAddPackage";
import TextField from "../../components/Form/TextField/TextField";
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
import { SchemaOffer } from "../../schema/SchemaPackage";
import { useNavigate } from "react-router-dom";
import SuplierLoading from "../../components/Loadings/SuplierLoading/SuplierLoading";

const ViewOfferProduct = ({ setStatus, setDataProducts, products }) => {
  const methods = useForm({
    resolver: zodResolver(SchemaOffer),
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
    if (listProducts.length !== 1) {
      toast.error("Solo puedes seleccionar un producto");
      return;
    }

    setIsLoadingSubmit(true);

    const information = {
      fechaFinal: data.fechaFinal,
      precio: data.precio,
      idProducto: listProducts[0].idProducto,
    };

    const config = {
      method: "POST",
      url: `${import.meta.env.VITE_URL}/oferta/agregar`,
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
        if (response.data === "Oferta agregada correctamente") {
          toast.success("Oferta creado exitosamente");
          navigate("/offers");
        }
      })
      .catch(() => {
        setIsLoadingSubmit(false);
        toast.error("Error al crear la oferta");
      });
  };

  return (
    <>
      <Header />

      <div className="p-5 lg:w-[90%] mx-auto">
        {isLoadinView && (
          <div className="h-screen bg-white/60  w-screen absolute">
            <SuplierLoading />ƒ
          </div>
        )}
        <div className="flex flex-row justify-start items-center gap-2 font-bold">
          <IoArrowBackOutline
            onClick={() => navigate(-1)}
            size={28}
            color="black"
          />
          <h1>Crear Oferta</h1>
        </div>

        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="flex flex-col justify-center items-center gap-5 my-5 lg:w-[80%] lg:mx-auto"
        >
          <FormProvider {...methods}>
            <TextField
              name="fechaFinal"
              label="Fecha de Finalización"
              placeholder="Fecha de Finalización"
              isError={!!methods.formState.errors.fechaFinal}
              Error={methods.formState.errors.fechaFinal?.message}
              register={methods.register}
              type="date"
              Icon={null}
              isIcon={false}
            />
            <TextField
              name="precio"
              label="Precio de la oferta"
              placeholder="$500.00"
              isError={!!methods.formState.errors.precio}
              Error={methods.formState.errors.precio?.message}
              register={methods.register}
              type="number"
              Icon={null}
              isIcon={false}
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

            <div className="my-5 w-full h-[40px] lg:h-[50px] lg:w-[50%]">
              <Button
                background="bg-[#F58A27]"
                text="Crear Paquete"
                isIcon={false}
                texto="Crear Oferta"
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

ViewOfferProduct.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewOfferProduct);
