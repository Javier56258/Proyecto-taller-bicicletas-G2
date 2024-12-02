// Home.jsx
import "@styles/home.css";
import Navbar from "../components/Navbar";

const Home = () => {

  return (
    <div className="home-container">
      <Navbar />
      <h1>Bienvenido a la Página de Inicio</h1>
      {/* Otros contenidos de la página de inicio */}
    </div>
  );
};

export default Home;
