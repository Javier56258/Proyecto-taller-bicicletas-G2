import Form from './Form';
import '@styles/Popup.css';
import CloseIcon from '@assets/XIcon.svg';
import { createHorario } from '@services/horarios.service.js';
import { showSuccessAlert, showErrorAlert } from '@helpers/sweetAlert.js';


function CreateHorario({ show, setShow, data, action }) {
    console.log("Pasando por CreateHorario de CreateHorario.jsx");
    const horarioData = data && data.length > 0 ? data[0] : {};
   // const [isReversed, setIsReversed] = useState(false);
    const handleSubmit = async (formData) => {
        try {
            if (formData.hora instanceof Date || formData.hora.includes(":")) {
                formData.hora = formData.hora.toString(); 
            }
            const validatorError = await createHorario(formData);
            if (validatorError.status === 'Horario error'){
                setShow(false);
                return showErrorAlert("Error", validatorError.details);
            }
            showSuccessAlert("¡Creado!", "El horario ha sido creado correctamente.");
            setShow(false);
            action(formData);
        } catch (error) {
            showErrorAlert("Error", "Ocurrió un error al crear el horario.");
            console.error('Error al crear horario:', error);
        };
    };

    return (
        <div>
            {show && (
                <div className="bg">
                    <div className="popup">
                        <button className='close' onClick={() => setShow(false)}>
                            <img src={CloseIcon} />
                        </button>
                        <Form
                            title="Ingresar Horario"
                            fields={[
                                {
                                    label: "Dia",
                                    name: "dia",
                                    placeholder: 'Lunes',
                                    fieldType: 'select',
                                    options: [
                                        { value: 'Lunes', label: 'Lunes' },
                                        { value: 'Martes', label: 'Martes'},
                                        { value: 'Miercoles', label: 'Miercoles'},
                                        { value: 'Jueves', label: 'Jueves'},
                                        { value: 'Viernes', label: 'Viernes' },
                                        { value: 'Sabado', label: 'Sabado' },
                                        { value: 'Domingo', label: 'Domingo' },
                                    ],
                                    type: "text",
                                    required: true,
                                    defaultValue: horarioData.dia || "",
                                },
                                {
                                    label: "Hora de reserva",
                                    name: "hora",
                                    defaultValue: horarioData.hora || "",
                                    placeholder: '00:00',
                                    fieldType: 'input',
                                    type: "time",
                                    required: true,
                                },
                            ]}
                            onSubmit={handleSubmit}
                            buttonText={"Ingresar Horario"}
                            backgroundColor={"#fff"}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default CreateHorario;