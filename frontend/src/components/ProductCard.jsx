import updateIcon from "@assets/updateIcon.svg";
import deleteIcon from "@assets/deleteIcon.svg";
import { useState } from "react";

const ProductCard = ({ product, onEdit, onDelete, onSell }) => {

    const precio = product.price;
    //formatear precio a pesos chilenos
    const formatter = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        
    });

    
    const [cantidad, setCantidad] = useState(0);
    return (
        <div className="bg-slate-50  border border-[#729B79]  shadow-md rounded-lg p-4 dark:bg-[#2e2c2f]  dark:text-[#F3E8EE]">
            <div className="  border-gray-300 dark:border-[#F3E8EE]">
                <p className="text-lg font-bold text-[#475B63] mb-2 text-center dark:text-[#F3E8EE]">
                    {product.name}
                </p>
                <p
                    className="font-normal text-gray-700 dark:text-[#F3E8EE] text-center "
                    title={product.description}
                >
                    {product.description}
                </p>
                <p>
                    <span className="font-bold dark:text-[#F3E8EE]">Stock:</span> {product.stock}
                </p>
                <p>
                    <span className="font-bold dark:text-[#F3E8EE]">Precio:</span> {formatter.format(precio)}
                </p>
                <hr />
                <div className="flex space-x-1 items-center ">
                    <button
                        onClick={() => onEdit(product)}
                        className="group p-3 white rounded-md hover:bg-[#bacdb0] transition"
                    >
                        <img
                            src={updateIcon}
                            alt="Editar"
                            className="w-4 h-4 fill-white group-hover:invert group-hover:brightness-0 group-hover:saturate-100 group-hover:contrast-1000"
                        />
                    </button>
                    <button
                        onClick={() => onDelete(product.id)}
                        className="group p-3 white rounded-md hover:bg-red-500 transition">
                        <img
                            src={deleteIcon}
                            alt="Eliminar"
                            className="w-4 h-4 group-hover:invert group-hover:brightness-0 group-hover:saturate-100 group-hover:contrast-1000"
                        />
                    </button>
                    <div className="">
                        
                        <input required  className="size-10 m-3 border dark:text-black " type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value)}/>
                        <button
                            onClick={() => onSell(product,cantidad )}
                            className="text-white bg-[#bacdb0] border group my-4 p-2 white rounded-md hover:bg-green-400  transition">
                            Vender
                        </button>
                    </div>

                </div>
            </div>
        </div>

    );
};

export default ProductCard;