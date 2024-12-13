import React, { useState, useEffect } from 'react';
import Form from './Form';
import '@styles/popup.css';
import CloseIcon from "@assets/XIcon.svg";
import { assignProveedorProduct } from "@services/proveedor.service.js";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert"; 
import { getProducts } from '@services/product.service.js';


function AssignProveedorProduct({ show, setShow, data, action }) {

    const proveedorData = data || {};
    console.log("Proveedor seleccionado para asignar: ", proveedorData);

    const [productos, setProductos] = useState([]);    
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleChange = (selectedOptions) => {
      setSelectedOptions(selectedOptions);
    };
    
    useEffect(() => {
      if (show) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }
      return () => {
        document.body.classList.remove('no-scroll');
      };
    }, [show]);
    
      
  
    useEffect(() => {
      const fetchProductos = async () => {
        try {
          const productosData = await getProducts();
          setProductos(productosData);
        } catch (error) {
          console.error('Error al obtener los productos:', error);
        }
      };
  
      fetchProductos();
    }, []);  
    console.log("Productos disponibles para asignar: ", productos);
    
    const handleAssignProduct = async (formData) => {
        try {

          const idProveedor = proveedorData.idProveedor;
          const productIds = selectedOptions.map(option => option.value);

          const data = {
            idProveedor,
            productIds, 
          };

          await assignProveedorProduct(data);
          action();
          setShow(false);
          showSuccessAlert("Producto asignado", "El producto ha sido asignado correctamente.");
        } catch (error) {
          showErrorAlert("Error", "No se pudo asignar el producto.");
        }
      };

    const productOptions = productos.map(producto => ({
      value: producto.id,
      label: producto.proveedor ? `${producto.name} - ${producto.proveedor.name}` : producto.name,    
    }));


      return (
        <div>
        {show && (
        <div className="bg">
          <div className="prov-popup dark:bg-[#2e2c2f] slide-down">
            <button className="close" onClick={() => setShow(false)}>
              <img src={CloseIcon} alt="Cerrar" />
            </button>
            <div className="form-container">
              <div className="form-group">
              </div>
              <Form
                title="Asignar Productos"
                fields={[
                  {
                    label: "Proveedor Seleccionado: ",
                    name: "nombreProveedor",
                    fieldType: "textField",
                    defaultValue: proveedorData.nombreProveedor || "Nombre del proveedor no disponible",
                    required: true,
                    disabled: true,
                  },                
                  {
                    label: "Productos",
                    name: "name",
                    fieldType: "multiSelect",
                    options: productOptions,
                    required: true,
                    onChange: handleChange,
                  },
                ]}
                buttonText="Asignar"
                onSubmit={handleAssignProduct}
              />
            </div>
          </div>
        </div>
        )}
        </div>
      );
    }
export default AssignProveedorProduct;