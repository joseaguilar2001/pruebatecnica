import React, {useContext, useState, useEffect, useRef} from "react";
import {Dialog} from "primereact/dialog";
import { Button } from "primereact/button";
import {InputText} from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import {Calendar} from 'primereact/calendar';
import moment from "moment";
import { PersonasContext } from "../../context/PersonasContext";

const Form = (props) => {
    const {isVisible, setIsVisible}= props;
    const [isVisibleDelete, setIsVisibleDelete] = useState(false);

    const {
        createPersonas, 
        deletePersonas,
        findPersonas, 
        updatePersonas,
        editPersonas,
        personas,
    } = useContext(PersonasContext);

    const inicialPersonasState = {
        id: null, 
        nombres: "",
        apellido: "", 
        hpdth: "",
        genero: "",
        direccion: "",
        estadoCivil: "",
        dpi: "",
    };

    const generos = 
    [
        {
            id: 1,
            genero:"Masculino"
        },
        {
            id: 2,
            genero:"Femenino"
        }
    ];

    const estadosCivil = 
    [
        {
            id: 1,
            nombre:"Casado"
        },
        {
            id: 2,
            nombre:"Soltero"
        },
        {
            id: 3,
            nombre:"Viudo"
        },
        {
            id: 4,
            nombre:"Divorciado"
        },
        {
            id: 5,
            nombre:"Separado"
        },
    ];
    const [ personaData, setPersonasData ] = useState(inicialPersonasState);

    useEffect(() => {
        if(editPersonas){
            setIsVisible(false);
            setPersonasData(editPersonas);
        }
    },[editPersonas]);

    const updateField = (data, field) => {
        setPersonasData({
            ...personaData,
            [field]:data
        })
    };

    const retornar =()=>{
        setPersonasData(inicialPersonasState);
        setIsVisible(false);
    };

    const savePersonas = () => {
        if(personaData.nombres === "" || personaData.apellido === "" || personaData.hpdth === "" || personaData.genero === "" || personaData.estadoCivil === "" || personaData.dpi === "" || personaData.direccion === ""){
            showInfo();
        }else{
            if(!editPersonas){
                createPersonas(personaData);
            }else{
                personaData.hpdth = moment(personaData.hpdth).format("YYYY-MM-DD");
                updatePersonas(personaData);
            }
            retornar();
        }
    }

    const showInfo = () => {
        toast.current.show({severity:'info', summary: 'Mensaje', detail:'Debe de llenar todos los campos requeridos (*)', life: 3000});
    }

    const toast = useRef(null);

    const showError = () => {
        toast.current.show({severity:'error', summary: 'Eliminado', detail:'Se ha eliminado con éxito', life: 3000});
    }

    const _deletePersona = () => {
        if(editPersonas){
            deletePersonas(personaData.id);
            setPersonasData(inicialPersonasState);
            showError();
        }
        retornar();
    }

    const dialogFooter=(
        <div className="ui-dialog-buttonpane p-clearfix">
            <ConfirmDialog visible={isVisibleDelete} onHide={() => setIsVisibleDelete(false)} message="¿Está seguro de eliminar?"
                header="Confirmación de eliminación" icon="pi pi-info-circle" accept={_deletePersona} reject={retornar} 
                acceptClassName="p-button-danger"
                />
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info" 
                icon="pi pi-times" label="Eliminar"
                onClick={() => setIsVisibleDelete(true)}/>
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info"
                label="Guardar" icon="pi pi-check"
                onClick={savePersonas}/>
        </div>
    );

    const clearSelected = () => {
        setIsVisible(false);
        setPersonasData(inicialPersonasState);
    };

    return(<div>
        <Toast ref={toast}></Toast>
        <Dialog 
            visible={isVisible}
            modal={true}
            style={{width:"430px", overflow:"scroll"}}
            contentStyle={{overflow:"visible"}}
            header = "Formulario"
            onHide={() => clearSelected()}
            footer={dialogFooter}
        >
            <div className="p-grid p-fluid">
                <br/>
                <div className="p-float-label">
                    <InputText
                        value={personaData.nombres}
                        onChange={(e)=>updateField(e.target.value.trim(), "nombres")}
                    />
                    <label>Nombres*</label>
                </div><br />
                <div className="p-float-label">
                    <InputText
                        value={personaData.apellido}
                        onChange={(e)=>updateField(e.target.value.trim(), "apellido")}
                    />
                    <label>Apellidos*</label>
                </div><br />
                <div className="p-float-label">
                    <Calendar
                        value={personaData.hpdth && new Date(personaData.hpdth + " ")}
                        onChange={(e) => updateField( e.target.value.toISOString().substring(0, 10), "hpdth")}
                        dateFormat="dd-mm-yy"
                    />
                    <label>Fecha de nacimiento*</label>
                </div><br />
                <div className="p-float-label">
                    <Dropdown value={personaData.genero} options={generos} optionLabel="genero" optionValue="genero" 
                    onChange={(e) => updateField(e.target.value, "genero")} filter showClear filterBy="genero" placeholder="Seleccione el genero"/>
                    <label>Genero*</label>
                </div><br />
                <div className="p-float-label">
                    <InputText
                        value={personaData.direccion}
                        onChange={(e)=>updateField(e.target.value.trim(), "direccion")}
                    />
                    <label>Dirección*</label>
                </div><br />
                <div className="p-float-label">
                    <Dropdown value={personaData.estadoCivil} options={estadosCivil} optionLabel="nombre" optionValue="nombre" 
                    onChange={(e) => updateField(e.target.value, "estadoCivil")} filter showClear filterBy="nombre" placeholder="Seleccione su estado civil"/>
                    <label>Estado civil*</label>
                </div><br />
                <div className="p-float-label">
                    <InputText
                        value={personaData.dpi}
                        onChange={(e)=>updateField(e.target.value.trim(), "dpi")}
                    />
                    <label>DPI*</label>
                </div><br />
            </div>
        </Dialog>
    </div>)
}

export default Form;