import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

//  Service 
import { ControlService } from '../../../services/control.service';
// Class
import { Control } from '../../../models/control';
// toastr
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {
  cdescuento: number;
  controlList: Control[];
  constructor(
    public controlService: ControlService,
    public toastr: ToastrService
  ) { }

  ngOnInit() {
    this.controlService.getControls()
      .snapshotChanges().subscribe(item => {
        this.controlList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.controlList.push(x as Control);
        });
      });
    this.resetForm()
    this.cdescuento = 0;
  }

  // Recibe un formulario del tipo NgForm, lo envia a guardar o actualizar , invocando el servicio Firebase
  // lo termina limpiando resetForm
  onSubmit(controlForm: NgForm) {
    var cvisitas = 0;
    for (var i = 0; i < this.controlList.length; i++) {

      if (controlForm.value.dui == this.controlList[i].dui) {
        cvisitas++;
        console.log(cvisitas);
      }
    }

    if (cvisitas <= 1) {
      this.cdescuento= 0
      if (controlForm.value.$key == null)
        this.controlService.insertControl(controlForm.value, this.controlService.selectedControl.costo, this.cdescuento);
      else
        this.controlService.updateControl(controlForm.value, this.controlService.selectedControl.costo, this.cdescuento);

      this.resetForm(controlForm);
      this.toastr.success('Opreación exitosa', 'Control registrado');
    } else if (cvisitas == 2) {
      this.cdescuento = (this.controlService.selectedControl.costo *0.05)
      this.controlService.selectedControl.costo = (this.controlService.selectedControl.costo) - this.cdescuento;
      
      if (controlForm.value.$key == null)
      
        this.controlService.insertControl(controlForm.value, this.controlService.selectedControl.costo, this.cdescuento);
      else
        this.controlService.updateControl(controlForm.value, this.controlService.selectedControl.costo, this.cdescuento);

      this.resetForm(controlForm);
      this.toastr.success('Opreación exitosa', 'Control registrado');
    } else if (cvisitas >= 6) {
      this.cdescuento = (this.controlService.selectedControl.costo *0.08)
      this.controlService.selectedControl.costo = (this.controlService.selectedControl.costo) - this.cdescuento;
      
      if (controlForm.value.$key == null)
        this.controlService.insertControl(controlForm.value, this.controlService.selectedControl.costo, this.cdescuento);
      else
        this.controlService.updateControl(controlForm.value,this.controlService.selectedControl.costo, this.cdescuento);

      this.resetForm(controlForm);
      this.toastr.success('Opreación exitosa', 'Control registrado');
    }

    /*if (controlForm.value.$key == null)
      this.controlService.insertControl(controlForm.value);
    else
      this.controlService.updateControl(controlForm.value);

    this.resetForm(controlForm);
    this.toastr.success('Opreación exitosa', 'Control registrado');*/
  }

  // Para limpiar el formulario
  resetForm(controlForm?: NgForm) {
    if (controlForm != null)
      controlForm.reset();
    this.controlService.selectedControl = new Control();
  }

}
