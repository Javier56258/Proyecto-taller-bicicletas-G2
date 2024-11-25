"use strict";
import { EntitySchema } from "typeorm";
import HorarioSchema from "./horario.entity.js"; // Importa la entidad Horario

const ReservaSchema = new EntitySchema({
    name: "Reserva",
    tableName: "reservas",
    columns: {
        idreserva: {
            type: "int",
            primary: true,
            generated: true,
        },
        nombreReservador: {
            type: "varchar",
            length: 100,
            nullable: false,
        },
        email: {  
            type: "varchar",
            length: 255,
            nullable: false,
        },
        motivo: {
            type: "varchar",
            length: 100,
            nullable: false,
        },
        fecha: {
            type: "timestamp with time zone",
            nullable: false,
        },
        hora: {
            type: "varchar",
            length: 10,
            nullable: false,
        },
        createdAt: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            nullable: false,
        },
        updatedAt: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
            nullable: false,
        }
    },
    relations: {
        horario: {
            type: "many-to-one",
            target: "Horario",
            joinColumn: true,
            nullable: false,
        }
    }
});

export default ReservaSchema;