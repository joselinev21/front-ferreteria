import axios from "axios";
import { useState } from "react";
import { Cookies } from "react-cookie";
import toast from "react-hot-toast";

const FormSendEmail = ({
  asunto,
  setAsunto,
  mensaje,
  setMensaje,
  sendEmail,
}) => (
  <div className="w-[500px] bg-primary rounded-md">
    <form
      className="flex justify-center items-center flex-col gap-5 p-5"
      onSubmit={(e) => {
        e.preventDefault();
        sendEmail();
      }}
    >
      <input
        type="text"
        placeholder="Asunto"
        value={asunto}
        className="p-2 rounded-md w-[80%] bg-[#f2f2f2]"
        onChange={(e) => setAsunto(e.target.value)}
        required
      />
      <textarea
        cols="30"
        rows="10"
        placeholder="Mensaje"
        className="p-2 rounded-md w-[80%]"
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        required
      ></textarea>
      <button
        type="submit"
        className="bg-succes p-2 w-[300px] rounded-md text-white"
      >
        Enviar
      </button>
    </form>
  </div>
);

const ModalEmail = ({ producto, close }) => {
  const cookie = new Cookies();
  const [showModal, setShowModal] = useState(false);
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");

  const sendEmail = async () => {
    if (!asunto || !mensaje) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${cookie.get("token")}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        url: `${import.meta.env.VITE_URL}/enviar-correo?id=${
          producto?.idProveedor
        }`,
        data: { asunto, mensaje },
      };

      axios
        .request(config)
        .then((res) => {
          if (res.data.status === 200) {
            setShowModal(false);
            close();
          }
        })
        .catch(() => {
          toast.error("Error al enviar el correo");
        });
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      alert("Error al enviar el correo");
    }
  };

  return (
    <div className="bg-black/70 absolute h-screen w-screen z-50 flex justify-center items-center">
      {showModal ? (
        <FormSendEmail
          asunto={asunto}
          setAsunto={setAsunto}
          mensaje={mensaje}
          setMensaje={setMensaje}
          sendEmail={sendEmail}
        />
      ) : (
        <div className="bg-white w-[50%] rounded-md p-5 flex flex-col justify-center items-center gap-2">
          <div className="flex flex-col justify-center items-center gap-3">
            <p className="font-bold text-center">
              No hay suficiente material disponible del{" "}
              {producto?.nombre || "Producto"}
            </p>
            <p className="font-bold text-center">
              ¿Quiere enviar correo al proveedor de este producto para completar
              esta compra?
            </p>
          </div>
          <p className="font-bold text-error/80 text-center p-5 text-[12px]">
            La llegada del material restante depende de la disponibilidad del
            proveedor
          </p>

          <div className="flex flex-row justify-evenly items-center gap-5 w-[80%]">
            <button
              onClick={close}
              className="cursor-pointer bg-error p-2 rounded-md text-white text-[15px]"
            >
              Cancelar
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="cursor-pointer bg-succes p-2 rounded-md text-white text-[15px]"
            >
              Enviar correo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalEmail;
