import updateIcon from "@assets/updateIcon.svg";
import deleteIcon from "@assets/deleteIcon.svg";


const ProductCard = ({ product, onEdit, onDelete }) => {
    return (
        <div className= "max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" >
            <h2 className="text-lg font-bold text-[#475B63] mb-2 text-center dark:text-[#F3E8EE]">
                {product.name}
            </h2>
            <p
                className="font-normal text-gray-700 dark:text-gray-400"
                title={product.description}
            >
                {product.description}
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
    );
};

export default ProductCard;