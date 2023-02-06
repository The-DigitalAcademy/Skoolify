import { Location } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { AdminService } from 'src/app/services/admin.service';
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
  message = 'Save';
  load :boolean = false;
  isParent : boolean = true
  vehicles : Vehicle[] = [];

  preset = 'ylxn7mgj'
  update_dp = new FormGroup({
    file:new FormControl(),
    upload_preset: new FormControl()}
  );
  user_id = 0;
  user : any = {
    user_id : 0,
    name : '',
    surname : '',
    ratings : 0.0,
    votes : 0,
    image : '',
    account : ''
  }
  //forms
  editDetails :boolean = false;

  detailsForm = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
    surname: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
  });

  passwordForm = new FormGroup({
    oldPassword: new FormControl('',[Validators.required]),
    newPassword: new FormControl('',[Validators.required]),
    confirmPassword: new FormControl('',[Validators.required])
 })

 changeImageForm = new FormGroup({
  image: new FormControl('',[Validators.required]),
});

  cloudinaryUrl: string = 'http://api.cloudinary.com/v1_1/dkvrb3pye/image/upload';
  file: any;

  constructor(private profile : ProfileService, private http : HttpClient, private location: Location, private adminServ : AdminService) { }

  ngOnInit(): void {
    this.user_id = Number(sessionStorage.getItem('user_id'));
    this.getUser();
  }

  toggleEditDetails(){
      this.editDetails = !this.editDetails;
      console.log(this.editDetails);
  }

  onSumbitImage(form: FormGroup){
    this.message = 'Saving ...'
    this.load = true;

    const formData = new FormData();
    formData.append("file",this.file)
    formData.append("upload_preset",this.preset);
    this.http.post(this.cloudinaryUrl,formData).subscribe((res:any)=>{
      this.data.image = res.url;
      console.log(res.url)
      this.profile.updateImage(this.user_id,this.data).subscribe((res:any)=>{
        this.getUser();
        this.message = 'Saved';

        setTimeout(() => {
          this.load = false;
          form.reset()
          this.message = 'Save';
        }, 2000);

      },(error:HttpErrorResponse)=>{
        console.log(error);
        setTimeout(() => {
          this.load = false;
          form.reset()
          this.message = 'Save';
        }, 2000);
      })
    },(error:HttpErrorResponse)=>{
      //upload error
      console.log(error)
      setTimeout(() => {
        this.load = false;
        form.reset()
        this.message = 'Save';
      }, 2000);
    })
  }

  onSubmitDetails(form:FormGroup)
  {
    this.message = 'Saving ...'
    this.load = true;

    console.log(form.value);
    this.profile.updateDetails(this.user_id,form.value).subscribe((res:any)=>{
      //to be continued
      this.getUser()
      this.message = 'Saved'

      setTimeout(() => {
        this.load = false;
        form.reset()
        this.message = 'Save';
      }, 2000);
    },(error:HttpErrorResponse)=>{
      //error toast here
      console.log(error)
      setTimeout(() => {
        this.load = false;
        form.reset()
        this.message = 'Save';
      }, 2000);
    })
  }

  onSubmitPassword(form:FormGroup)
  {
    this.message = 'Saving ...'
    this.load = true;

    if(form.value.newPassword === form.value.confirmPassword){

      this.profile.updatePassword(this.user_id,form.value).subscribe((res:any)=>{
        //to be continued
        console.log(res.message)
        form.reset();
        this.getUser();
        this.message = 'Saved'


        setTimeout(() => {
          this.load = false;
          form.reset()
          this.message = 'Save';
        }, 2000);
      },(error:HttpErrorResponse)=>{
        //error toast here
        console.log(error)
        setTimeout(() => {
          this.load = false;
          form.reset()
          this.message = 'Save';
        }, 2000);
      })

    }else{
      //password dont match
      alert('Passwords do not match')
      setTimeout(() => {
        this.load = false;
        form.reset()
        this.message = 'Save';
      }, 2000);
    }
  }


  getUser()
  {
    this.profile.getAccount(this.user_id).subscribe((user: any)=>{
      this.user = user;

      if(this.user.account == "OWNER")
      {
        this.adminServ.viewOwnerVehicles(this.user_id).subscribe((vehicles: Vehicle[])=>{
          this.vehicles = vehicles;
        })
      }
      console.log(this.user)

    })

  }



  async onFileChange(event :any)
  {
    if(event.target.files.length>0)
    {
      this.file =  event.target.files[0];
    }
  }
  back(){
    this.location.back();
  }

}
