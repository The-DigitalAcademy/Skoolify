import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  data =
  {
    image :''
  }

  preset = 'ylxn7mgj'
  update_dp = new FormGroup({
    file:new FormControl(),
    upload_preset: new FormControl()}
  );
  user_id = 0;
  user : User = {

  }

  updateDetails = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
    surname: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
  });

  cloudinaryUrl: string = 'https://api.cloudinary.com/v1_1/dkvrb3pye/image/upload';
  file: any;

  constructor(private profile : ProfileService, private http : HttpClient) { }

  ngOnInit(): void {
    this.user_id = Number(sessionStorage.getItem('user_id'));
    this.profile

  }

  onSumbit(){
    const formData = new FormData();
    formData.append("file",this.file)
    formData.append("upload_preset","i8maua2c");



  }

  async onFileChange(event :any)
  {
    if(event.target.files.length>0)
    {
      this.file =  event.target.files[0];
    }
  }

}
