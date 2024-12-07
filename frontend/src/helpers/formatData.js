import { startCase } from 'lodash';
import { format as formatRut } from 'rut.js';
import { format as formatTempo } from "@formkit/tempo";


export function formatUserData(user) {
    return {
        ...user,
        nombreCompleto: startCase(user.nombreCompleto),
        rol: startCase(user.rol),
        rut: formatRut(user.rut),
        createdAt: formatTempo(user.createdAt, "DD-MM-YYYY")
    };
}
//Revisar
export function formatReservaData(reserva) {
    console.log("Pasando por formatReservaData");
    console.log(reserva);
    console.log("nombreReservador: ", reserva.nombreReservador);
    console.log("email: ", reserva.email);
    console.log("motivo: ", reserva.motivo);
    console.log("fecha: ", formatTempo(reserva.fecha, "DD-MM-YYYY"));
    //console.log("hora: ", formatTempo(reserva.hora, "HH:mm"));
    console.log("createdAt: ", reserva.createdAt);
    return {
        ...reserva,
        nombreReservador: startCase(reserva.nombreReservador),
        email: reserva.email,
        motivo: startCase(reserva.motivo),
        fecha: formatTempo(reserva.fecha, "DD-MM-YYYY"),
        hora: reserva.hora,
        createdAt: formatTempo(reserva.createdAt, "DD-MM-YYYY")
    };
}
//Revisar
export function formatHorarioData(horario) {
    return {
        ...horario,
        dia: horario.dia,
        hora: horario.hora,
        createdAt: formatTempo(horario.createdAt, "DD-MM-YYYY")
    };
}

export function formatProveedorData(proveedor) {
    return {
        ...proveedor,
        nombreProveedor: proveedor.nombreProveedor,
        productos_suministrados: startCase(proveedor.productos_suministrados),
        paginaWeb: proveedor.paginaWeb,
        telefono: proveedor.telefono,
        email: proveedor.email,
        direccion: startCase(proveedor.direccion),
        createdAt: formatTempo(proveedor.createdAt, "DD-MM-YYYY")



    };
}

export function formatProductData(product) {
    return {
        ...product,
        name: startCase(product.name),
        description: startCase(product.description),
        createdAt: formatTempo(product.createdAt, "DD-MM-YYYY")
        

    };
}

export function convertirMinusculas(obj) {
    for (let key in obj) {
        if (typeof obj[key] === 'string') {
            obj[key] = obj[key].toLowerCase();
        }
    }
    return obj;
}

export function formatServicioData(servicio) {
    // Implementa la lógica de formateo aquí
    return {
        id: servicio.id,
        nombre: servicio.nombre,
        // Otros campos que necesites formatear
    };
  
  
  }

//FORMATEO DE DATOS PARA ACTUALIZAR 
export function formatPostUpdateUser(user) {
    return {
        nombreCompleto: startCase(user.nombreCompleto),
        rol: startCase(user.rol),
        rut: formatRut(user.rut),
        email: user.email,
        createdAt: formatTempo(user.createdAt, "DD-MM-YYYY")
    };
}


export function formatPostUpdateProveedor(proveedor) {
    return {
        nombreProveedor: proveedor.nombreProveedor,
        paginaWeb: proveedor.paginaWeb,
        telefono: proveedor.telefono,
        email:proveedor.email,
        direccion: proveedor.direccion,
        createdAt: formatTempo(proveedor.createdAt, "DD-MM-YYYY")
    };

}



export function formatPostUpdateProduct(product) {
    
    return {
        name: startCase(product.nombre),
        description: startCase(product.descripcion),
        price: product.precio,
        stock: product.stock,
        createdAt: formatTempo(product.createdAt, "DD-MM-YYYY")
        
    };

}

export function formatPostUpdateReserva(reserva) {
    console.log("Pasando por formatPostUpdateReserva en formatData");
    console.log(reserva);
    return {
        nombreReservador: startCase(reserva.nombreReservador),
        email: reserva.email,
        motivo: reserva.motivo,
        fecha: reserva.fecha,
        hora: reserva.hora,
        createdAt: formatTempo(reserva.createdAt, "DD-MM-YYYY")
    };
}

export function formatPostUpdateHorario(horario) {
    return {
        dia: horario.dia,
        hora: horario.hora,
        createdAt: formatTempo(horario.createdAt, "DD-MM-YYYY")
    };
}
