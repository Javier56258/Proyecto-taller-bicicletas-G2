import CloseIcon from "@assets/XIcon.svg";
import { useRef } from "react";

function NotifyProduct({ show, setShow, data }) {

    const popUpRef = useRef(null);

    //mostrar productos sin stock
    const productosSinStock = data.filter(product => product.stock === 0);
    if (productosSinStock.length === 0) {
        productosSinStock.push({ id: 0, name: "No hay productos agotados" });
    }

    //mostrar productos con pocas unidades
    const productosPocasUnidades = data.filter(product => product.stock < 5 && product.stock > 0);
    if (productosPocasUnidades.length === 0) {
        productosPocasUnidades.push({ id: 0, name: "No hay productos con pocas unidades" });
    }


    const handleClickOutside = (e) => {
        if (popUpRef.current && !popUpRef.current.contains(e.target)) {
            setShow(false);
        }
    }



 return(
    <div>
        {show && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center" onClick={handleClickOutside}>
                <div ref={popUpRef} className="prov-popup dark:bg-[#2e2c2f] slide-down border border-[black] dark:border-[#F3E8EE] rounded-lg p-8  dark:text-[#F3E8EE] ">
                    <button className="close" onClick={() => setShow(false)}>
                        <img src={CloseIcon} />
                    </button>
                    <h1 className="text-3xl font-extrabold text-center text-[#475B63] dark:text-[#F3E8EE] mb-5 ">NOTIFICACIONES</h1>
                    
                    <h1 className="text-xl font-extrabold text-center text-[#475B63] dark:text-[#F3E8EE] mb-1">Productos agotados</h1>
                    <ul className="mb-5">
                        {productosSinStock.map((product) => (
                            <li 
                            key={product.id}
                            className="text-[#475B63] dark:text-[#F3E8EE] "
                            >{product.name} </li>
                        ))}
                    </ul>
                    
                    <h1 className="text-xl font-extrabold text-center text-[#475B63] dark:text-[#F3E8EE] mb-1 ">Pocas unidades</h1>
                    <ul>
                        {productosPocasUnidades.map((product) => (
                            <li 
                            key={product.id}
                            className="text-[#475B63] dark:text-[#F3E8EE] "
                            >{product.name} ({product.stock} unidades)  </li>
                        ))}
                    </ul>
                </div>
            </div>
        )}
    </div>

 )
}

export default NotifyProduct;

