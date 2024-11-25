"use strict";
import { EntitySchema } from "typeorm";

const HorarioSchema = new EntitySchema({
    name: "Horario",
    tableName: "horarios",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
            unique: true,
        },
        dia: {
            type: "varchar",
            length: 50,
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
    }
});

export default HorarioSchema;