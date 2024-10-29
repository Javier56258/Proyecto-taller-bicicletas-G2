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

export function formatPostUpdateUser(user) {
    return {
        nombreCompleto: startCase(user.nombreCompleto),
        rol: startCase(user.rol),
        rut: formatRut(user.rut),
        email: user.email,
        createdAt: formatTempo(user.createdAt, "DD-MM-YYYY")
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