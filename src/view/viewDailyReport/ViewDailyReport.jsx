import Header from "../../components/Header/Header";
import { IoArrowBackOutline } from "react-icons/io5";
import TextField from "../../components/Form/TextField/TextField";
import { FormProvider, useForm } from "react-hook-form";
import { RiArrowDownSLine } from "react-icons/ri";
import CardReport from "../../components/cardReport/cardReport";

const ViewDailyReport = () => {
  const methods = useForm();

  return (
    <div>
      <Header />

      {/* Contenedor principal de la página */}
      <div className="flex flex-col w-full max-w-[2000px] mx-auto">
        {/* Contenedor para la flecha y el título */}
        <div className="flex flex-row items-center gap-2 w-full p-5 pl-0">
          <IoArrowBackOutline size={32} />
          <p className="font-bold text-left text-[18px]">
            Generar reporte estadístico
          </p>
        </div>
      </div>

      {/* Texto de selección del reporte */}
      <div className="w-full px-5 my-5 text-center">
        <p className="text-[18px] mb-3">Seleccione la opción del reporte</p>
      </div>

      {/* Barra de búsqueda */}
      <div className="w-full px-5 my-5 flex flex-col items-center">
        <FormProvider {...methods}>
          <form className="w-full max-w-[600px] mx-auto">
            <TextField
              register={methods.register}
              name="buscador"
              type="text"
              isIcon={true}
              Icon={<RiArrowDownSLine size={32} color="black" />}
            />
          </form>
        </FormProvider>
        <br />

        {/* Botón de generar reporte, alineado a la derecha */}
        <div className="w-full flex justify-end max-w-[600px]">
          <div className="bg-[#F58A27] rounded-md text-white flex flex-row justify-center items-center p-2 gap-2 cursor-pointer w-full max-w-[200px] h-10 transition-all duration-300 hover:bg-[#e07a22]">
            <span className="text-xl">Generar</span>
          </div>
        </div>
      </div>

      {/* Ganancias y Mayor Productividad en la misma línea, más cerca */}
      <div className="w-full px-10 my-2"> {/* Ajusté el margen superior */}
        <div className="flex justify-between mb-1"> {/* Reducimos el margin-bottom */}
          <h2 className="font-bold">Ganancias de hoy</h2>
          <p>$3200</p>
        </div>
        <div className="flex justify-between mb-1"> {/* Reducimos el espacio entre estas líneas */}
          <h2 className="font-bold">Mayor productividad</h2>
          <p>Miguel</p>
        </div>
      </div>

      {/* Productos más vendidos */}
      <div className="w-full px-10 mb-2"> {/* Ajusté el margen inferior aquí */}
        <h3>Productos más vendidos</h3>
      </div>
      
      {/* Ajuste del espaciado entre cards */}
      <dv className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-1 gap-y-1"> 
        {[...Array(6)].map((_, index) => (
          <CardReport
            key={index}
            nombre=" "
            precio=" "
            cantidadVendida=" "
            imageUrl="https://m.media-amazon.com/images/I/51F6j0nht0L.__AC_SX300_SY300_QL70_ML2_.jpg"
          />
        ))}
      </dv>
    </div>
  );
};

export default ViewDailyReport;
