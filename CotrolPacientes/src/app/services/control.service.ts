import { Injectable } from '@angular/core';

// Firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

// Model
import { Control } from '../models/control';

@Injectable({
  providedIn: 'root'
})

export class ControlService {

  // Traer los datos de firebase
  controlList: AngularFireList<any>;

  // Una variable temporal, para guardar los datos seleccionados, del tipo Product
  selectedControl: Control = new Control();

  constructor(public firebase: AngularFireDatabase) { }

  // Traer todos los productos desde firebase 
  getControls() { // guarda los elementos en la varible 'controls'
    return this.controlList = this.firebase.list('controls');
  }

  // crear un nuevo producto  , recibiendo un parametro de tipo Product
  insertControl(control: Control, costo: number, descuento: number) {
    // agregar un dato al final de la lista, como recibe un objeto del tipo Product , puede acceder a sus propiedades
    this.controlList.push({
      nombre: control.nombre,
      dui: control.dui,
      nmascota: control.nmascota,
      tratamiento: control.tratamiento,
      medicamento: control.medicamento,
      costo: costo,
      descuento: descuento
    });
  }

  // Actualiza un producto, recibiendo un parametro de tipo Product
  updateControl(control: Control, costo: number, descuento: number) {
    // Utilizando el metodo update de firebase , se envia clave y los parametros que va actualizar 
    this.controlList.update(control.$key, {
      nombre: control.nombre,
      dui: control.dui,
      nmascota: control.nmascota,
      tratamiento: control.tratamiento,
      medicamento: control.medicamento,
      costo: costo,
      descuento: descuento
    });
  }

  // Elimina un producto, recibiendo como parametro la clave , utilizando el metodo remove de firebase
  deleteControl($key: string) {
    this.controlList.remove($key);
  }

}