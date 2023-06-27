const express = require('express');
const router = express.Router();
const mysqlconection = require('../db');

router.get('/', (req, res) => {
        sqlScript = `SELECT id, nombres, apellido, hpdth, genero, direccion, estadoCivil, dpi 
        FROM dbprueba.personas;`;
        mysqlconection.query(sqlScript, (error, rows, field) => {
                if(!error){
                    res.json(rows);
                }else{
                    console.log(error);
                }
            }
        )
    }
);

router.post('/', (req, res) => {
        const personas = {
            nombres: req.body.nombres,
            apellido: req.body.hpdth,
            hpdth: req.body.hpdth,
            genero: req.body.genero,
            direccion: req.body.direccion, 
            estadoCivil: req.body.estadoCivil,
            dpi: req.body.dpi,
        };
        mysqlconection.query(`INSERT INTO dbprueba.personas(nombres, apellido, hpdth, genero, direccion, estadoCivil, dpi)
        VALUES(?, ?, ?, ?, ?, ?, ?);`,
        [personas.nombres, personas.apellido, personas.hpdth, personas.genero, personas.direccion, personas.estadoCivil, personas.dpi],
        (error, rows, field) => {
            if(!error){
                res.json(rows);
                console.log('Exito');
            }else{
                res.json("Error");
                console.log(error);
            }
        }
    )
}
);

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const personas = {
        nombres: req.body.nombres,
        apellido: req.body.hpdth,
        hpdth: req.body.hpdth,
        genero: req.body.genero,
        direccion: req.body.direccion, 
        estadoCivil: req.body.estadoCivil,
        dpi: req.body.dpi,
    };
    mysqlconection.query(`UPDATE dbprueba.personas
    SET nombres=?, apellido=?, hpdth=?, genero=?, direccion=?, estadoCivil=?, dpi=?
    WHERE id=?;`,
    [personas.nombres, personas.apellido, personas.hpdth, personas.genero, personas.direccion, personas.estadoCivil, personas.dpi, id],
    (error, rows, field) => {
        if(!error){
            res.json(rows);
            console.log('Exito');
        }else{
            res.json("Error");
            console.log(error);
        }
    })
});

router.delete(':/delete', (req, res) => {
        const {id} = req.params;
        mysqlconection.query(`DELETE FROM dbprueba.personas
            WHERE id=?;`
            [id], 
            (error, rows, field) => {
                if(!error){
                    res.json(rows);
                    console.log('Exito');
                }else{
                    res.json("Error");
                    console.log(error);
                }
            }
        )
    }
)

module.exports = router;