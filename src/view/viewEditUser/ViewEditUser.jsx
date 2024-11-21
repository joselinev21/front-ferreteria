import Header from "../../components/Header/Header";
import { IoArrowBackOutline } from "react-icons/io5";
import { FormProvider, useForm } from "react-hook-form";
import TextField from "../../components/Form/TextField/TextField";
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
import { User } from "../../schema/SchemaUser";
import { zodResolver } from "@hookform/resolvers/zod";


const ViewEditUser = () => {
  const methods = useForm({
    resolver: zodResolver(User),
    mode: "onChange",
  });
  return (
    <>
      <Header /> 

      <div className="flex flex-row items-center gap-2 w-full p-5 pl-4 justify-start">
        <IoArrowBackOutline size={32} />
        <p className="font-bold text-left text-[18px]">Agregar Usuario</p>
      </div>

      <form className="flex flex-col mt-5 w-full max-w-[900px] px-4 md:px-40">
        <FormProvider {...methods}>
          <div className="flex flex-col gap-5 w-full mt-4">
            <div className="mt-1 text-lg w-full text-left px-14">
              <b className="text-[25px]">Información Personal del Usuario</b>
            </div>

            <TextField
              label="Nombre"
              name="nombre"
              type="text"
              placeholder="Nombre completo"
              register={methods.register}
              Error={methods?.formState.errors?.nombre?.message}
              isError={!!methods?.formState.errors?.nombre?.message}
            />

            <TextField
              label="Teléfono"
              name="telefono"
              type="text"
              placeholder="5512345678"
              register={methods.register}
              Error={methods?.formState.errors?.telefono?.message}
              isError={!!methods?.formState.errors?.telefono?.message}
            />

            <TextField
              label="Correo electrónico"
              name="correo"
              type="text"
              placeholder="ejemplo@gmail.com"
              register={methods.register}
              Error={methods?.formState.errors?.correo?.message}
              isError={!!methods?.formState.errors?.correo?.message}
            />

            <TextField
              label="RFC"
              name="rfc"
              type="text"
              placeholder="AAAA######XXX"
              register={methods.register}
              Error={methods?.formState.errors?.rfc?.message}
              isError={!!methods?.formState.errors?.rfc?.message}
            />

            <div className="mt-1 text-lg w-full text-left px-14">
              <b className="text-[25px]">Dirección</b>
            </div>

            <TextField
              label="Calle"
              name="calle"
              type="text"
              placeholder="Calle"
              register={methods.register}
              Error={methods?.formState.errors?.calle?.message}
              isError={!!methods?.formState.errors?.calle?.message}
            />

            <TextField
              label="Número de Domicilio"
              name="numero"
              type="text"
              placeholder="18"
              register={methods.register}
              Error={methods?.formState.errors?.numero?.message}
              isError={!!methods?.formState.errors?.numero?.message}
            />

            <TextField
              label="Colonia"
              name="colonia"
              type="text"
              placeholder="Colonia"
              register={methods.register}
              Error={methods?.formState.errors?.colonia?.message}
              isError={!!methods?.formState.errors?.colonia?.message}
            />

            <TextField
              label="Ciudad"
              name="ciudad"
              type="text"
              placeholder="Ciudad"
              register={methods.register}
              Error={methods?.formState.errors?.ciudad?.message}
              isError={!!methods?.formState.errors?.ciudad?.message}
            />

            <div className="mt-1 text-lg w-full text-left px-14">
              <b className="text-[25px]">Información del Empleado</b>
            </div>

            <TextField
              label="Tipo de empleado"
              name="tipo de empleado"
              type="text"
              register={methods.register}
              Error={methods?.formState.errors?.nombre?.message}
              isError={!!methods?.formState.errors?.nombre?.message}
              isIcon={true}
              Icon={<IoIosArrowDown size={32} color="black" />}
            />
            <TextField
              label="Sueldo"
              name="sueldo"
              type="text"
              placeholder="0.00"
              register={methods.register}
              Error={methods?.formState.errors?.sueldo?.message}
              isError={!!methods?.formState.errors?.sueldo?.message}
            />
          </div>
        </FormProvider>
      </form>

      <div className="w-full flex justify-center mt-8 px-4">
        <div className="bg-[#F58A27] rounded-md text-white flex flex-row justify-center items-center p-2 cursor-pointer w-full max-w-[250px] h-12">
          <span className="text-xl">Generar</span>
        </div>
      </div>
    </>
  );
};

export default ViewEditUser;
