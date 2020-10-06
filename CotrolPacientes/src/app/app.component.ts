import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CotrolPacientes';

  public dataa = [
    {name: 'Ajay', email: 'therichpost@gmail.com', website:'therichpost.com'},
    {name: 'Jas', email: 'therichpost@gmail.com', website:'therichpost.com'},
    {name: 'therichpost', email: 'therichpost@gmail.com', website:'therichpost.com'},
    {name: 'therichpost', email: 'therichpost@gmail.com', website:'therichpost.com'},
  {name: 'Jas', email: 'therichpost@gmail.com', website:'therichpost.com'},
    {name: 'therichpost', email: 'therichpost@gmail.com', website:'therichpost.com'},
    {name: 'therichpost', email: 'therichpost@gmail.com', website:'therichpost.com'},
  {name: 'Jas', email: 'therichpost@gmail.com', website:'therichpost.com'},
    {name: 'therichpost', email: 'therichpost@gmail.com', website:'therichpost.com'},
    {name: 'therichpost', email: 'therichpost@gmail.com', website:'therichpost.com'},
  ];
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
