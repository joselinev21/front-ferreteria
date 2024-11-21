import Header from "../../components/Header/Header";
import Image from "../../../public/404.jpg";

const NotFound = () => {
  return (
    <>
      <Header />
      <div className="w-full h-full flex flex-col justify-center items-center gap-10 my-10">
        <h2 className="text-primary font-bold text-[24px]">Página no encontrada, regresa al <a href="/" className="underline">Inicio</a> </h2>
        <picture>
          <img src={Image} className=" shadow-md rounded-md" />
        </picture>
      </div>
    </>
  );
};

export default NotFound;
