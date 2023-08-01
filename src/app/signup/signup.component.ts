import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Singin, UserService } from 'shoping-api';

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
    private alertController: AlertController) { }

  ngOnInit() {
    this.initializeLogin();
    this.initializeRegister();
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
      localStorage.setItem('shoppingtoken', res.accessToken)
      //this.apiConfiguration.accessToken  = res.accessToken;
      //this.route.navigate(['dashboard']);     
    }
  },(error)=>{
    this.openSnackBar('Please check your login credentials!!!', "Error");
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
}
