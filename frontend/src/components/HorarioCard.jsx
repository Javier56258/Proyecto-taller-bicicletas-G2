import updateIcon from "@assets/updateIcon.svg";
import deleteIcon from "@assets/deleteIcon.svg";

const HorarioCard = ({ horario, onEdit, onDelete }) => {
  return (
    <div className="horario-card">
      {horario.imagen && <img src={horario.imagen} style={{ width: "100px", height: "100px" }} />}
      <p>{horario.hora}</p>
      <button onClick={() => onEdit(horario)}>
        <img src={updateIcon} alt="Editar" />
      </button>
      <button onClick={() => onDelete(horario.id)}>
        <img src={deleteIcon} alt="Eliminar" />
      </button>
    </div>
  );
};

export default HorarioCard;