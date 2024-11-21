import { useState } from "react";
import Logo from "../../../image/Logo";
import { FormProvider, useForm } from "react-hook-form";
import TextField from "../../../components/Form/TextField/TextField";
import Button from "../../../components/Buttons/Button";
import { IoIosEyeOff, IoIosEye } from "react-icons/io";
import { Passwords } from "../../../schema/SchemaUser";
import SearchLoading from "../../../components/Loadings/SearchLoading/SearchLoading";
import axios from "axios";

const ViewForgetPasswordAction = () => {
  const methods = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    const result = Passwords.safeParse(data);
    if (result.success) {
      setIsLoading(true);
      const data = {
        token,
        password: result.data.password,
      };
      axios
        .put(`${import.meta.env.VITE_URL}/cambiar-contrasena`, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          setMessage(res.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setIsLoading(false);
      methods.clearErrors();
      result.error.errors.forEach((error) => {
        const fieldName = Array.isArray(error.path)
          ? error.path[0]
          : error.path;
        if (fieldName) {
          methods.setError(fieldName, {
            type: "manual",
            message: error.message,
          });
        }
      });
    }
  };

  return (
    <div className="w-screen h-screen bg-F58A27 flex justify-center items-center">
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="bg-white w-[320px] lg:w-[500px] lg:h-[600px] p-5 rounded-md flex flex-col gap-5 justify-center items-center"
      >
        <FormProvider {...methods}>
          <Logo width={120} height={120} />

          {isLoading ? (
            <div className="w-[70px] h-[70px] flex justify-center items-center">
              <SearchLoading />
            </div>
          ) : message ? (
            <p className="text-F58A27 font-bold w-1/2 text-center">{message}</p>
          ) : (
            <div className="flex flex-col gap-5 w-full">
              <TextField
                label="Ingresa tu nueva contraseña"
                name="password"
                type={isPasswordVisible ? "text" : "password"}
                isIcon={true}
                register={methods.register}
                Icon={
                  isPasswordVisible ? (
                    <IoIosEye
                      size={24}
                      color="gray"
                      onClick={() => setIsPasswordVisible(false)}
                    />
                  ) : (
                    <IoIosEyeOff
                      size={24}
                      color="gray"
                      onClick={() => setIsPasswordVisible(true)}
                    />
                  )
                }
                isError={!!methods.formState.errors.password}
                Error={methods.formState.errors.password?.message}
                placeholder={"********"}
              />

              <TextField
                label="Confirma tu nueva contraseña"
                name="confirmPassword"
                type={isConfirmPasswordVisible ? "text" : "password"}
                isIcon={true}
                register={methods.register}
                Icon={
                  isConfirmPasswordVisible ? (
                    <IoIosEye
                      size={24}
                      color="gray"
                      onClick={() => setIsConfirmPasswordVisible(false)}
                    />
                  ) : (
                    <IoIosEyeOff
                      size={24}
                      color="gray"
                      onClick={() => setIsConfirmPasswordVisible(true)}
                    />
                  )
                }
                isError={!!methods.formState.errors.confirmPassword}
                Error={methods.formState.errors.confirmPassword?.message}
                placeholder={"********"}
              />

              <Button
                type="submit"
                texto="Iniciar Sesión"
                isIcon={false}
                Icon={null}
                background="bg-F58A27"
                onClick={() => {}}
              />
            </div>
          )}
        </FormProvider>
      </form>
    </div>
  );
};

export default ViewForgetPasswordAction;
