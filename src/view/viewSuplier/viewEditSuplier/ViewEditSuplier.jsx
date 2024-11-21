import Header from "../../../components//Header/Header";
import TextField from "../../../components/Form/TextField/TextField";
import { FormProvider, useForm } from "react-hook-form";
import { IoArrowBackOutline } from "react-icons/io5";
import Button from "../../../components/Buttons/Button";
import { AiOutlineSave } from "react-icons/ai";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  dataProveedores,
  updateStatus,
} from "../../../store/slices/proveedor/proveedor_reducers";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SchemeSuplier } from "../../../schema/SchemaSuplier";
import { zodResolver } from "@hookform/resolvers/zod";

import ImageSuplier from "../../../../public/proveedor.png";
import axios from "axios";
import toast from "react-hot-toast";
import { Cookies } from "react-cookie";

const ViewEditSuplier = ({ proveedoresState }) => {
  const methods = useForm({
    resolver: zodResolver(SchemeSuplier),
    mode: "onChange",
  });
  const { id } = useParams();
  const { proveedores } = proveedoresState;
  const navigate = useNavigate();
  const [proveedor, setProveedor] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (proveedores.length === 0) {
      navigate("/supliers");
    }
  }, [proveedores, navigate]);

  useEffect(() => {
    if (id) {
      proveedores.filter((p) => {
        const currentSuplier = p.idPersona === id ? p : null;
        if (currentSuplier) {
          setProveedor(currentSuplier);
          methods.setValue("nombre", currentSuplier.nombre);
          methods.setValue("telefono", currentSuplier.telefono);
          methods.setValue("correo", currentSuplier.correo);
          methods.setValue("rfc", currentSuplier.rfc);
          methods.setValue("ciudad", currentSuplier.ciudad);
          methods.setValue("colonia", currentSuplier.colonia);
          methods.setValue("calle", currentSuplier.calle);
          methods.setValue("numero", currentSuplier.numero);
        }
      });
    }
  }, [id, methods, proveedores]);

  const cookie = new Cookies();

  const handleSubmit = (data) => {
    const config = {
      method: "PUT",
      url: `${import.meta.env.VITE_URL}/proveedor/actualizar-proveedor?id=${
        proveedor.idPersona
      }`,
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      data,
    };

    setIsLoading(true);
    axios
      .request(config)
      .then((response) => {
        console.log(response);
        if (
          response.status === 201 &&
          response.data.message === "Proveedor actualizado correctamente"
        ) {
          navigate("/supliers");
        }
      })
      .catch(() => {
        setIsLoading(false);
        toast.error("Error al crear el proveedor");
      });
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center items-center my-5">
        <div className="flex flex-row justify-start items-center gap-2 w-full p-5">
          <IoArrowBackOutline size={32} onClick={() => navigate(-1)} />
          <p className="text-[18px] font-bold">Editar Proveedor</p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-center lg:items-start lg:gap-[50px] lg:w-full">
        <picture className="hidden lg:flex">
          <img
            src={ImageSuplier}
            className="w-[150px] rounded-full shadow-md object-fill"
          />
        </picture>

        <form
          className="w-[360px] lg:w-[50%] flex flex-col gap-5 justify-center items-center"
          onSubmit={methods.handleSubmit(handleSubmit)}
        >
          <FormProvider {...methods}>
            <TextField
              label="Nombre"
              name="nombre"
              type="text"
              Icon={false}
              isIcon={false}
              Error={methods?.formState.errors?.nombre?.message}
              isError={!!methods?.formState.errors?.nombre?.message}
              placeholder={"Nombre completo"}
              register={methods.register}
            />

            <TextField
              label="Teléfono"
              name="telefono"
              type="text"
              Icon={false}
              Error={methods?.formState.errors?.telefono?.message}
              isError={!!methods?.formState.errors?.telefono?.message}
              isIcon={false}
              placeholder={"5512345678"}
              register={methods.register}
            />

            <TextField
              label="Correo electrónico"
              name="correo"
              type="text"
              Error={methods?.formState.errors?.correo?.message}
              isError={!!methods?.formState.errors?.correo?.message}
              Icon={false}
              isIcon={false}
              placeholder={"example@gmail.com"}
              register={methods.register}
            />

            <TextField
              label="RFC"
              name="rfc"
              type="text"
              Error={methods?.formState.errors?.rfc?.message}
              isError={!!methods?.formState.errors?.rfc?.message}
              Icon={false}
              isIcon={false}
              placeholder={"AAAA######XXX"}
              register={methods.register}
            />

            <TextField
              label="Calle"
              name="calle"
              type="text"
              Error={methods?.formState.errors?.calle?.message}
              isError={!!methods?.formState.errors?.calle?.message}
              Icon={false}
              isIcon={false}
              placeholder={"Lucio Blanco"}
              register={methods.register}
            />

            <TextField
              label="Número de Domicilio"
              name="numero"
              type="text"
              Error={methods?.formState.errors?.numero?.message}
              isError={!!methods?.formState.errors?.numero?.message}
              Icon={false}
              isIcon={false}
              placeholder={"18, s/n, 3-B"}
              register={methods.register}
            />

            <TextField
              label="Colonia"
              name="colonia"
              type="text"
              Error={methods?.formState.errors?.colonia?.message}
              isError={!!methods?.formState.errors?.colonia?.message}
              Icon={false}
              isIcon={false}
              placeholder={"Colónia del Proveedor"}
              register={methods.register}
            />

            <TextField
              label="Ciudad"
              name="ciudad"
              type="text"
              Error={methods?.formState.errors?.ciudad?.message}
              isError={!!methods?.formState.errors?.ciudad?.message}
              Icon={false}
              isIcon={false}
              placeholder={"Xalapa"}
              register={methods.register}
            />
            <div className="w-full h-[40px] lg:h-[50px] lg:w-[50%] flex justify-center items-center">
              <Button
                background="bg-blue"
                isIcon={true}
                texto="Guardar"
                type="submit"
                isLoading={isLoading}
                Icon={<AiOutlineSave size={32} />}
                onClick={() => {}}
              />
            </div>
          </FormProvider>
        </form>
      </div>
    </div>
  );
};

ViewEditSuplier.propTypes = {
  setDataProveedores: PropTypes.func,
  setStatus: PropTypes.func,
  proveedoresState: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    proveedoresState: state.proveedores,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDataProveedores: (data) => dispatch(dataProveedores(data)),
    setStatus: (status) => dispatch(updateStatus(status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewEditSuplier);
