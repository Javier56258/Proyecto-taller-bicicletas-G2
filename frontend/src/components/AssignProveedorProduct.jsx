import { useState, useEffect } from "react";
import Form from "./Form";
import "@styles/popup.css";
import CloseIcon from "@assets/XIcon.svg";
import { assignProveedorProduct } from "@services/proveedor.service.js";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert";
import { getProducts } from "@services/product.service.js";

function AssignProveedorProduct({ show, setShow, data, action }) {

    const proveedorData = data || {};

    const [productos, setProductos] = useState([]);    
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [reloadProducts, setReloadProducts] = useState(false);


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
          const response = await getProducts();
          if (!response || response.length === 0) {
            showErrorAlert('No hay productos disponibles.');
            setProductos([]);
          } else {
            console.log("Productos obtenidos:", response); // Verifica si el formato es correcto
            setProductos(response);
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
            showErrorAlert('No hay productos disponibles.');
          } else {
            showErrorAlert('Error al obtener productos.');
          }
          setProductos([]);
        }
      };
    
      fetchProductos();
    }, [reloadProducts]); 

    

    
    
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
          setReloadProducts(prev => !prev); // Cambia el estado para recargar productos
        } catch (error) {
          showErrorAlert("Error", "No se pudo asignar el producto.");
        }
      };

      const productOptions = Array.isArray(productos) ? productos.map(producto => ({
        value: producto.id,
        label: producto.proveedor
          ? `${producto.name} - ${producto.proveedor.nombreProveedor}`
          : producto.name,
      })) : [];

    console.log("Opciones", productOptions);
      return (
        <div>
        {show && (
        <div className="bg">
          <div className="prov-popup dark:bg-[#2e2c2f] slide-down">
            <button className="close" onClick={() => setShow(false)}>
              <img src={CloseIcon} alt="Cerrar" />
            </button>
            <div className="form-container">
              <div className="form-group"></div>
              <Form
                title="Asignar Productos"
                fields={[
                  {
                    label: "Proveedor Seleccionado: ",
                    name: "nombreProveedor",
                    fieldType: "textField",
                    defaultValue:
                      proveedorData.nombreProveedor ||
                      "Nombre del proveedor no disponible",
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
                    getOptionLabel: (e) => `${e.label}`,
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
