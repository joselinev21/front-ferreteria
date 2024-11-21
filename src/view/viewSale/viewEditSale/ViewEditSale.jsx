import Header from "../../../components/Header/Header";
import TextField from "../../../components/Form/TextField/TextField";
import { FormProvider, useForm } from "react-hook-form";
import { IoIosSearch } from "react-icons/io";
import Button from "../../../components/Buttons/Button";
import PropTypes from "prop-types";
import {
  actualizarStatus,
  dataProduct,
} from "../../../store/slices/product/product_reducers";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import { IoArrowBackOutline } from "react-icons/io5";

const ViewEditSales = ({ productosState, setDataProducts, setStatus }) => {
  const methods = useForm();
  const { productos } = productosState;
  const cookie = new Cookies();
  const [sales, setSales] = useState([]);
  const [totalCompra, setTotalCompra] = useState(0);

  // Función para generar filas vacías dinámicamente
  const generateEmptyRows = (count) => {
    let emptyRows = [];
    for (let i = 0; i < count; i++) {
      emptyRows.push(
        <tr key={`empty-${i}`}>
          <td colSpan="4" style={{ height: "25px", border: "1px solid #d2d2d2" }}>
            {/* Fila vacía */}
          </td>
        </tr>
      );
    }
    return emptyRows;
  };
  
  useEffect(() => {
    if (productos.length !== 0 || productos === null) {
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
        "Content-Type": "application/json",
      },
      method: "GET",
      url: `${import.meta.env.VITE_URL}/producto/obtener-productos`,
    };

    setStatus("loading");
    axios
      .request(config)
      .then((response) => {
        setDataProducts(response.data);
        setStatus("succeeded");
      })
      .catch(() => {
        toast.error("Error al obtener los productos");
        setStatus("error");
      });
  }, []);

  useEffect(() => {
    const total = sales.reduce((acc, s) => {
      const precioUnitario =
        s.cantidadCompra >= s.stockMinimo
          ? s.precioMayoreo
          : s.precioMenudeo;
      return acc + s.cantidadCompra * precioUnitario;
    }, 0);
    setTotalCompra(total);
  }, [sales]);

  const handleFindProduct = (data) => {
    const pd = productos.find((p) => p.codigo === data.buscador);
    if (pd) {
      const existingSale = sales.find((s) => s.codigo === pd.codigo);
      if (existingSale) {
        setSales((prevSales) =>
          prevSales.map((s) =>
            s.codigo === existingSale.codigo
              ? { ...s, cantidadCompra: s.cantidadCompra + 1 }
              : s
          )
        );
      } else {
        setSales((prevSales) => [...prevSales, { ...pd, cantidadCompra: 1 }]);
      }
    }
  };

  const onSaveSale = () => {
    if (sales.length === 0) {
      toast.error("No hay productos para vender");
      return;
    }

    const data = {
      productos: sales,
      total: totalCompra,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      url: `${import.meta.env.VITE_URL}/venta/guardar`,
      data,
    };

    axios
      .request(config)
      .then((res) => {
        if (res.data === "Venta guardada exitosamente") {
          toast.success("Venta guardada exitosamente");
          setSales([]);
          setTotalCompra(0);
        } else {
          toast.error("Error al registrar la venta");
        }
      })
      .catch(() => {
        toast.error("Error al registrar la venta");
      });
  };

  return (
    <>
      <Header />

      <div className="relative p-5 w-full h-full">
        <div className="flex flex-row justify-start items-center gap-2 w-full p-5">
          <IoArrowBackOutline size={32} onClick={() => navigate(-1)} />
          <p className="font-bold text-[18px]">Modificar Venta</p>
        </div>
      
        <div className="flex justify-center items-center flex-col gap-5 max-w-[1200px] mx-auto">
          <form
            onSubmit={methods.handleSubmit(handleFindProduct)}
            className="w-[320px] lg:w-[600px]"
          >
            <FormProvider {...methods}>
              <TextField
                placeholder="Buscar venta por código"
                isError={!!methods.formState.errors.search}
                Error={methods.formState.errors.search?.message}
                register={methods.register}
                name="buscador"
                type="text"
                isIcon={true}
                Icon={<IoIosSearch size={32} color="black" />}
              />
            </FormProvider>
          </form>

          <div className="w-full lg:w-[600px] p-5 bg-white shadow-lg rounded-md mt-5">
            <h3 className="text-[18px] lg:text-[20px] font-bold mb-3">Detalles de Venta</h3>
  
            <div className="flex justify-between items-center mb-2">
              <p className="text-[16px]">Cantidad de producto:</p>
              <p className="text-[14px] text-gray-600 text-right">{0}</p>
            </div>
  
            <div className="flex justify-between items-center mb-2">
              <p className="text-[16px]">Vendedor:</p>
              <p className="text-[14px] text-gray-600 text-right">{}</p>
            </div>
  
            <div className="flex justify-between items-center mb-2">
              <p className="text-[16px]">Monto total de la venta:</p>
              <p className="text-[14px] text-gray-600 text-right">{0}</p>
            </div>
            
            <div className="flex justify-between items-center mb-2">
              <p className="text-[16px]">Fecha:</p>
              <p className="text-[14px] text-gray-600 text-right">{}</p>
            </div>
          </div>

        <h2 className="font-bold text-[18px] lg:text-[22px] w-full mt-5">Productos</h2>

          <div className="w-full flex flex-row justify-center items-start gap-5">
            <table className="w-full">
              <thead>
                <tr className="table-row">
                  <th className="border-solid border-[#d2d2d2] border-[1px]">Nombre</th>
                  <th className="border-solid border-[#d2d2d2] border-[1px]">Cantidad</th>
                  <th className="border-solid border-[#d2d2d2] border-[1px]">Precio Unidad</th>
                  <th className="border-solid border-[#d2d2d2] border-[1px]">Total</th>
                </tr>
              </thead>

              <tbody>
                {sales.map((s, index) => {
                  const precioUnitario =
                    s.cantidadCompra >= s.stockMinimo
                      ? s.precioMayoreo
                      : s.precioMenudeo;
                  const total = s.cantidadCompra * precioUnitario;
                  return (
                    <tr key={s.codigo + "-" + index}>
                      <td className="text-center border-solid border-[#d2d2d2] border-[1px]">{s.nombre}</td>
                      <td className="text-center border-solid border-[#d2d2d2] border-[1px]">{s.cantidadCompra}</td>
                      <td className="text-center border-solid border-[#d2d2d2] border-[1px]">{s.precioMenudeo}</td>
                      <td className="text-center border-solid border-[#d2d2d2] border-[1px]">{total}</td>
                    </tr>
                  );
                })}

                {/* Generar filas vacías dinámicamente */}
                {generateEmptyRows(10)} {/* Ajusta el número de filas vacías */}

                {/* Fila de total a pagar */}
                <tr>
                  <td className="border-solid border-[#d2d2d2] border-[1px] text-right" colSpan="3">
                    Total a pagar 
                  </td>
                  <td className="border-solid border-[#d2d2d2] border-[1px] text-center">
                    {totalCompra}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="w-full flex justify-end items-center">
            <div className="w-[200px] h-[40px] lg:w-[300px] lg:h-[50px]">
            <Button
                background="bg-blue"
                isIcon={false}
                texto="Pagar"
                type=""
                Icon={false}
                onClick={onSaveSale}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ViewEditSales.propTypes = {
  productosState: PropTypes.object,
  setDataProducts: PropTypes.func,
  setStatus: PropTypes.func,
};

const mapsStateToProps = (state) => {
  return {
    productosState: state.productos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDataProducts: (data) => dispatch(dataProduct(data)),
    setStatus: (status) => dispatch(actualizarStatus(status)),
  };
};

export default connect(mapsStateToProps, mapDispatchToProps)(ViewEditSales);
