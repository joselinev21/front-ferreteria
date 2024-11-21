import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Header from "../../../components/Header/Header";
import { Cookies } from "react-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import { connect } from "react-redux";
import { dataOfertas } from "../../../store/slices/offer/offer_reducer";
import { FaPlus } from "react-icons/fa6";
import SuplierLoading from "../../../components/Loadings/SuplierLoading/SuplierLoading";

const ViewListOffer = ({ setDataOfertas, ofertasState }) => {
  const cookie = new Cookies();

  const { ofertas } = ofertasState;
  const [busqueda, setBusqueda] = useState("");
  const [isLoadinView, setIsLoadingView] = useState(true);

  const filterBusqueda = ofertas.filter((ofertas) =>
    ofertas?.nombre?.toLowerCase().includes(busqueda?.toLowerCase())
  );

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
        "Content-Type": "application/json",
      },
      method: "GET",
      url: `${import.meta.env.VITE_URL}/oferta/obtener`,
    };

    axios
      .request(config)
      .then((response) => {
        setDataOfertas(response.data);
        setIsLoadingView(false);
      })
      .catch(() => {
        toast.error("Error al obtener las ofertas");
      });
  }, []);

  const CardOffer = ({ nombre, precio, fechaLimite }) => {
    return (
      <div className="w-[180px] lg:w-[300px] shadow-md rounded-md p-5">
        <h2 className="font-bold text-[15px] lg:text-[20px]">Oferta</h2>

        <article>
          <p>Producto: {nombre}</p>
          <p>Precio: ${precio}</p>
          <p>Fecha limite: {fechaLimite}</p>
        </article>
      </div>
    );
  };

  return (
    <>
      <Header />

      <div className="p-5">
        {isLoadinView && (
          <div className="h-screen bg-white/60  w-screen absolute">
            <SuplierLoading />ƒ
          </div>
        )}

        <h2 className="font-bold text-[15px] lg:text-[20px]">Ofertas</h2>

        <div className="w-full flex justify-center items-center ">
          <input
            onChange={(e) => setBusqueda(e.target.value)}
            type="text"
            placeholder="Buscar Oferta por Nombre del Producto"
            className="border-[1px] border-solid border-black p-2 w-[150px] lg:w-[500px] shadow-md rounded-md outline-none"
          />
        </div>

        <div className="w-full flex justify-end px-5">
          <a
            href="/offer-product"
            className="flex flex-row gap-1 bg-primary text-white p-2 rounded-md"
          >
            <FaPlus size={24} color="white" />
            <p className="hidden lg:flex">Agregar Oferta</p>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-10 justify-center gap-5">
          {filterBusqueda.length === 0 ? (
            <p className="text-center font-bold text-[24px]">
              No se han podido cargar las ofertas
            </p>
          ) : (
            filterBusqueda.map((oferta) => (
              <CardOffer
                key={oferta.idOferta}
                nombre={oferta.nombre}
                precio={oferta.precioOferta}
                fechaLimite={oferta.fechaFinal}
              />
            ))
          )}
        </div>

        <div className="w-full flex justify-center items-center"></div>
      </div>
    </>
  );
};

ViewListOffer.propTypes = {
  setDataOfertas: PropTypes.func.isRequired,
  ofertasState: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    ofertasState: state.ofertas,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDataOfertas: (data) => dispatch(dataOfertas(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewListOffer);
