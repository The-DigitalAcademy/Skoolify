import { Component, OnInit } from '@angular/core';
import { Owner } from 'src/app/interfaces/owner';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-view-owners',
  templateUrl: './view-owners.component.html',
  styleUrls: ['./view-owners.component.scss']
})
export class ViewOwnersComponent implements OnInit {
  owners : Owner[] =[]
  constructor(private adminService : AdminService) { }

  ngOnInit(): void {

    this.adminService.viewAllOwners().subscribe((owners: Owner[]) => {
      this.owners = owners;
    })

  }

}
