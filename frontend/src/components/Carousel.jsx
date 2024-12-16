import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination } from "swiper/modules";
import { getServicios } from "@services/servicios.service.js";

const ActiveSlider = () => {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    // Llamada a la API para obtener los servicios
    getServicios().then((data) => {
      setServicios(data);
    });
  }, []);

  return (
    <div className="flex items-center flex-col bg-none">
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          450: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
        }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="max-w-[90%] lg:max-w-[80%]"
      >
        {servicios.map((item) => {
          const imageUrl = item.imagen
            ? `http://localhost:3000/uploads/${item.imagen}`
            : null;

          return (
            <SwiperSlide key={item.idServicio}>
              <div className="relative group shadow-lg rounded-xl overflow-hidden cursor-pointer bg-white border border-[#729B79] dark:bg-[#2e2c2f]">
                {/* Mostrar imagen solo si existe */}
                {imageUrl && (
                  <div
                    className="h-[180px] lg:h-[250px] w-full bg-cover bg-center bg-no-repeat "
                    style={{
                      backgroundImage: `url(${imageUrl})`,
                      backgroundSize: "contain",
                    }}
                  />
                )}
                {/* Fondo blanco para título y descripción */}
                <div className="bg-white p-6 flex flex-col gap-4 dark:bg-[#2e2c2f]">
                  <h1 className="text-xl lg:text-2xl font-semibold text-[#333] dark:text-white">
                    {item.nombre}
                  </h1>
                  <p className="text-sm lg:text-base text-[#666] truncate h-[60px] lg:h-[80px] overflow-hidden dark:text-[#c4c4c4]">
                    {item.descripcion}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ActiveSlider;
