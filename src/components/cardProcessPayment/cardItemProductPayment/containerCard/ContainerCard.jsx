import { useEffect, useState } from "react";

const ContainerCard = () => {
  const [estado, setEstado] = useState("Ingesa tarjeta");

  useEffect(() => {
    const timer = setTimeout(() => {
      setEstado("Procesando Cobro");
      setTimeout(() => {
        setEstado("Aprobado");
      }, 5000);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h2 className="text-white text-[18px] font-bold">
        Inserte la tarjeta en la terminal
      </h2>
      <div className="flex flex-col justify-center items-center p-3">
        <p className="text-white text-[16px]">{estado}</p>
      </div>
    </div>
  );
};

export default ContainerCard;
