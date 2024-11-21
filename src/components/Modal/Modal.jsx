import PropTypes from "prop-types";

const Modal = ({ text, onDelete, onCancel, isLoading }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-20 w-[300px] lg:w-[400px] mx-auto border-[#a2a2a2] border-[0.5px] border-solid shadow-md rounded-lg bg-white">
      <div className="p-5">
        <h2 className="text-center">{text}</h2>
      </div>

      <div className="flex w-full">
        <button
          onClick={onCancel}
          className="w-1/2 bg-error text-white py-2 rounded-l-lg"
        >
          Cancelar
        </button>
        <button
          disabled={isLoading}
          onClick={onDelete}
          className="w-1/2 bg-succes text-white py-2 rounded-r-lg btn-times"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  text: PropTypes.string.isRequired,
  onDelte: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default Modal;
