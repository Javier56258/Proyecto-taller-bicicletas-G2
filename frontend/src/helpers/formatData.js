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

export function formatProveedorData(proveedor) {
    return {
        ...proveedor,
        nombreProveedor: startCase(proveedor.nombreProveedor),
        productos_suministrados: startCase(proveedor.productos_suministrados),
        paginaWeb: startCase(proveedor.paginaWeb),
        telefono: startCase(proveedor.telefono),
        email: startCase(proveedor.email),
        direccion: startCase(proveedor.direccion),
        createdAt: formatTempo(proveedor.createdAt, "DD-MM-YYYY")
        
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

export function formatPostUpdate(user) {
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
        nombreProveedor: startCase(proveedor.nombreProveedor),
        productos_suministrados: startCase(proveedor.productos_suministrados),
        paginaWeb: startCase(proveedor.paginaWeb),
        telefono: proveedor.telefono,
        email:proveedor.email,
        direccion: startCase(proveedor.direccion),
        createdAt: formatTempo(proveedor.createdAt, "DD-MM-YYYY")
    };
}