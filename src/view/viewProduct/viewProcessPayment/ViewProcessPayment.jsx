import Header from "../../components/Header/Header";
import TextField from "../../components/Form/TextField/TextField";
import { FormProvider, useForm } from "react-hook-form";
import { IoIosSearch } from "react-icons/io";
import Card from "../../components/CardProcessPayment/cardProcessPayment";

const ViewProcessPayment = () => {
  const methods = useForm();
  const totalAmount = 600; // Asume que el total es 600

  const handleProcessPayment = () => {
    console.log("Procesando pago");
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center flex-col gap-5 py-5">
        {/* Sección de Ventas */}
        <div className="flex flex-row justify-between items-center gap-2 w-full p-5">
          <p className="text-[18px] font-bold">Ventas</p>
        </div>

        {/* Campo de Búsqueda con líneas que simulan código de barras */}
        <div className="flex justify-center items-center flex-col gap-4 max-w-[1200px] mx-auto">
          {/* Moved "Busca por código" up and aligned to the left */}
          <p className="w-full text-left mb-1">Busca por código</p>

          <div className="flex items-center mb-4">
            <FormProvider {...methods}>
              <form className="w-[320px] lg:w-[600px] bg-white rounded p-1">
                {" "}
                {/* Sin sombra */}
                <TextField
                  isError={!!methods.formState.errors.search}
                  Error={methods.formState.errors.search?.message}
                  register={methods.register}
                  name="buscador"
                  type="text"
                  isIcon={true}
                  Icon={<IoIosSearch size={32} color="black" />}
                />
              </form>
            </FormProvider>

            {/* Varias líneas que simulan un código de barras */}
            <div className="flex items-center ml-2 space-x-0">
              <div className="border-l border-gray-1000 h-8 w-[1px]"></div>
              <div className="border-l border-gray-1000 h-8 w-[2px]"></div>
              <div className="border-l border-gray-1000 h-8 w-[6px]"></div>
              <div className="border-l border-gray-1000 h-8 w-[3px]"></div>
              <div className="border-l border-gray-1000 h-8 w-[1px]"></div>
              <div className="border-l border-gray-1000 h-8 w-[1px]"></div>
              <div className="border-l border-gray-1000 h-8 w-[3px]"></div>
              <div className="border-l border-gray-1000 h-8 w-[1px]"></div>
              <div className="border-l border-gray-1000 h-8 w-[1px]"></div>
              <div className="border-l border-gray-1000 h-8 w-[3px]"></div>
              <div className="border-l border-gray-1000 h-8 w-[1px]"></div>
              <div className="border-l border-gray-1000 h-8 w-[1px]"></div>
              <div className="border-l border-gray-1000 h-8 w-[3px]"></div>
              <div className="border-l border-gray-1000 h-8 w-[1px]"></div>
              <div className="border-l border-gray-1000 h-8 w-[1px]"></div>
            </div>
          </div>
        </div>

        {/* Carrito de Productos */}
        <div className="border border-gray-300 shadow-md bg-white p-4 rounded-lg w-full lg:w-1/2">
          <h2 className="text-center font-bold text-lg mb-4">Carrito de Productos</h2>
          <div className="space-y-3">
            {/* Producto 1 */}
            <Card
              imageSrc="/ruta/de/la/imagen-del-producto.jpg"
              quantity={2}
              unitPrice={100}
              totalPrice={200}
              onRemove={() => console.log("Producto eliminado")}
            />
          </div>
          <div className="space-y-3">
            {/* Producto 2 */}
            <Card
              imageSrc="/ruta/de/la/imagen-del-producto.jpg"
              quantity={2}
              unitPrice={100}
              totalPrice={200}
              onRemove={() => console.log("Producto eliminado")}
            />
          </div>
          <div className="space-y-3">
            {/* Producto 3 */}
            <Card
              imageSrc="/ruta/de/la/imagen-del-producto.jpg"
              quantity={2}
              unitPrice={100}
              totalPrice={200}
              onRemove={() => console.log("Producto eliminado")}
            />
          </div>
          <div className="space-y-3">
            {/* Producto 4 */}
            <Card
              imageSrc="/ruta/de/la/imagen-del-producto.jpg"
              quantity={2}
              unitPrice={100}
              totalPrice={200}
              onRemove={() => console.log("Producto eliminado")}
            />
          </div>
          {/* Resumen de Pago */}
          <div className="mt-4 text-right space-y-2">
            <div className="flex justify-end items-center text-sm lg:text-md font-semibold">
              <p className="w-[150px]">Subtotal</p>
              <p className="w-[80px]">$600</p>
            </div>
            <div className="flex justify-end items-center text-sm lg:text-md font-semibold">
              <p className="w-[150px]">Descuento</p>
              <p className="w-[80px]">$0</p>
            </div>
            <div className="flex justify-end items-center text-md font-bold">
              <p className="w-[150px]">Total</p>
              <p className="w-[80px]">$600</p>
            </div>
          </div>
          {/* Botones y Total de Pago */}
          <div className="mt-5 flex justify-between items-center">
            <button
              style={{ backgroundColor: "orange" }}
              className="text-white py-1 px-4 rounded w-[150px]"
            >
              Seguir comprando
            </button>
          </div>
          {/* Línea sombreada debajo del botón */}
          <div className="border-t border-gray-300 w-full my-1"></div>
          {/* Total de Pago */}
          <div className="mt-4 text-right space-y-2">
            <div className="flex justify-end items-center font-bold text-md">
              <p>Total de Pago:</p>
              <div className="border-l border-gray-500 h-4 mx-2"></div>
              <p className="text-yellow-500">${totalAmount}</p>
            </div>
          </div>
          {/* Línea debajo del Total de Pago */}
          <div className="border-t border-gray-300 w-full my-0"></div>
          {/* Botón Procesar Pago */}
          <div className="mt-5 flex justify-end">
            <button
              style={{ backgroundColor: "orange" }}
              className="text-white py-1 px-3 rounded w-[130px]"
              onClick={handleProcessPayment} // Manejador para procesar el pago
            >
              Procesar pago
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProcessPayment;
