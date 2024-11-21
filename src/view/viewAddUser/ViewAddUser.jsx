import Header from "../../components/Header/Header";
import { IoArrowBackOutline } from "react-icons/io5";
import { FormProvider, useForm } from "react-hook-form";
import { User } from "../../schema/SchemaUser";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "../../components/Form/TextField/TextField";
import Button from "../../components/Buttons/Button";
import { useState } from "react";
import { Cookies } from "react-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ViewAddUser = () => {
  const methods = useForm({
    resolver: zodResolver(User),
    mode: "onChange",
  });
  const [tipoView, setTipoView] = useState({
    tipo: "",
    error: false,
  });
  const cookie = new Cookies();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onChangeSelect = (e) => {
    setTipoView(e.target.value);
  };

  const onSubmit = (data) => {
    /* if (tipoView.tipo === "" || tipoView.tipo === undefined) {
      setTipoView({ ...tipoView, error: true });
      return;
    } */

    const dataToSend = {
      ...data,
      tipo: tipoView,
    };

    const conf = {
      method: "POST",
      url: `${import.meta.env.VITE_URL}/usuario/agregar`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie.get("token")}`,
      },
      data: dataToSend,
    };

    setIsLoading(true);
    axios
      .request(conf)
      .then((response) => {
        if (response.data.mensaje === "Usuario agregado exitosamente") {
          toast.success("Usuario agregado exitosamente");
          navigate("/users");
        } else {
          toast.error("Error al agregar el usuario");
          setIsLoading(false);
        }
      })
      .catch(() => {
        setIsLoading(false);
        toast.error("Error al agregar el usuario");
      });
  };

  return (
    <>
      <Header />

      <div className="flex flex-row items-center gap-2 w-full p-5 pl-4 justify-start">
        <IoArrowBackOutline size={32} />
        <p className="font-bold text-left text-[18px]">Agregar Usuario</p>
      </div>

      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col mt-5 w-full gap-5 max-w-[900px] px-4 md:px-40"
      >
        <FormProvider {...methods}>
          <div className="flex flex-col gap-5 w-full mt-4">
            <div className="mt-1 text-lg w-full text-left px-14">
              <b className="text-[25px]">Información Personal</b>
            </div>

            <TextField
              name="nombre"
              label="Nombre"
              type="text"
              placeholder="Nombre completo"
              Icon={null}
              isIcon={false}
              register={methods.register}
              isError={methods.formState.errors.nombre}
              Error={methods.formState.errors.nombre?.message}
            />

            <TextField
              name="telefono"
              label="Teléfono"
              type="text"
              placeholder="5512345678"
              Icon={null}
              isIcon={false}
              register={methods.register}
              isError={methods.formState.errors.telefono}
              Error={methods.formState.errors.telefono?.message}
            />

            <TextField
              name="correo"
              label="Correo electrónico"
              type="text"
              placeholder="ferreteria@gmail.com"
              Icon={null}
              isIcon={false}
              register={methods.register}
              isError={methods.formState.errors.correo}
              Error={methods.formState.errors.correo?.message}
            />

            <TextField
              name="rfc"
              label="RFC"
              type="text"
              placeholder="AAAA######XXX"
              Icon={null}
              isIcon={false}
              register={methods.register}
              isError={methods.formState.errors.rfc}
              Error={methods.formState.errors.rfc?.message}
            />

            <div className="mt-1 text-lg w-full text-left px-14">
              <b className="text-[25px]">Dirección</b>
            </div>

            <TextField
              name="calle"
              label="Calle"
              type="text"
              placeholder="Calle"
              Icon={null}
              isIcon={false}
              register={methods.register}
              isError={methods.formState.errors.calle}
              Error={methods.formState.errors.calle?.message}
            />

            <TextField
              name="numero"
              label="Número de Domicilio"
              type="text"
              placeholder="18, s/n, 3-B"
              Icon={null}
              isIcon={false}
              register={methods.register}
              isError={methods.formState.errors.numero}
              Error={methods.formState.errors.numero?.message}
            />

            <TextField
              name="colonia"
              label="Colonia"
              type="text"
              placeholder="Colonia"
              Icon={null}
              isIcon={false}
              register={methods.register}
              isError={methods.formState.errors.colonia}
              Error={methods.formState.errors.colonia?.message}
            />

            <TextField
              name="ciudad"
              label="Ciudad"
              type="text"
              placeholder="Ciudad"
              Icon={null}
              isIcon={false}
              register={methods.register}
              isError={methods.formState.errors.ciudad}
              Error={methods.formState.errors.ciudad?.message}
            />

            <div className="mt-1 text-lg w-full text-left px-14">
              <b className="text-[25px]">Información de Empleado</b>
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="tipoEmpleado" className="pl-2 mb-1 text-lg">
                Tipo de empleado
              </label>

              <select
                onChange={onChangeSelect}
                className="shadow-md rounded-md p-2 w-full outline-none pr-8 lg:h-[44px] text-[14px]"
              >
                <option value="">Seleccionar</option>
                <option value="Vendedor">Vendedor</option>
                <option value="Administrador">Administrador de Almacen</option>
                <option value="Gerente">Gerente</option>
              </select>
              {tipoView.error && (
                <p className="text-error text-sm pl-2">
                  Debe seleccionar una opción
                </p>
              )}
            </div>

            <TextField
              name="sueldo"
              label="Sueldo del Empleado"
              type="text"
              placeholder="1200"
              Icon={null}
              isIcon={false}
              register={methods.register}
              isError={methods.formState.errors.sueldo}
              Error={methods.formState.errors.sueldo?.message}
            />

            <TextField
              name="usuario"
              label="Usuario del Empleado"
              type="text"
              placeholder="MVR1209"
              Icon={null}
              isIcon={false}
              register={methods.register}
              isError={methods.formState.errors.usuario}
              Error={methods.formState.errors.usuario?.message}
            />

            <TextField
              name="contrasena"
              label="Contraseña del Empleado"
              type="password"
              placeholder="Minimo 8 caracteres"
              Icon={null}
              isIcon={false}
              register={methods.register}
              isError={methods.formState.errors.contrasena}
              Error={methods.formState.errors.contrasena?.message}
            />

            <div>
              <Button
                background="bg-[#F58A27]"
                isIcon={false}
                texto="Agregar Usuario"
                type="submit"
                Icon={null}
                isLoading={isLoading}
                onClick={() => {}}
              />
            </div>
          </div>
        </FormProvider>
      </form>
    </>
  );
};

export default ViewAddUser;
