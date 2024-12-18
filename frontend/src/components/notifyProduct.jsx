import CloseIcon from "@assets/XIcon.svg";
import { useRef, useEffect, useState } from "react";

function NotifyProduct({ show, setShow, data }) {
  const popUpRef = useRef(null);

  // Estado para controlar la transición
  const [isVisible, setIsVisible] = useState(false);

  // Filtrar productos sin stock y con pocas unidades
  const productosSinStock = data.filter((product) => product.stock === 0);
  if (productosSinStock.length === 0) {
    productosSinStock.push({ id: 0, name: "No hay productos sin stock" });
  }

  const productosPocasUnidades = data.filter(
    (product) => product.stock < 5 && product.stock > 0
  );
  if (productosPocasUnidades.length === 0) {
    productosPocasUnidades.push({
      id: 0,
      name: "No hay productos con pocas unidades",
    });
  }

  // Controlar la visibilidad y animación
  useEffect(() => {
    if (show) {
      setIsVisible(true); // Espera el tiempo de la animación antes de ocultarlo
    } else {
      setIsVisible(false); // Espera el tiempo de la animación antes de ocultarlo
    }
  }, [show]);

  // Cerrar el popup al hacer clic fuera
  const handleClickOutside = (e) => {
    if (popUpRef.current && !popUpRef.current.contains(e.target)) {
      setShow(false);
    }
  };

  return (
    <div>
      {isVisible && (
        <div
          className="fixed inset-0 z-50 bg-transparent"
          onClick={handleClickOutside}
        >
          <div
            ref={popUpRef}
            className={`prov-popup dark:bg-[#2e2c2f] border border-[black] dark:border-[#F3E8EE] rounded-lg p-6 sm:p-8 dark:text-[#F3E8EE] shadow-lg  absolute top-15 right-4 sm:right-6 w-full sm:w-72 max-w-xs`}
            style={{
              top: "4.2rem", // Ajustado para que no quede encima del navbar
              right: "-0.6rem", // Aseguramos que no se salga del borde derecho
            }}
          >
            <button
              className="close absolute top-0 right-2"
              onClick={() => setShow(false)}
            >
              <img src={CloseIcon} alt="close" />
            </button>
            <h1 className="text-3xl font-extrabold text-center text-[#475B63] dark:text-[#F3E8EE] mb-4">
              NOTIFICACIONES
            </h1>

            <h1 className="text-xl font-extrabold text-center text-[#475B63] dark:text-[#F3E8EE] mb-2">
              Productos agotados
            </h1>
            <ul className="mb-4">
              {productosSinStock.map((product) => (
                <li
                  key={product.id}
                  className="text-[#475B63] dark:text-[#F3E8EE]"
                >
                  {product.name}
                </li>
              ))}
            </ul>

            <h1 className="text-xl font-extrabold text-center text-[#475B63] dark:text-[#F3E8EE] mb-2">
              Pocas unidades
            </h1>
            <ul>
              {productosPocasUnidades.map((product) => (
                <li
                  key={product.id}
                  className="text-[#475B63] dark:text-[#F3E8EE]"
                >
                  {product.name} ({product.stock} unidades)
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotifyProduct;
