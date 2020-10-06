import { Component, OnInit } from '@angular/core';

// model
import { Control } from '../../../models/control';

// service
import { ControlService } from '../../../services/control.service';

import { ToastrService } from 'ngx-toastr';

export interface controlList {
  $key: string;
  nombre: string;
  dui: string;
  nmascota: string;
}

@Component({
  selector: 'app-control-list',
  templateUrl: './control-list.component.html',
  styleUrls: ['./control-list.component.css']
})
export class ControlListComponent implements OnInit {
  controlList: Control[];
   dtOptions: DataTables.Settings = {};
  constructor(
    private controlService: ControlService,
    private toastr: ToastrService
  ) { }

  ngOnInit(){
    return this.controlService.getControls()
      .snapshotChanges().subscribe(item => {
        this.controlList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.controlList.push(x as Control);
        });
      });
        console.log(this.controlList);
      this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 5,
        lengthMenu : [5, 10, 25],
          processing: true
        };
  }

  onEdit(control: Control) {
    this.controlService.selectedControl = Object.assign({}, control);
  }

  onDelete($key: string) {
    if (confirm('Estas seguro que deseas eliminar este control?')) {
      this.controlService.deleteControl($key);
      this.toastr.warning('Eliminado correctamente', 'Control eliminado');
    }
  }

}
