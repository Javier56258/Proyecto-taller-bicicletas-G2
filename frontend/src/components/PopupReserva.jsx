import Form from './Form';
import "@styles/popup.css";
import CloseIcon from '@assets/XIcon.svg';

export default function reservaPopup({show,setShow,data,action}) {
    const reservaData = data && data.length > 0 ? data[0] : {};

    const handleSubmit = (formData) => {
        if (formData.hora instanceof Date || formData.hora.includes(":")) {
            formData.hora = formData.hora.toString(); 
        }
        action(formData);
    };

    return(
        <div>
            { show && (
                <div className="bg"> 
                    <div className="prov-popup dark:bg-[#2e2c2f] slide-down">
                        <button className='close' onClick={() => setShow(false)}>
                            <img src={CloseIcon} />
                        </button>
                        <div className="proovedores-form-container">        
                        <Form
                            title="Editar Reserva"
                            fields={[
                                {   label: "Nombre completo",
                                    name: "nombreReservador",
                                    defaultValue: reservaData.nombreReservador || "",
                                    placeholder: 'Nombre del reservador',
                                    fieldType: 'input',
                                    type: "text",
                                    required: true,
                                    minLength: 7,
                                    maxLength: 60,
                                    pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                    patternMessage: "Debe contener solo letras y espacios",
                                },
                                {   label: "Correo electrónico",
                                    name: "email",
                                    defaultValue: reservaData.email || "",
                                    placeholder: 'reserva1234@gmail.com',
                                    fieldType: 'input',
                                    type: "email",
                                    required: true,
                                    minLength: 15,
                                    maxLength: 35,
                                },
                                {   label: "Fecha de reserva",
                                    name: "fecha",
                                    defaultValue: reservaData.fecha || "",
                                    placeholder: '11/11/2011',
                                    fieldType: 'input',
                                    type: "date",
                                    required: true,
                                },
                                {   label: "Hora de reserva",
                                    name: "hora",
                                    defaultValue: reservaData.hora || "",
                                    placeholder: '00:00',
                                    fieldType: 'input',
                                    type: "time",
                                    required: true,
                                },
                                {   label: "Servicio a pedir",
                                    name: "motivo",
                                    defaultValue: reservaData.motivo || "",
                                    placeholder: 'Limpieza de bicicleta',
                                    fieldType: 'input',
                                    type: "text",
                                    required: true,
                                },
                            ]}
                            onSubmit={handleSubmit}
                            buttonText={"Editar Reserva"}

                        />

                                </div>
                    </div>
                </div>)}
        </div>
    );
}
