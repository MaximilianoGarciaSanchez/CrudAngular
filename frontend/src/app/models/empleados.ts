export class Empleados { //modelo de datos
    _id: String;
    nombre: String;
    puesto: String;
    departamento: String;
    salario: number;
    constructor(_id: String = '', nombre: String = '',
        puesto: String = '', departamento:String='',salario: number = 0) {
        this._id = _id;
        this.nombre = nombre;
        this.departamento = departamento;
        this.puesto = puesto;
        this.salario = salario;
    }
}
