import { FormProvider, useForm } from "react-hook-form";
import Header from "../../../components/Header/Header";

import TextField from "../../../components/Form/TextField/TextField";
import Button from "../../../components/Buttons/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaObra } from "../../../schema/SchemaObra";
import TextArea from "../../../components/Form/TextArea/TextArea";
import { FaRegSave } from "react-icons/fa";
import axios from "axios";
import { Cookies } from "react-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SuplierLoading from "../../../components/Loadings/SuplierLoading/SuplierLoading";
import { useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";

const ViewAddProject = () => {
  const methods = useForm({
    resolver: zodResolver(schemaObra),
    mode: "onChange",
  });
  const cookie = new Cookies();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    setIsLoading(true);
    const config = {
      method: "POST",
      url: `${import.meta.env.VITE_URL}/obra/agregar`,
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      data,
    };

    axios
      .request(config)
      .then((response) => {
        if (
          response.data.status === 200 &&
          response.data.mensaje === "Obra guardada correctamente"
        ) {
          navigate("/proyecto");
        }
      })
      .catch((error) => {
        setIsLoading(true);
        console.log(error);
        toast.error("Error al crear el proyecto");
      });
  };

  return (
    <>
      <Header />

      {isLoading && <SuplierLoading />}

      <div>
        <div className="flex flex-row justify-start items-center gap-2 w-full p-5">
          <IoArrowBackOutline
            size={32}
            onClick={() => navigate(-1)}
            className="cursor-pointer"
          />
          <p className="text-[18px] font-bold">Crear Proyecto</p>
        </div>
      </div>

      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="w-[100%]  flex gap-5 justify-center items-center flex-col"
      >
        <FormProvider {...methods}>
          <fieldset className="w-[90%] lg:w-[70%] gap-3 flex justify-center items-center flex-col">
            <legend className="text-[18px] lg:text-[24px] font-bold py-5">
              Información Personal del encargado de proyecto
            </legend>

            <TextField
              name="nombre"
              label={"Nombre"}
              placeholder="Nombre completo"
              type="text"
              Icon={null}
              isIcon={false}
              register={methods.register}
              isError={!!methods.formState.errors.nombre}
              Error={methods.formState.errors.nombre?.message}
            />

            <TextField
              name="telefono"
              label={"Teléfono"}
              placeholder="5512345678"
              type="text"
              Icon={null}
              isIcon={false}
              register={methods.register}
              isError={!!methods.formState.errors.telefono}
              Error={methods.formState.errors.telefono?.message}
            />

            <TextField
              name="correo"
              label={"Correo electrónico"}
              placeholder="ejemplo@gmail.com"
              type="text"
              Icon={null}
              isIcon={false}
              register={methods.register}
              isError={!!methods.formState.errors.correo}
              Error={methods.formState.errors.correo?.message}
            />

            <TextField
              name="rfc"
              label={"RFC"}
              placeholder="AAAA######XXX"
              type="text"
              Icon={null}
              isIcon={false}
              register={methods.register}
              isError={!!methods.formState.errors.rfc}
              Error={methods.formState.errors.rfc?.message}
            />
          </fieldset>

          <fieldset className="w-[90%] lg:w-[70%] gap-3 flex justify-center items-center flex-col">
            <legend className="text-[18px] lg:text-[24px] font-bold py-5">
              Dirección del encargado de proyecto
            </legend>

            <TextField
              name="calle"
              label={"Calle"}
              placeholder="Calle"
              type="text"
              Icon={null}
              isIcon={false}
              register={methods.register}
              isError={!!methods.formState.errors.calle}
              Error={methods.formState.errors.calle?.message}
            />

            <TextField
              name="numero"
              label={"Número de Domicilio"}
              placeholder="18, s/n, 3-B"
              type="text"
              Icon={null}
              isIcon={false}
              register={methods.register}
              isError={!!methods.formState.errors.numero}
              Error={methods.formState.errors.numero?.message}
            />

            <TextField
              name="colonia"
              label={"Colonia"}
              placeholder="Colonia"
              type="text"
              Icon={null}
              isIcon={false}
              register={methods.register}
              isError={!!methods.formState.errors.colonia}
              Error={methods.formState.errors.colonia?.message}
            />

            <TextField
              name="ciudad"
              label={"Ciudad"}
              placeholder="Ciudad"
              type="text"
              Icon={null}
              isIcon={false}
              register={methods.register}
              isError={!!methods.formState.errors.ciudad}
              Error={methods.formState.errors.ciudad?.message}
            />
          </fieldset>

          <fieldset className="w-[90%] lg:w-[70%] gap-3 flex justify-center items-center flex-col">
            <legend className="text-[18px] lg:text-[24px] font-bold py-5">
              Dirección del Proyecto
            </legend>

            <TextField
              name="calleP"
              label={"Calle"}
              placeholder="Calle"
              type="text"
              Icon={null}
              isIcon={false}
              register={methods.register}
              isError={!!methods.formState.errors.calleP}
              Error={methods.formState.errors.calleP?.message}
            />

            <TextField
              name="numeroP"
              label={"Número de Domicilio"}
              placeholder="18, s/n, 3-B"
              type="text"
              Icon={null}
              isIcon={false}
              register={methods.register}
              isError={!!methods.formState.errors.numeroP}
              Error={methods.formState.errors.numeroP?.message}
            />

            <TextField
              name="coloniaP"
              label={"Colonia"}
              placeholder="Colonia"
              type="text"
              Icon={null}
              isIcon={false}
              register={methods.register}
              isError={!!methods.formState.errors.coloniaP}
              Error={methods.formState.errors.coloniaP?.message}
            />

            <TextField
              name="ciudadP"
              label={"Ciudad"}
              placeholder="Ciudad"
              type="text"
              Icon={null}
              isIcon={false}
              register={methods.register}
              isError={!!methods.formState.errors.ciudadP}
              Error={methods.formState.errors.ciudadP?.message}
            />
          </fieldset>

          <fieldset className="w-[90%] lg:w-[70%] gap-3 flex justify-center items-center flex-col">
            <legend className="text-[18px] font-bold py-5">Descripción</legend>
            <TextArea
              name="descripcion"
              label={""}
              placeholder="Descripción del proyecto"
              register={methods.register}
              isError={!!methods.formState.errors.descripcion}
              error={methods.formState.errors?.descripcion?.message}
            />
          </fieldset>

          <div className="w-1/2 my-5 lg:w-[30%] lg:h-[52px] cursor-pointer">
            <Button
              type="submit"
              onClick={() => {}}
              background="bg-primary"
              isIcon={true}
              texto="Guardar"
              Icon={<FaRegSave />}
            />
          </div>
        </FormProvider>
      </form>
    </>
  );
};

export default ViewAddProject;
