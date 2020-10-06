import { Component, OnInit } from '@angular/core';

import { AuthService } from "../../services/auth.service";
@Component({
  selector: 'app-add-control',
  templateUrl: './add-control.component.html',
  styleUrls: ['./add-control.component.css']
})
export class AddControlComponent implements OnInit {

  constructor(public authService: AuthService) { }


  dtOptions: DataTables.Settings = {};
  ngOnInit() {
  this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
    lengthMenu : [5, 10, 25],
      processing: true
    };
}

}
