import { useEffect, useState } from "react";
import Logo from "../../../public/bitmap.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdCloseCircle } from "react-icons/io";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menu, setMenu] = useState({ options: [], urls: [] });
  const navigate = useNavigate();

  const rolesOptions = {
    Gerente: {
      options: ["Usuario", "Paquetes", "Ofertas", "Reporte"],
      urls: ["/users", "/list-package", "/offers", "/generate-report"],
    },
    Administrador: {
      options: ["Proveedor", "Producto", "Reporte"],
      urls: ["/supliers", "/products", "/report-damage-product"],
    },
    Vendedor: {
      options: ["Proyecto", "Venta", "Producto", "Paquetes"],
      urls: ["/proyecto", "/sale", "/products", "/list-package"],
    },
  };

  const singOut = () => {
    const cookies = new Cookies();
    cookies.remove("rol");
    cookies.remove("token");
    navigate("/login");
  };

  useEffect(() => {
    const cookies = new Cookies();
    const rol = cookies.get("rol");

    if (!rol) {
      navigate("/login");
    } else {
      const { options, urls } = rolesOptions[rol] || { options: [], urls: [] };
      setMenu({ options, urls });
    }
  }, []);

  const renderMenu = () => (
    <ul className="flex flex-col justify-center items-center gap-5 text-[20px]">
      <a href="/">
        <li className="hover:underline">Inicio</li>
      </a>
      {menu.options.map((option, index) => (
        <a key={index} href={menu.urls[index]}>
          <li className="hover:underline">{option}</li>
        </a>
      ))}
      <a onClick={singOut}>
        <li className="hover:underline">Cerrar Sesión</li>
      </a>
    </ul>
  );

  if (isOpen) {
    return (
      <div className="bg-F58A27 w-screen h-screen relative font-georgia text-white flex justify-center items-center">
        <IoMdCloseCircle
          onClick={() => setIsOpen(false)}
          color="white"
          size={32}
          className="absolute right-5 top-5"
        />
        {renderMenu()}
      </div>
    );
  }

  return (
    <div className="bg-F58A27 w-full h-[80px] flex flex-row justify-between items-center px-5 text-white font-georgia text-[18px]">
      <picture className="flex justify-center items-center">
        <img src={Logo} alt="" className="w-[60px] h-[60px]" />
      </picture>

      <div className="hidden lg:flex">
        <ul className="flex flex-row justify-center items-center gap-5 text-[20px]">
          <a href="/">
            <li className="hover:underline">Inicio</li>
          </a>
          {menu.options.map((option, index) => (
            <a key={index} href={menu.urls[index]}>
              <li className="hover:underline">{option}</li>
            </a>
          ))}
          <a onClick={singOut}>
            <li className="hover:underline">Cerrar Sesión</li>
          </a>
        </ul>
      </div>

      <RxHamburgerMenu
        onClick={() => setIsOpen(true)}
        color="white"
        size={32}
        className="cursor-pointer lg:hidden"
      />
    </div>
  );
};

export default Header;
