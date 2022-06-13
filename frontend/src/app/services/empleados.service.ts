import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//importar el modelo de datos
import { Empleados } from '../models/empleados'

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  readonly url = 'http://localhost:3100/api/empleados';
  empleado: Empleados; //para intercambiar datos con el formulario
  empleados: Empleados[]; //areglo para almacenar todos los empleados

  constructor(public httpClient: HttpClient) {
    this.empleado = new Empleados();
    this.empleados = new Array();
    }

    //Agregar un empleado a la base de datos
    addEmpleado(empleado: Empleados){
      return this.httpClient.post(this.url, this.empleado);
    }
    //obtener todos los empleados
    getEmpleado(){
      return this.httpClient.get(this.url);
    }
    //modificar un empelado
    putEmpleado(empleado: Empleados){
      return this.httpClient.put(this.url+ '/' + this.empleado._id, empleado);
    }
    //eliminar un empleado
    deleteEmpleado(_id:String){
      return this.httpClient.delete(this.url+ '/' + _id);
    }
//Fin de class EmpleadosService
  }