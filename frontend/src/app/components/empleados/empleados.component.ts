import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmpleadosService } from 'src/app/services/empleados.service';
import { Empleados } from 'src/app/models/empleados';

import {jsPDF} from 'jspdf';
import autoTable, {autoTable as autoTableType} from 'jspdf-autotable';

declare var M: any; //variable que sirve para Materialize

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  constructor(public empleadoService: EmpleadosService) { }

  ngOnInit(): void {
    this.getEmpleados();
  }

  resetForm(empleadoform?: NgForm) {
    this.empleadoService.empleado = new Empleados(); //Inicializa la variable empelados a vacio
    if (empleadoform) {
      empleadoform.reset();
    }
    this.getEmpleados();
  }
  // metodo que envia los datos de un empleado al servicio web para almacenarlos
  addEmpleado(empleadoForm: NgForm) {
    // console.log(empleadoForm.value);
    //si existe un id ya definido en el formulario
    if (empleadoForm.value._id) {//Actualizadmos
      this.empleadoService.putEmpleado(empleadoForm.value)
        .subscribe(res => {
          // console.log(res);
          M.toast({ html: 'Empleado actualizado correctamente' });
        });
    } else { //insertamos
      this.empleadoService.addEmpleado(empleadoForm.value)
        .subscribe(res => {
          // console.log(res);
          this.resetForm(empleadoForm);
          M.toast({ html: 'Empleado guardado correctamente' });
          this.getEmpleados();
        });
    } //else
    this.resetForm(empleadoForm);
    this.getEmpleados();
  } //fin de add empleados

  //obtener a todos los empleados
  getEmpleados() {
    this.empleadoService.getEmpleado()
      .subscribe(res => {
        this.empleadoService.empleados = res as Empleados[];
        console.log(res);
      });
  }//fin de get empleados

  //editar empleados
  editarEmpelado(empleado: Empleados) {
    this.empleadoService.empleado = empleado; //asocia el empleado de la tabla con el del formulario
  }

  //eliminar un empleado
  eliminarEmpleado(_id: String) {
    if (confirm('¿Estas seguro de eliminar el empleado?')) {
      this.empleadoService.deleteEmpleado(_id)
        .subscribe(res => {
          // console.log(res);
          M.toast({ html: 'Empleado eliminado correctamente' });
          this.getEmpleados();
          this.resetForm();
        });
    }//if

  }//fin de eliminar empleados
  exportarEmpleados(){
    //creamos un documento horizontal (portrait), en pixeles, tamaño carta
    const doc = new jsPDF('portrait','px','letter');
    //Titulo del documento en la posicion 10,10
    doc.text('Listado de empleados',15,15);
    const head = [['Nombre','Puesto','Departamento','Salario']];
    const listaEmpleados:any =[];

    //Llenamos el arreglo con los datos de los empleados
    for(var i in this.empleadoService.empleados){
      console.log(this.empleadoService.empleados[i]);
      //Empleado contiene los datos de un empleado en forma de arreglo
      const empleado:any = [];
      empleado.push();
      empleado.push(this.empleadoService.empleados[i].nombre);
      empleado.push(this.empleadoService.empleados[i].puesto);
      empleado.push(this.empleadoService.empleados[i].departamento);
      empleado.push(this.empleadoService.empleados[i].salario+'');
      listaEmpleados.push(empleado);
    }//for
    //Generamos el documento pdf para imprimir
    autoTable(doc,{
      head:head,
      body: listaEmpleados
    });
    doc.save('empleados.pdf');
  }//exportar
}//fin de la clase