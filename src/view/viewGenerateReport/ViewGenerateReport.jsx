import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Header from "../../components/Header/Header";
import CardReport from "../../components/cardReport/cardReport";
import { Cookies } from "react-cookie";
import axios from "axios";
import Button from "../../components/Buttons/Button";
import toast from "react-hot-toast";

const ViewGenerateReport = () => {
  const methods = useForm();
  const cookie = new Cookies();
  const [isLoading, setIsLoading] = useState(false);
  const [masVendidos, setMasVendidos] = useState([]);
  const [menosVendidos, setMenosVendidos] = useState([]);
  const [frecuencia, setFrecuencia] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (frecuencia === "") {
      toast.error("Debes seleccionar la frecuencia del reporte");
      return;
    }

    const configMasVendidos = {
      method: "GET",
      url: `${
        import.meta.env.VITE_URL
      }/producto-venta/listaMasVendidos?frecuencia=${frecuencia}`,
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
        "Content-Type": "application/json",
      },
    };

    const configMenosVendidos = {
      method: "GET",
      url: `${
        import.meta.env.VITE_URL
      }/producto-venta/listaMenosVendidos?frecuencia=${frecuencia}`,
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
        "Content-Type": "application/json",
      },
    };

    setIsLoading(true);
    try {
      const responseMasVendidos = await axios.request(configMasVendidos);
      setMasVendidos(responseMasVendidos.data);

      const responseMenosVendidos = await axios.request(configMenosVendidos);
      setMenosVendidos(responseMenosVendidos.data);
      setIsLoading(false);

      if (
        responseMasVendidos.data.length === 0 &&
        responseMenosVendidos.data.length === 0
      ) {
        toast.error("No hay ventas realizadas para realizar tu reporte");
      }
    } catch {
      setIsLoading(false);
      toast.error("Ocurrió un error al generar el reporte");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Header />

      <div className="font-bold text-[20px] w-screen p-5">
        <p>Generar reporte estadístico</p>
      </div>

      <form onSubmit={onSubmit} className="w-full max-w-[800px] mx-auto">
        <p className="my-5 font-bold text-[20px]">
          Selecciona el tipo del reporte
        </p>

        <div className="flex flex-row justify-center items-center gap-4">
          <FormProvider {...methods}>
            <select
              onChange={(e) => {
                setFrecuencia(e.target.value);
              }}
              className="w-full border-b-[1px] border-solid border-black p-2 outline-none"
            >
              <option value="">Seleccionar</option>
              <option value="diario">Diario</option>
              <option value="semanal">Semanal</option>
              <option value="mensual">Mensual</option>
              <option value="anual">Anual</option>
            </select>

            <div className="w-[200px] h-[40px] flex justify-center items-center ">
              <Button
                background="bg-[#F58A27]"
                texto="Generar"
                isIcon={false}
                type="submit"
                Icon={null}
                isLoading={isLoading}
                onClick={() => {}}
              />
            </div>
          </FormProvider>
        </div>
      </form>

      {masVendidos.length !== 0 && menosVendidos.length !== 0 ? (
        <div className="my-10 flex flex-col justify-center items-center gap-11">
          <div>
            <h3 className="font-bold text-center">Productos más vendidos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {masVendidos.length > 0 ? (
                masVendidos.map((producto) => (
                  <CardReport
                    key={producto.nombre}
                    nombre={producto.nombre}
                    precio={producto.precioMenudeo}
                    cantidadVendida={producto.cantidad}
                    imageUrl={producto.urlImage}
                  />
                ))
              ) : (
                <CardReport
                  nombre="No hay productos disponibles"
                  precio=" "
                  cantidadVendida=" "
                  imageUrl="https://m.media-amazon.com/images/I/51F6j0nht0L.__AC_SX300_SY300_QL70_ML2_.jpg"
                />
              )}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-center">Productos menos vendidos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {menosVendidos.length > 0 ? (
                menosVendidos.map((producto) => (
                  <CardReport
                    key={producto.nombre}
                    nombre={producto.nombre}
                    precio={producto.precioMenudeo}
                    cantidadVendida={producto.cantidad}
                    imageUrl={producto.urlImage}
                  />
                ))
              ) : (
                <CardReport
                  nombre="No hay productos disponibles"
                  precio=" "
                  cantidadVendida=" "
                  imageUrl="https://m.media-amazon.com/images/I/51F6j0nht0L.__AC_SX300_SY300_QL70_ML2_.jpg"
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="font-bold text-[20px] lg:text-[50px] my-52">
          Debes seleccionar una tipo de reporte
        </p>
      )}
    </div>
  );
};

export default ViewGenerateReport;
