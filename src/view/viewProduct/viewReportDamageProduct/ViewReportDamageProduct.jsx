import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import Header from "../../../components/Header/Header";
import TextArea from "../../../components/Form/TextArea/TextArea";
import PhotoComponent from "../../../components/Photo/Photo";
import Button from "../../../components/Buttons/Button";
import { IoIosSave } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { SchemaReportDamage } from "../../../schema/SchemaReportDamage";
import { Cookies } from "react-cookie";
import { useEffect, useState } from "react";

const ViewReportDamageProduct = () => {
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState("");
  const methods = useForm({
    resolver: zodResolver(SchemaReportDamage),
    mode: "onChange",
  });
  const cookie = new Cookies();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    if (methods.watch().nombre === "") {
      toast.error("Selecciona un producto");
      return;
    }

    const config = {
      method: "POST",
      url: `${import.meta.env.VITE_URL}/reporte/guardar`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie.get("token")}`,
      },
      data,
    };

    setIsLoading(true);
    axios
      .request(config)
      .then((response) => {
        if (response.data === "Reporte guardado correctamente") {
          toast.success("Reporte guardado exitosamente");
          navigate("/");
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        toast.error(
          "Por el momento no se puede guardar el reporte, intenta más tarde"
        );
      });
  };

  useEffect(() => {
    const config = {
      method: "GET",
      url: `${import.meta.env.VITE_URL}/producto/obtener-productos`,
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
        "Content-Type": "application/json",
      },
    };

    axios.request(config).then((response) => {
      console.log(response);
      setProductos(response.data);
    });
  }, []);

  return (
    <div>
      <Header />

      <div className="flex flex-col gap-1">
        <div className="flex flex-row justify-start items-center gap-1 my-5 lg:pl-5 cursor-pointer">
          <h2 className="font-bold text-[18px] lg:text-[22px]">
            Reporte producto dañado
          </h2>
        </div>

        <form
          onSubmit={methods.handleSubmit(onSubmit)} // Usamos la función onSubmit aquí
          className="flex flex-col justify-evenly items-center gap-5 lg:flex-row lg:items-start lg:justify-center"
        >
          <FormProvider {...methods}>
            <div className="my-5 lg:w-[300px]">
              <PhotoComponent
                Error={methods?.formState?.errors?.urlImage?.message || ""}
                isError={!!methods?.formState?.errors?.urlImage?.message}
                directory={"productos"}
                register={methods.register}
                name={"urlImage"}
              />
            </div>

            <div className="w-full lg:w-1/2 flex flex-col   gap-5 px-5">
              <h2 className="font-bold lg:text-[22px]">
                {" "}
                Seleccione el producto
              </h2>

              {productos.length > 0 && (
                <select
                  className="border-[1px] border-solid border-black w-full h-[44px] outline-none shadow-md rounded-md p-1"
                  onChange={(event) => setProducto(event.target.value)}
                  {...methods.register("nombre")}
                >
                  <option value="">Seleccionar</option>
                  {productos.map((producto) => (
                    <option
                      value={producto.idProducto}
                      key={producto.idProducto}
                    >
                      {producto.nombre}
                    </option>
                  ))}
                </select>
              )}

              <TextArea
                label={"Descripción del daño"}
                name="descripcion"
                placeholder="Describa el daño del producto"
                register={methods.register}
                error={methods.formState.errors.descripcion?.message}
                isError={!!methods.formState.errors.nombre}
              />

              <div className=" w-[200px] lg:w-[300px] lg:h-[50px] my-5 rounded-md items-center">
                <Button
                  texto="Generar"
                  background="bg-F58A27"
                  onClick={() => {}}
                  type="submit"
                  isIcon={false}
                  isLoading={isLoading}
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

export default ViewReportDamageProduct;
