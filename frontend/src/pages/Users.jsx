import { useEffect, useState } from "react";
import PopupUser from "@components/Popup.jsx";
import useDeleteUser from "@hooks/users/useDeleteUser.jsx";
import useEditUser from "@hooks/users/useEditUser.jsx";
import useUsers from "@hooks/users/useGetUsers.jsx";
import UpdateIcon from "../assets/updateIcon.svg";
import UpdateIconDisable from "../assets/updateIconDisabled.svg";
import DeleteIcon from "../assets/deleteIcon.svg";
import DeleteIconDisable from "../assets/deleteIconDisabled.svg";
import RegisterPopup from "@components/RegisterPopup.jsx";
import "@styles/users.css";

const Users = () => {
  const { users, fetchUsers, setUsers } = useUsers();
  const [filterRut, setFilterRut] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isPopupRegisterOpen, setIsPopupRegisterOpen] = useState(false);

  const loadUsers = async () => {
    const usersData = await fetchUsers();
    setUsers(usersData);
  };

  const handleRutFilterChange = (e) => {
    setFilterRut(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.rut.toLowerCase().includes(filterRut.toLowerCase())
  );

  const {
    handleClickUpdate,
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
    dataUser,
    setDataUser,
  } = useEditUser(fetchUsers, setUsers);

  const { handleDelete: deleteFunction } = useDeleteUser(
    fetchUsers,
    setDataUser
  );

  useEffect(() => {
    if (selectedUser && !users.some((user) => user.rut === selectedUser.rut)) {
      setSelectedUser(null);
      console.log("Usuario seleccionado eliminado.", selectedUser);
    }
  }, [users]);

  const handleEditClick = () => {
    if (selectedUser) {
      const userToEdit = users.find((user) => user.rut === selectedUser.rut);
      if (userToEdit) {
        setDataUser([userToEdit]);
        handleClickUpdate();
      } else {
        alert("El usuario seleccionado no existe.");
      }
    } else {
      alert("Selecciona un usuario para editar.");
    }
  };

  const handleDelete = async () => {
    if (selectedUser) {
      try {
        await deleteFunction([selectedUser]);
        setSelectedUser(null);
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
      }
    } else {
      alert("Selecciona un usuario para eliminar.");
    }
  };

  const handleRowSelect = (user) => {
    setSelectedUser(selectedUser?.rut === user.rut ? null : user);
  };

  const handleAddUserClick = () => {
    setIsPopupRegisterOpen(true);
  };

  return (
    <div className="slide-down">
      <div className="main-content bg-none">
        <h1 className="text-4xl font-extrabold text-center text-[#475B63] mb-10 dark:text-[#F3E8EE]">
          Usuarios
        </h1>

        <div className="top-table">
          <div className="button-container-user">
            <input
              value={filterRut}
              onChange={handleRutFilterChange}
              placeholder={"Filtrar por RUT"}
              className="search-input-table placeholder:text-[#475b63] dark:placeholder:text-black dark:bg-[#e8e9e8] dark:border-[#45324f] dark:invert mt-5"
            />
            <div className="filter-actions flex space-x-4">
              <button
                className="create-button-user hover:!bg-[#fff] hover:text-[#475B63] dark:hover:!bg-[#2e2c2f]  dark:hover:text-white dark:text-[#2e2c2f] mt-4"
                onClick={handleAddUserClick}
              >
                Añadir Usuario
              </button>

              <button
                onClick={handleEditClick}
                disabled={!selectedUser}
                className={`group p-3 rounded-md mt-4 transition ${
                  !selectedUser
                    ? "hover-off dark:bg-none dark:text-gray-500"
                    : "bg-none text-black border border-[#bacdb0] hover:bg-[#bacdb0] dark:bg-none dark:text-gray-300 dark:hover:bg-[#bacdb0]"
                }`}
              >
                <img
                  src={selectedUser ? UpdateIcon : UpdateIconDisable}
                  alt="edit"
                  className={`transition group-hover:brightness-0 group-hover:invert !bg-none !shadow-none ${
                    selectedUser ? "group-hover:contrast-1000" : ""
                  }`}
                />
              </button>

              <button
                onClick={handleDelete}
                disabled={!selectedUser}
                className={`group p-3 rounded-md mt-4 transition ${
                  !selectedUser
                    ? "hover-off dark:bg-none dark:text-gray-500"
                    : "bg-white text-black border border-[#bacdb0] hover:bg-[#bacdb0]  dark:text-gray-300 dark:hover:bg-[#bacdb0]"
                }`}
              >
                <img
                  src={
                    dataUser.length === 0 || !selectedUser
                      ? DeleteIconDisable
                      : DeleteIcon
                  }
                  alt="delete"
                  className={`transition group-hover:brightness-0 group-hover:invert !bg-none  ${
                    selectedUser
                      ? "group-hover:contrast-10000 group-hover:brightness-10000"
                      : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-auto rounded-lg shadow md:block">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-[#2e2c2f] border-b-2 border-gray-200 dark:border-[#212121] dark:text-[#fff]">
              <tr>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left"></th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Nombre Completo
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  RUT
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Correo Electrónico
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Rol
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100 dark:bg-[#2e2c2f] dark:divide-[#1c1c1c] dark:text-[#fff]">
              {filteredUsers.map((user, index) => {
                const isSelected = selectedUser?.rut === user.rut;
                return (
                  <tr
                    key={user.rut}
                    className={`${
                      index % 2 === 0
                        ? "bg-white dark:bg-[#353235]"
                        : "bg-[#f3f7f5] dark:bg-[#2e2c2f]"
                    } ${isSelected ? " !bg-[#d3e0cb] dark:!bg-[#585358]" : ""}`}
                    onClick={() => handleRowSelect(user)}
                  >
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap dark:text-[#fff] accent-[#30683e] dark:accent-[#9BCCA3]">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={isSelected}
                        onChange={() => handleRowSelect(user)}
                      />
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap dark:text-[#fff]">
                      {user.nombreCompleto}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap dark:text-[#fff]">
                      {user.rut}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap dark:text-[#fff]">
                      {user.email}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap dark:text-[#fff]">
                      {user.rol}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <PopupUser
          show={isPopupOpen}
          setShow={setIsPopupOpen}
          data={dataUser}
          action={handleUpdate}
        />
        <RegisterPopup
          show={isPopupRegisterOpen}
          setShow={setIsPopupRegisterOpen}
          action={fetchUsers}
        />
      </div>
    </div>
  );
};

export default Users;
