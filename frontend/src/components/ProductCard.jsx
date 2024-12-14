import updateIcon from "@assets/updateIcon.svg";
import deleteIcon from "@assets/deleteIcon.svg";


const ProductCard = ({ product, onEdit, onDelete }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <div className=" " >
                <p className="text-lg font-bold text-[#475B63] mb-2 text-center dark:text-[#F3E8EE]">
                    {product.name}
                </p>
                <p
                    className="font-normal text-gray-700 dark:text-gray-400"
                    title={product.description}
                >
                    {product.description}
                </p>
                <p>
                    <span className="font-bold">Stock:</span> {product.stock}
                </p>
                <p>
                    <span className="font-bold">Precio:</span> ${product.price}
                </p>
                <div className="flex space-x-4">
                    <button
                        onClick={() => onEdit(product)}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                </div>
            </div>
        </div>

    );
};

export default ProductCard;