import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ProfileService, Singin, UserService } from 'shopping-api';
import { environment } from 'src/environments/environment';
import { StorageService } from '../shared/services/storage.service';
import { Location } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent  implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  isLoginSubmit:boolean = false;
  isRegisterSubmit:boolean = false;
  constructor(
    private fb:FormBuilder, 
    private userService:UserService,
    private alertController: AlertController,
    private storageServive:StorageService,
    private profileservice:ProfileService,
    private location:Location) { }

  ngOnInit() {
    this.initializeLogin();
    this.initializeRegister();
   console.log(this.location)
  }
  initializeLogin() {
    this.loginForm = this.fb.group({
      usernameOrMobile:['', Validators.required],
      password:['', Validators.required]
    })
}

initializeRegister(){
  this.registerForm = this.fb.group({
    username:['', [Validators.required, Validators.minLength(5)]],
    password:['', [Validators.required, Validators.minLength(5)]],
    mobile: ['',  [Validators.required, Validators.minLength(10)]],
    email:['', Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]
  })
}

loginSubmit(): any{
  this.isLoginSubmit = true;
  console.log('this.loginForm',this.loginForm);
  if(!this.loginForm.valid){
    return true
  }
  const fValue = this.loginForm.value;
  const body:Singin = {
    usernameOrMobile: fValue.usernameOrMobile,
    password:fValue.password,
  };
  this.loginService(body);
}


registerSubmit() {
  this.isRegisterSubmit = true;
  console.log('this.registerForm',this.registerForm);
}


get loginFormControl() {
  return this.loginForm.controls;
}

get registerFormControl() {
  return this.registerForm.controls;
}

loginService(param:Singin){ 
  this.userService.login(param).subscribe((res)=>{
    if(res.accessToken){
      localStorage.setItem('shoppingtoken', res.accessToken);
      this.storageServive.set(environment.signIn, res.accessToken);
      //this.apiConfiguration.accessToken  = res.accessToken;
      console.log('location',this.location)

      this.loadProfile();

      this.location.back();
      //this.route.navigate(['dashboard']);     
    }
  },(error)=>{
    this.openSnackBar('Please check your login credentials!!!', "Error");
    this.storageServive.remove(environment.signIn);
    localStorage.removeItem('shoppingtoken');
  })
}

async openSnackBar(message:string, tyep:string) {
  const alert = await this.alertController.create({
    header: '',
    subHeader: 'Login!!',
    message: message,
    buttons: ['OK'],
  });

  await alert.present();
}
  loadProfile(){
    this.profileservice.getProfile().subscribe(profile=>{
      this.storageServive.set(environment.profile, profile);
    });
  }

  goBack(){
    this.location.back();
  }
}
