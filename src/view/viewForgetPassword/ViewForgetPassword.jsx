import Logo from "../../image/Logo";
import TextField from "../../components/Form/TextField/TextField";
import Button from "../../components/Buttons/Button";

import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import SearchLoading from "../../components/Loadings/SearchLoading/SearchLoading";
import { Cookies } from "react-cookie";

const ViewForgetPassword = () => {
  const methods = useForm();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const cookie = new Cookies();

  const onSubmit = (data) => {
    setIsLoading(true);
    setIsError(false);
    if (data.email === "") {
      setIsError(true);
      setIsLoading(false);
      return;
    }

    const config = {
      method: "GET",
      url: `${import.meta.env.VITE_URL}/olvide-contrasena?correo=${data.email}`,
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((res) => {
        setMessage(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg-F58A27 w-screen h-screen flex justify-center items-center">
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="bg-white w-[320px] lg:w-[500px] lg:h-[600px] p-5 rounded-md flex flex-col gap-5 justify-center items-center"
      >
        <Logo width={120} height={120} />
        <FormProvider {...methods}>
          {isLoading ? (
            <div className="w-[70px] h-[70px] flex justify-center items-center">
              <SearchLoading />
            </div>
          ) : message ? (
            <p className="text-F58A27 font-bold w-1/2 text-center">{message}</p>
          ) : (
            <div className="flex flex-col gap-5 w-full">
              <TextField
                label="Ingresa tu correo"
                name="email"
                type="email"
                isIcon={false}
                Icon={null}
                isError={false}
                placeholder={"correo@ejemplo.com"}
                register={methods.register}
              />
              {isError && (
                <p className="pl-2 text-error">El correo es requerido</p>
              )}
              <div className="w-[100%] my-2">
                <Button
                  background="bg-F58A27"
                  texto="Recuperar Contraseña"
                  type={"submit"}
                  isIcon={false}
                  Icon={null}
                  onClick={() => {}}
                />
              </div>
            </div>
          )}
        </FormProvider>
      </form>
    </div>
  );
};

export default ViewForgetPassword;
