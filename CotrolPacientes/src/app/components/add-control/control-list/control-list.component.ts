import { Component, OnInit } from '@angular/core';

// model
import { Control } from '../../../models/control';

// service
import { ControlService } from '../../../services/control.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-control-list',
  templateUrl: './control-list.component.html',
  styleUrls: ['./control-list.component.css']
})
export class ControlListComponent implements OnInit {
  controlList: Control[];

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
