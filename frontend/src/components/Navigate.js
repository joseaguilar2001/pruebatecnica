import { Menubar } from "primereact/menubar";
import React from "react";

const navigate = () => {
    const navList = [
        {
            label: "Inicio",
            icon: "pi pi-fw pi-home",
            command: () => {
                window.location.href = '/'
            },
        },
        {
            label: "Personas",
            icon: "pi pi-fw pi-send",
            command: () => {
                window.location.href = '/personas'
            },
        },
    ]
    return(
        <header>
            <Menubar model={navList} />
        </header>
    );
}
export default navigate;