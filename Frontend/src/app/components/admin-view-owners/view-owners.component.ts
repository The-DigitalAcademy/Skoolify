import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Owner } from 'src/app/interfaces/owner';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-view-owners',
  templateUrl: './view-owners.component.html',
  styleUrls: ['./view-owners.component.scss']
})
export class ViewOwnersComponent implements OnInit {
  owners : Owner[] =[]
  sorting:string = 'is_suspended'
  constructor(private adminService : AdminService,private router :Router) { }

  ngOnInit(): void {

    this.adminService.viewAllOwners().subscribe((owners: Owner[]) => {
      this.owners = owners;
    })

  }

  sort(e:any)
  {
    this.sorting = e.target.value

  }

  selectOwner(user_id:any)
  {
    sessionStorage.setItem('selected_owner', user_id);
    this.router.navigateByUrl('admin/view-owner');
  }

}
