"use strict";
import User from "../entity/user.entity.js";
import Horario from "../entity/horario.entity.js";
import { AppDataSource } from "./configDb.js";
import { encryptPassword } from "../helpers/bcrypt.helper.js";

async function createUsers() {
  try {
    const userRepository = AppDataSource.getRepository(User);

    //CREA USUARIOS POR DEFECTO A BAJO SOLO LA PRIMERA VEZ QUE ESTE VACIA NUESTRA BBDD
    const count = await userRepository.count();
    if (count > 0) return;

    await Promise.all([
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Tomas Enrique Saez Aguayo",
          rut: "21.065.276-0",
          email: "tomass2942@gmail.cl",
          password: await encryptPassword("admin1234"),
          rol: "administrador",
        }),
      ),
        userRepository.save(
          userRepository.create({
            nombreCompleto: "Felipe Alonso Romero Egaña",
            rut: "21.255.197-K",
            email: "felipe2024@gmail.cl",
            password: await encryptPassword("admin1234"),
            rol: "administrador",
          }),
        ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Pablo Sanchez",
          rut: "20.977.978-1",
          email: "pablo2002@gmail.cl",
          password: await encryptPassword("admin1234"),
          rol: "administrador",
        }),
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Diego Sebastián Ampuero Belmar",
          rut: "21.151.897-9",
          email: "usuario1.2024@gmail.cl",
          password: await encryptPassword("user1234"),
          rol: "usuario",
        }),
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Alexander Benjamín Marcelo Carrasco Fuentes",
          rut: "20.630.735-8",
          email: "usuario2.2024@gmail.cl",
          password: await encryptPassword("user1234"),
          rol: "usuario",
        }),
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Pablo Andrés Castillo Fernández",
          rut: "20.738.450-K",
          email: "usuario3.2024@gmail.cl",
          password: await encryptPassword("user1234"),
          rol: "usuario",
        }),
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Felipe Andrés Henríquez Zapata",
          rut: "20.976.635-3",
          email: "usuario4.2024@gmail.cl",
          password: await encryptPassword("user1234"),
          rol: "usuario",
        }),
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Diego Alexis Meza Ortega",
          rut: "21.172.447-1",
          email: "usuario5.2024@gmail.cl",
          password: await encryptPassword("user1234"),
          rol: "usuario",
        }),
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Juan Pablo Rosas Martin",
          rut: "20.738.415-1",
          email: "usuario6.2024@gmail.cl",
          password: await encryptPassword("user1234"),
          rol: "usuario",
        }),
      ),
    ]);
    console.log("* => Usuarios creados exitosamente");
  } catch (error) {
    console.error("Error al crear usuarios:", error);
  }
}
//Creacion de horarios por defecto para presentar BD aunque es algo que deberia hacer el administrador
async function createHorarios() {
  try{
    const horarioRepository = AppDataSource.getRepository(Horario);

    const count = await horarioRepository.count();
    if (count > 0) return;

    await Promise.all([
      horarioRepository.save(
        horarioRepository.create({
          dia: "Lunes",
          hora: "08:00",
        }),
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Lunes",
          hora: "09:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Lunes",
          hora: "10:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Lunes",
          hora: "11:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Lunes",
          hora: "12:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Lunes",
          hora: "13:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Lunes",
          hora: "14:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Lunes",
          hora: "15:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Lunes",
          hora: "16:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Lunes",
          hora: "17:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Martes",
          hora: "08:00",
        }),
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Martes",
          hora: "09:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Martes",
          hora: "10:00",
        })
      ),  
      horarioRepository.save(
        horarioRepository.create({
          dia: "Martes",
          hora: "11:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Martes",
          hora: "12:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Martes",
          hora: "13:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Martes",
          hora: "14:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Martes",
          hora: "15:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Martes",
          hora: "16:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Martes",
          hora: "17:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Miercoles",
          hora: "08:00",
        }),
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Miercoles",
          hora: "09:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Miercoles",
          hora: "10:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Miercoles",
          hora: "11:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Miercoles",
          hora: "12:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Miercoles",
          hora: "13:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Miercoles",
          hora: "14:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Miercoles",
          hora: "15:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Miercoles",
          hora: "16:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Miercoles",
          hora: "17:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Jueves",
          hora: "08:00",
        }),
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Jueves",
          hora: "09:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Jueves",
          hora: "10:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Jueves",
          hora: "11:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Jueves",
          hora: "12:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Jueves",
          hora: "13:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Jueves",
          hora: "14:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Jueves",
          hora: "15:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Jueves",
          hora: "16:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Jueves",
          hora: "17:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Viernes",
          hora: "08:00",
        }),
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Viernes",
          hora: "09:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Viernes",
          hora: "10:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Viernes",
          hora: "11:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Viernes",
          hora: "12:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Viernes",
          hora: "13:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Viernes",
          hora: "14:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Viernes",
          hora: "15:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Viernes",
          hora: "16:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Viernes",
          hora: "17:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Sabado",
          hora: "08:00",
        }),
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Sabado",
          hora: "09:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Sabado",
          hora: "10:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Sabado",
          hora: "11:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Sabado",
          hora: "12:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Sabado",
          hora: "13:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Sabado",
          hora: "14:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Sabado",
          hora: "15:00",
        })
      ),
      horarioRepository.save(
        horarioRepository.create({
          dia: "Sabado",
          hora: "16:00",
        })
      ),
    ]);
    console.log("* => Horarios creados exitosamente");
  }catch(error){
    console.error("Error al crear horarios:", error);
  }
}

export { createUsers, createHorarios };