import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-view-one-application',
  templateUrl: './admin-view-one-application.component.html',
  styleUrls: ['./admin-view-one-application.component.scss']
})
export class AdminViewOneApplicationComponent implements OnInit {

  constructor(private location : Location) { }

  ngOnInit(): void {
  }

  back()
  {
    sessionStorage.removeItem('selected_application');

  }

}
