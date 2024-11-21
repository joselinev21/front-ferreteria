import Header from "../../components/Header/Header";
import { IoArrowBackOutline } from "react-icons/io5";
import { FormProvider, useForm } from "react-hook-form";
import Card from "../../components/cardAddPackage/cardAddPackage"; 
import { zodResolver } from "@hookform/resolvers/zod";
import { SchemaPackage } from "../../schema/SchemaPackage";
import TextField from "../../components/Form/TextField/TextField";
import TextArea from "../../components/Form/TextArea/TextArea";


const ViewEditPackage = () => {
  const methods = useForm({
    resolver: zodResolver(SchemaPackage),
    mode: "onChange",
  });
  return (
    <> 
      <Header />
      <div className="flex flex-col w-full max-w-[2000px] mx-auto">
        <div className="flex flex-row items-center gap-2 w-full p-5 pl-0">
          <IoArrowBackOutline size={32} />
          <p className="font-bold text-left text-[18px]">Editar paquete</p>
        </div>
      </div>
      <div>
        <form className="flex flex-col items-start gap-5 lg:flex-row lg:items-start lg:justify-start">
          <FormProvider {...methods}>
            <div className="w-full lg:w-1/2 flex flex-col items-start gap-5 ml-10">
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
                label="Precio"
                name="precio"
                type="text"
                placeholder="9999.99"
                register={methods.register}
                Error={methods?.formState.errors?.precio?.message}
                isError={!!methods?.formState.errors?.precio?.message}
              />
              <TextArea
                label="Descripción"
                name="descripcion"
                placeholder="Descripción del producto"
                isError={!!methods?.formState.errors?.descripcion?.message}
                error={methods?.formState.errors?.descripcion?.message}
                register={methods.register}
              />
            </div>
          </FormProvider>
        </form>
      </div>
      <h2 className="text-lg font-bold mt-8 ml-10">Productos</h2>

      <div className="flex justify-around mt-8">
        <Card />
        <Card />
        <Card />
      </div>
      <div className="mt-4 ml-10">
        <h3>Lista</h3>
        <br />
        <ol className="list-decimal list-inside">
          <li>Martillo</li>
          <li>Clavo 1p</li>
        </ol>
      </div>
      <div className="w-full flex justify-end mt-8 max-w-[600px] ml-[400px]">
        <div className="bg-[#F58A27] rounded-md text-white flex flex-row justify-center items-center p-2 gap-2 cursor-pointer w-full max-w-[200px] h-10">
          <span className="text-xl">Generar</span>
        </div>
      </div>
    </>
  );
};

export default ViewEditPackage;
  