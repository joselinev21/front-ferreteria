import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { SchemaProduct } from "../../../schema/SchemaProduct";
import Header from "../../../components/Header/Header";
import TextField from "../../../components/Form/TextField/TextField";
import PhotoComponent from "../../../components/Photo/Photo";
import { IoArrowBackOutline } from "react-icons/io5";
import Button from "../../../components/Buttons/Button";
import { IoIosSave } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import TextArea from "../../../components/Form/TextArea/TextArea";
import { Cookies } from "react-cookie";
import { useEffect, useState } from "react";
import clsx from "clsx";
import SuplierLoading from "../../../components/Loadings/SuplierLoading/SuplierLoading";

const ViewCreateProduct = () => {
  const methods = useForm({
    resolver: zodResolver(SchemaProduct),
    mode: "onChange",
  });
  const navigate = useNavigate();
  const cookie = new Cookies();
  const [proveedores, setProveedores] = useState([]);
  const [proveedor, setProveedor] = useState("");
  const [isLoadingView, setIsLoadingView] = useState(false);

  const onSubmit = (data) => {
    if (proveedor === "") {
      toast.error("Selecciona un proveedor");
      return;
    }
    

    const dataToSend = {
      ...data,
      idPersona: proveedor,
    };

    console.log(dataToSend);
    

    const config = {
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      url: `${import.meta.env.VITE_URL}/producto/agregar-producto`,
      data: dataToSend,
    };
    

    axios
      .request(config)
      .then((response) => {
        if (response.data === "Producto agregado correctamente") {
          toast.success(response.data);
          navigate("/products");
        } else {
          toast.error("Error al agregar el producto");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const config = {
      method: "GET",
      url: `${import.meta.env.VITE_URL}/proveedor/obtener`,
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
        "Content-Type": "application/json",
      },
    };

    setIsLoadingView(true);
    axios
      .request(config)
      .then((response) => {
        setProveedores(response.data);
        setIsLoadingView(false);
      })
      .catch(() => {
        toast.error("Error al obtener los proveedores");
        setIsLoadingView(false);
      });
  }, []);

  const backPage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(-1);
  };

  return (
    <div>
      <Header />

      <div className="flex flex-col gap-1">
        {isLoadingView && (
          <div className="w-screen h-screen absolute">{<SuplierLoading />}</div>
        )}

        <div className="flex flex-row justify-start items-center gap-1 my-5 lg:pl-5 cursor-pointer">
          <IoArrowBackOutline
            className="font-bold"
            size={32}
            color={"black"}
            onClick={backPage}
          />
          <h2 className="font-bold text-[18px] lg:text-[22px]">
            Crear Producto
          </h2>
        </div>

        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col justify-evenly items-center gap-5 lg:flex-row lg:items-start lg:justify-center"
        >
          <FormProvider {...methods}>
            <div className="my-5 lg:w-[300px]">
              <PhotoComponent
                Error={methods?.formState?.errors?.urlImage?.message | ""}
                isError={
                  methods?.formState?.errors?.urlImage?.message ? true : false
                }
                directory={"productos"}
                register={methods.register}
                name={"urlImage"}
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
                  onChange={() => setProveedor(event.target.value)}
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
                placeholder="1, 4.5kg, etc."
                register={methods.register}
                Error={methods?.formState.errors?.stockMinimo?.message}
                isError={!!methods?.formState.errors?.stockMinimo?.message}
              />
              <TextField
                label="Costo"
                name="costo"
                type="text"
                placeholder="Costo del producto"
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

export default ViewCreateProduct;
