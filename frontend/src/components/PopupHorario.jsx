import Form from './Form';
import "@styles/popup.css";
import CloseIcon from '@assets/XIcon.svg';

export default function horarioPopup({show,setShow,data,action}) {
    const horarioData = data && data.length > 0 ? data[0] : {};

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
                    <div className="popup">
                        <button className='close' onClick={() => setShow(false)}>
                            <img src={CloseIcon} />
                        </button>
                        <Form
                            title="Editar horario"
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
                            buttonText={"Editar Horario"}
                            backgroundColor={'#fff'}
                        />
                    </div>
                </div>)}
        </div>
    );
}