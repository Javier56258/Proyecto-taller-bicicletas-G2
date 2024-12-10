import "@styles/home.css";
const HorarioCardPublic = ({ horario }) => {
    return (
      <div className="home-service-card">
        <p>{horario.hora}</p>
      </div>
    );
  };

  
export default HorarioCardPublic;