import useProveedores from "@hooks/proveedores/useGetProveedores.jsx";
import PopupProveedores from "../components/PopupProveedores.jsx";
import PopupProductsDetail from '../components/PopupProductsDetail.jsx';
import CreateProveedor from "../components/CreateProveedor.jsx";
import AssignProveedorProduct from "../components/AssignProveedorProduct.jsx";
import DeleteIcon from "../assets/deleteIcon.svg";
import UpdateIcon from "../assets/updateIcon.svg";
import UpdateIconDisable from "../assets/updateIconDisabled.svg";
import DeleteIconDisable from "../assets/deleteIconDisabled.svg";
import { useEffect, useState } from "react";
import useEditProveedor from "@hooks/proveedores/useEditProveedor";
import useDeleteProveedor from "@hooks/proveedores/useDeleteProveedor";
import "@styles/proveedor.css";

const Proveedores = () => {
  const { proveedores, fetchProveedores, setProveedores } = useProveedores();
  const [filterNombre, setFilterNombre] = useState("");
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isAssignPopupOpen, setIsAssignPopupOpen] = useState(false); 
  const [selectedProveedor, setSelectedProveedor] = useState(null); 
  const [proveedorAssign, setProveedorAssign] = useState(null); 
  const [isPopupProductsDetailOpen, setIsPopupProductsDetailOpen] = useState(false);
  const [productosProveedor, setProductosProveedor] = useState([]);
  const [nombreProveedor, setNombreProveedor] = useState("");


  const {
    handleClickUpdate,
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
    dataProveedor,
    setDataProveedor,
  } = useEditProveedor(setProveedores, fetchProveedores);



  useEffect(() => {
    console.log("Proveedor seleccionado: ", selectedProveedor);
  }, [selectedProveedor]);

  useEffect(() => {
    if (
      selectedProveedor &&
      !proveedores.some((p) => p.idProveedor === selectedProveedor.idProveedor)
    ) {
      setSelectedProveedor(null);
    }
  }, [proveedores]);

  const handleDelete = async () => {
    console.log("Proveedor seleccionado antes de eliminar:", selectedProveedor);

    if (selectedProveedor) {
      const { handleDelete: deleteFunction } =
        useDeleteProveedor(fetchProveedores);

      try {
        await deleteFunction([selectedProveedor]);
        setSelectedProveedor(null); // Limpiar la selección después de eliminar
      } catch (error) {
        console.error("Error al eliminar el proveedor:", error);
      }
    } else {
      alert("Selecciona un proveedor para eliminar.");
    }
  };

  const handleNombreFilterChange = (e) => {
    setFilterNombre(e.target.value);
  };

  const handleEditClick = () => {
    if (selectedProveedor) {
      const proveedorSeleccionado = proveedores.find(
        (proveedor) => proveedor.idProveedor === selectedProveedor
      );

      if (proveedorSeleccionado) {
        setDataProveedor(proveedorSeleccionado);
        handleClickUpdate();
      } else {
        alert("El proveedor seleccionado no existe.");
      }
    } else {
      alert("Selecciona un proveedor para editar.");
    }
  };

  const handleDetailClick = (productos, nombreProveedor) => {
    if (productos) {
      setProductosProveedor(productos);
      setNombreProveedor(nombreProveedor);
      setIsPopupProductsDetailOpen(true);
    } else {
      alert("El proveedor seleccionado no existe.");
    }
  };

  const handleCreateClick = () => {
    setIsCreatePopupOpen(true);
  };

  const handleAssignClick = () => {
    if (selectedProveedor) {
      const proveedorAssign = proveedores.find(
        (proveedor) => proveedor.idProveedor === selectedProveedor
      );
      setProveedorAssign(proveedorAssign); // Actualiza el estado de proveedorAssign
      setIsAssignPopupOpen(true);
    } else {
      alert("Selecciona un proveedor para asignar productos.");
    }
  };

  const handleRowSelect = (proveedor) => {
    if (selectedProveedor === proveedor.idProveedor) {
      setSelectedProveedor(null);
    } else {
      setSelectedProveedor(proveedor.idProveedor);
    }
  };

  return (
    <div className="slide-down">
    <div className="main-content bg-none">
      <h1 className="text-4xl font-extrabold text-center text-[#475B63] mb-10 dark:text-[#F3E8EE]">
        Proveedores
      </h1>
      <div>
        <div className="top-table">
          
            <div className="button-container">
              <input
                value={filterNombre}
                onChange={handleNombreFilterChange} 
                placeholder={"Filtrar por nombre"}
                className="search-input-table placeholder:text-[#475b63] dark:placeholder:text-black dark:bg-[#e8e9e8] dark:border-[#45324f] dark:invert mt-5"
              />
              <div className="right-buttons">
                  <button
                    className={`create-button dark:hover:bg-[#2e2c2f] dark:hover:text-white dark:text-[#2e2c2f] mt-4 ${!selectedProveedor ? 'disabled-button hover-off' : ''}`}
                    onClick={handleAssignClick}
                    disabled={!selectedProveedor}
                  >
                  Asignar Productos
                  </button>
                  <button
                    onClick={handleCreateClick}
                    className="create-button dark:hover:bg-[#2e2c2f] dark:hover:text-white dark:text-[#2e2c2f] mt-4"
                  >
                  Añadir Proveedor
                  </button>
                  <button
                    className={`group p-3 white rounded-md hover:bg-[#bacdb0] transition mt-4 ${!selectedProveedor ? 'hover-off' : ''}`}
                    onClick={handleEditClick}
                    disabled={!selectedProveedor}
                  >
                  <img
                    src={selectedProveedor ? UpdateIcon : UpdateIconDisable}
                    alt="edit"
                  />
                  </button>
                  <button
                    className={`group p-3 white rounded-md hover:bg-[#bacdb0] transition mt-4 ${!selectedProveedor ? 'hover-off' : ''}`}
                    disabled={!selectedProveedor}
                    onClick={handleDelete}
                  >
                  <img
                    src={selectedProveedor ? DeleteIcon : DeleteIconDisable}
                    alt="delete"
                  />
                  </button>
              </div>
      </div>
  </div>
        {/* Tabla visible en pantallas medianas y grandes */}
        <div className="overflow-auto rounded-lg shadow hidden md:block">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-[#2e2c2f] border-b-2 border-gray-200 dark:border-[#212121] dark:text-[#fff]">
              <tr>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left"></th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Nombre
                </th>
                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                  Productos Suministrados
                </th>
                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                  Página Web
                </th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Teléfono
                </th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Correo electrónico
                </th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Dirección
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100 dark:bg-[#2e2c2f] dark:divide-[#1c1c1c] dark:text-[#fff]">
              {proveedores
                .filter((proveedor) =>
                  proveedor.nombreProveedor
                    .toLowerCase()
                    .includes(filterNombre.toLowerCase())
                )
                .map((proveedor, index) => {
                  const isSelected =
                    selectedProveedor === proveedor.idProveedor;
                  return (
                    <tr
                      key={proveedor.idProveedor}
                      className={`${
                        index % 2 === 0
                          ? "bg-white dark:bg-[#353235]"
                          : "bg-[#f3f7f5] dark:bg-[#2e2c2f]"
                      }${
                        isSelected ? " !bg-[#d3e0cb] dark:!bg-[#585358]" : ""
                      }`}
                      onClick={() => handleRowSelect(proveedor)}
                    >
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap dark:text-[#fff] accent-[#30683e] dark:accent-[#9BCCA3]">
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          checked={isSelected}
                          onChange={() => handleRowSelect(proveedor)}
                        />
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap dark:text-[#fff]">
                        {proveedor.nombreProveedor}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap dark:text-[#fff]">
                        {proveedor.productos.length > 0 && (
                          <button
                            className="text-blue-500 hover:underline"
                            onClick={() => handleDetailClick(proveedor.productos, proveedor.nombreProveedor)}
                          >
                            Ver detalle
                          </button>
                          )}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap dark:text-[#fff]">
                        <a
                          href={proveedor.PaginaWeb}
                          className="text-[#567048] hover:underline dark:text-[#BACDB0]"
                        >
                          {proveedor.PaginaWeb}
                        </a>
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap dark:text-[#fff]">
                        {proveedor.telefono}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap dark:text-[#fff]">
                        {proveedor.email}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap dark:text-[#fff]">
                        {proveedor.direccion}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {/* Tarjetas visibles solo en pantallas pequeñas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:hidden px-4">
          {proveedores
            .filter((proveedor) =>
              proveedor.nombreProveedor
                .toLowerCase()
                .includes(filterNombre.toLowerCase())
            )
            .map((proveedor, index) => {
              const isSelected = selectedProveedor === proveedor.idProveedor;
              return (
                <div
                  key={proveedor.idProveedor}
                  className={`card border dark:border-[#212121] rounded-lg shadow-lg p-4 ${
                    index % 2 === 0
                      ? "bg-white dark:bg-[#353235]"
                      : "bg-[#f3f7f5] dark:bg-[#2e2c2f]"
                  }${isSelected ? " bg-[#d3e0cb] dark:bg-[#585358]" : ""}`}
                  onClick={() => handleRowSelect(proveedor)}
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {proveedor.nombreProveedor}
                    </h2>
                  </div>
                  {proveedor.productos.length > 0 && (
                    <button
                      className="text-blue-500 hover:underline mt-2"
                      onClick={(e) => {
                        e.stopPropagation(); // Evita que el click en el botón seleccione la tarjeta
                        handleDetailClick(proveedor.productos, proveedor.nombreProveedor);
                      }}
                    >
                      Ver detalle de productos
                    </button>
                  )}
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Teléfono: {proveedor.telefono}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Correo electrónico: {proveedor.email}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Dirección: {proveedor.direccion}
                  </p>
                  <a
                    href={proveedor.PaginaWeb}
                    className="text-[#567048] hover:underline dark:text-[#BACDB0] mt-2 block"
                  >
                    Página Web
                  </a>
                </div>
              );
            })}
        </div>
      </div>

      <PopupProveedores
        show={isPopupOpen}
        setShow={setIsPopupOpen}
        data={dataProveedor}
        action={handleUpdate}
      />

      <CreateProveedor
        show={isCreatePopupOpen}
        setShow={setIsCreatePopupOpen}
        action={fetchProveedores}
      />

      <AssignProveedorProduct
        show={isAssignPopupOpen}
        setShow={setIsAssignPopupOpen}
        data={proveedorAssign} // Pasar el proveedor seleccionado
        action={fetchProveedores}
      />
      <PopupProductsDetail
          show={isPopupProductsDetailOpen}
          setShow={setIsPopupProductsDetailOpen}
          productos={productosProveedor}
          nombreProveedor={nombreProveedor}
        />
    </div>
    </div>
  );
};

export default Proveedores;
