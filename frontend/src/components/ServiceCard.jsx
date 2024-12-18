
import updateIcon from "@assets/updateIcon.svg";
import deleteIcon from "@assets/deleteIcon.svg";

const ServiceCard = ({ servicio, onEdit, onDelete }) => {
  const imageUrl = `http://localhost:3000/uploads/${servicio.imagen}`;
  return (
    <div className="flex flex-col items-center bg-[#F3E8EE] border border-[#729B79] rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow max-w-sm dark:bg-[#2e2c2f]">
      {/* Mostrar la imagen si existe */}
      {servicio.imagen && (
        <img
          src={imageUrl}
          alt={servicio.nombre}
          className="w-24 h-24 object-cover rounded-md mb-4"
        />
      )}

      {/* Mostrar el nombre del servicio */}
      <h2 className="text-lg font-bold text-[#475B63] mb-2 text-center dark:text-[#F3E8EE]">
        {servicio.nombre}
      </h2>

      {/* Mostrar la descripción del servicio */}
      <p
        className="text-sm text-[#475B63] text-center mb-4 overflow-hidden whitespace-nowrap text-ellipsis w-full max-w-full dark:text-[#F3E8EE]"
        title={servicio.descripcion}
      >
        {servicio.descripcion}
      </p>

      {/* Botones de editar y eliminar */}
      <div className="flex space-x-4">
        <button
          onClick={() => onEdit(servicio)}
          className="group p-3 white rounded-md hover:bg-[#bacdb0] transition"
        >
          <img
            src={updateIcon}
            alt="Editar"
            className="w-4 h-4 fill-white group-hover:invert group-hover:brightness-0 group-hover:saturate-100 group-hover:contrast-1000"
          />
        </button>
        <button
          onClick={() => onDelete(servicio.idServicio)}
          className="group p-3 white rounded-md hover:bg-red-600 transition"
        >
          <img
            src={deleteIcon}
            alt="Eliminar"
            className="w-4 h-4 group-hover:invert group-hover:brightness-0 group-hover:saturate-100 group-hover:contrast-1000"
          />
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
