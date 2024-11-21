import { useState } from "react";
import Header from "../../components/Header/Header";
import Button from "../../components/Buttons/Button";
import toast from "react-hot-toast";
import axios from "axios";
import { Cookies } from "react-cookie";

const ViewSettings = () => {
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState("");

  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const cookie = new Cookies();

  const handleGetProduct = (e) => {
    e.preventDefault();

    if (producto !== "") {
      const config = {
        method: "GET",
        url: `${
          import.meta.env.VITE_URL
        }/producto/obtener-stock?codigo=${producto}`,
        headers: {
          Authorization: `Bearer ${cookie.get("token")}`,
          "Content-Type": "application/json",
        },
      };

      setIsLoadingSearch(true);
      axios
        .request(config)
        .then((response) => {
          setCantidad(response.data);
          setIsLoadingSearch(false);
        })
        .catch(() => {
          toast.error("Por el momento no se puede obtener el producto");
        });
    } else {
      toast.error("Ingresa un código de producto");
    }
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();

    if (cantidad !== "") {
      const config = {
        method: "PUT",
        url: `${
          import.meta.env.VITE_URL
        }/producto/actualizar-stock?codigo=${producto}&stockMinimo=${cantidad}`,
        headers: {
          Authorization: `Bearer ${cookie.get("token")}`,
          "Content-Type": "application/json",
        },
      };

      setIsLoadingUpdate(true);
      axios
        .request(config)
        .then((res) => {
          console.log(res);

          if (res.data === "Stock actualizado correctamente") {
            setCantidad("");
            setProducto("");
            setIsLoadingUpdate(false);
            toast.success("Stock minimo actualizado");
          } else {
            toast.error("Por el momento no se puede actualizar el producto");
          }
        })
        .catch(() => {
          toast.error("Por el momento no se puede actualizar el producto");
        });
    }
  };

  return (
    <>
      <Header />

      <div>
        <div className="flex flex-col justify-center items-center gap-10 w-[400px] lg:w-[800px] m-auto my-10">
          <p className="font-bold text-[20px]">Actualización de Stock Mínimo</p>
          <form
            onSubmit={handleGetProduct}
            className="flex lg:flex-row flex-col justify-center items-center max-w-[800px] gap-5"
          >
            <input
              type="text"
              value={producto}
              placeholder="Ingresa el código del producto"
              onChange={(e) => setProducto(e.target.value)}
              className="bg-trasparent outline-none border-solid border-black border-b-[1px] w-[300px] lg:w-[600px] p-1"
            />
            <div className="w-[200px] h-[40px]">
              <Button
                background="bg-primary"
                isIcon={false}
                texto="Buscar"
                type="submit"
                Icon={null}
                isLoading={isLoadingSearch}
                onClick={() => {}}
              />
            </div>
          </form>

          <form
            onSubmit={handleUpdateProduct}
            className="flex lg:flex-row flex-col justify-center items-center max-w-[800px] gap-5"
          >
            <input
              type="text"
              placeholder="Ingresa la cantidad de Stock Minimo"
              onChange={(e) => setCantidad(e.target.value)}
              className="bg-trasparent outline-none border-solid border-black border-b-[1px] w-[300px] lg:w-[600px] p-1"
              value={cantidad}
            />
            <div className="w-[200px] h-[40px]">
              <Button
                background="bg-primary"
                isIcon={false}
                texto="Actualizar"
                type="submit"
                Icon={null}
                isLoading={isLoadingUpdate}
                onClick={() => {}}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ViewSettings;
