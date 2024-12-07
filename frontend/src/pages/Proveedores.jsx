import useProveedores from "@hooks/proveedores/useGetProveedores.jsx";
import Search from "../components/Search.jsx";
import PopupProveedores from "../components/PopupProveedores.jsx";
import CreateProveedor from "../components/CreateProveedor.jsx";
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
  const [selectedProveedor, setSelectedProveedor] = useState(null); // Solo un proveedor seleccionado

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

  const handleCreateClick = () => {
    setIsCreatePopupOpen(true);
  };

  const handleRowSelect = (proveedor) => {
    if (selectedProveedor === proveedor.idProveedor) {
      setSelectedProveedor(null);
    } else {
      setSelectedProveedor(proveedor.idProveedor);
    }
  };

  return (
    <div className="main-container">
      <div>
        <div className="top-table">
          <div>
            <h1 className="title-table">Proveedores</h1>
          </div>
          <div className="filter-actions">
            <Search
              value={filterNombre}
              onChange={handleNombreFilterChange}
              placeholder={"Filtrar por nombre"}
            />
            <button
              onClick={handleCreateClick}
              className="create-proveedor-button"
            >
              Añadir Proveedor
            </button>
            <button
              className="edit-proveedor-button"
              onClick={handleEditClick}
              disabled={!selectedProveedor}
            >
              <img
                src={selectedProveedor ? UpdateIcon : UpdateIconDisable}
                alt="edit"
              />
            </button>
            <button
              className="delete-proveedor-button"
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
                        {proveedor.productos_suministrados}
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
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Productos suministrados: {proveedor.productos_suministrados}
                  </p>
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
    </div>
  );
};

export default Proveedores;
