import Table from "@components/Table";
import useProveedores from "@hooks/proveedores/useGetProveedores.jsx";
import Search from "../components/Search.jsx";
import PopupProveedores from "../components/PopupProveedores.jsx";
import CreateProveedor from "../components/CreateProveedor.jsx";
import DeleteIcon from "../assets/deleteIcon.svg";
import UpdateIcon from "../assets/updateIcon.svg";
import UpdateIconDisable from "../assets/updateIconDisabled.svg";
import DeleteIconDisable from "../assets/deleteIconDisabled.svg";
import { useCallback, useState } from "react";
import useEditProveedor from "@hooks/proveedores/useEditProveedor";
import useDeleteProveedor from "@hooks/proveedores/useDeleteProveedor";
import "@styles/proveedor.css";

const Proveedores = () => {
  const { proveedores, fetchProveedores, setProveedores } = useProveedores();
  const [filterNombre, setFilterNombre] = useState("");
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);

  const {
    handleClickUpdate,
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
    dataProveedor,
    setDataProveedor,
  } = useEditProveedor(setProveedores, fetchProveedores);

  const { handleDelete } = useDeleteProveedor(
    fetchProveedores,
    setDataProveedor
  );

  const handleNombreFilterChange = (e) => {
    setFilterNombre(e.target.value);
  };

  const handleCreateClick = () => {
    setIsCreatePopupOpen(true);
  };

  const handleSelectionChange = useCallback(
    (selectedProveedores) => {
      setDataProveedor(selectedProveedores);
    },
    [setDataProveedor]
  );

  const columns = [
    { title: "ID", field: "idProveedor", width: 50, responsive: 0 },
    { title: "Nombre", field: "nombreProveedor", width: 200, responsive: 0 },
    {
      title: "Productos Suministrados",
      field: "productos_suministrados",
      width: 200,
      responsive: 2,
    },
    { title: "Página Web", field: "PaginaWeb", width: 200, responsive: 2 },
    { title: "Teléfono", field: "telefono", width: 100, responsive: 2 },
    { title: "Correo electrónico", field: "email", width: 250, responsive: 3 },
    { title: "Dirección", field: "direccion", width: 200, responsive: 2 },
  ];

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
              onClick={handleClickUpdate}
              disabled={dataProveedor.length === 0}
            >
              {dataProveedor.length === 0 ? (
                <img src={UpdateIconDisable} alt="edit-disabled" />
              ) : (
                <img src={UpdateIcon} alt="edit" />
              )}
            </button>
            <button
              className="delete-proveedor-button"
              disabled={dataProveedor.length === 0}
              onClick={() => handleDelete(dataProveedor)}
            >
              {dataProveedor.length === 0 ? (
                <img src={DeleteIconDisable} alt="delete-disabled" />
              ) : (
                <img src={DeleteIcon} alt="delete" />
              )}
            </button>
          </div>
        </div>
        <div>
          <Table
            data={proveedores}
            columns={columns}
            filter={filterNombre}
            dataToFilter={"nombreProveedor"}
            initialSortName={"nombreProveedor"}
            onSelectionChange={handleSelectionChange}
          />
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
