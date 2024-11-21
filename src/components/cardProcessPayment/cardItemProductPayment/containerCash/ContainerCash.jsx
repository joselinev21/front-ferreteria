import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Button from "../../../Buttons/Button";
import toast from "react-hot-toast";
import { Cookies } from "react-cookie";
import { connect } from "react-redux";
import axios from "axios";

const ContainerCash = ({ totalPagar, pago }) => {
  const [efectivo, setEfectivo] = useState(0);
  const [cambio, setCambio] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const cookie = new Cookies();
  const { productos } = pago;

  const onSubmit = (e) => {
    e.preventDefault();
    if (efectivo === 0) {
      toast.error("Ingresa la cantidad de efectivo");
    } else if (efectivo < totalPagar) {
      toast.error("La cantidad de efectivo es menor al total a pagar");
    } else {
      const conf = {
        method: "POST",
        url: `${import.meta.env.VITE_URL}/venta/guardar`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.get("token")}`,
        },
        body: {
          total: totalPagar,
          pago: efectivo,
          productos,
        },
        data: {
          total: totalPagar,
          pago: efectivo,
          productos,
        },
      };

      setIsLoading(true);
      axios
        .request(conf)
        .then((res) => {
          if (res.data === "Venta guardada exitosamente") {
            const conftP = {
              method: "GET",
              url: `${import.meta.env.VITE_URL}/producto/poco-stock`,
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookie.get("token")}`,
              },
            };

            axios
              .request(conftP)
              .then((res) => {
                console.log(res);

                if (res.data.length > 0) {
                  toast.success(
                    `Su venta ha sido procesada, sin embargo, los siguientes productos están en poco stock ${res.data.map(
                      (p) => {
                        return p;
                      }
                    )}`
                  );
                } else {
                  toast.success("Venta guardada exitosamente");
                }
              })
              .catch(() => {
                toast.error("Error al procesar el pago");
              });
          }
        })
        .catch(() => {
          toast.error("Error al procesar el pago");
        });
    }
  };

  useEffect(() => {
    setCambio(efectivo - totalPagar <= 0 ? 0 : efectivo - totalPagar);
  }, [efectivo, totalPagar]);

  return (
    <div className="flex flex-col text-white gap-4">
      <div className="flex w-full flex-row justify-between items-center">
        <p>Total a pagar:</p>
        <p>{totalPagar}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>Efectivo recibido:</p>
        <form onSubmit={onSubmit}>
          <input
            className="border-b-[1px] border-white border-solid bg-trasparent outline-none text-end"
            type="number"
            onChange={(e) => setEfectivo(parseFloat(e.target.value) || 0)}
          />
        </form>
      </div>
      <div className="flex w-full flex-row justify-between items-center">
        <p>Cambio:</p>
        <p>{cambio}</p>
      </div>

      <div className="my-5 w-full px-5 border-solid border-white border-[1px] rounded-md">
        <Button
          background={"bg-primary"}
          isIcon={false}
          texto="Pagar"
          type="submit"
          Icon={false}
          isLoading={isLoading}
          onClick={onSubmit}
        />
      </div>
    </div>
  );
};

ContainerCash.prototype = {
  totalPagar: PropTypes.number.isRequired,
  pago: PropTypes.object,
};

const mapsStateToProps = (state) => {
  return {
    pago: state.pagos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapsStateToProps, mapDispatchToProps)(ContainerCash);
