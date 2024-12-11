import React from 'react';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

function PopupProductsDetail({ show, setShow, productos, nombreProveedor }) {
  return (
    <div>
      {show && (
        <div className="bg">
          <div className="prov-popup dark:bg-[#2e2c2f] slide-down popup-container">
            <button className="close" onClick={() => setShow(false)}>
              <img src={CloseIcon} alt="Cerrar" />
            </button>
            <h2 className="h2-form dark:text-[#fff] px-4 py-2">Productos Suministrados por: {nombreProveedor}</h2>            
            <div className='textField'>
                {productos && productos.length > 0 ? (
                    <table className="table-auto w-full dark:text-[#fff]">
                      <thead>
                        <tr>
                          <th className="px-4 py-2">Nombre</th>
                          <th className="px-4 py-2">Precio</th>
                          <th className="px-4 py-2">Stock</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productos.map((producto) => (
                          <tr key={producto.id}>
                            <td className="border px-4 py-2">{producto.name}</td>
                            <td className="border px-4 py-2">{producto.price}</td>
                            <td className="border px-4 py-2">{producto.stock}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                ) : (
                    <p>No hay productos disponibles :(</p>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopupProductsDetail;