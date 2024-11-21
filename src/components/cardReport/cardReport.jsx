const CardReport = ({ nombre, precio, cantidadVendida, imageUrl }) => {
  console.log(imageUrl)
  return (
    <div className="relative border rounded-lg overflow-hidden shadow-lg h-72 w-60 sm:w-64 my-1 mx-1 transition-transform duration-300 transform hover:scale-100"> 
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})`}} 
     
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4"> 
        <p className="font-bold text-xl text-white">Nombre: {nombre}</p>
        <p className="font-bold text-xl text-white">Precio: {precio}</p>
        <p className="font-bold text-xl text-white">Cantidad Vendida: {cantidadVendida}</p>
      </div>
    </div>
  );
};

export default CardReport;
