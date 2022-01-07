import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserConstants } from 'src/app/constants/userConstant';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MessageService } from 'src/app/services/message.service';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 
  loginForm:FormGroup;
  constructor(private formBuilder:FormBuilder,
    private authenticationService:AuthenticationService,
    private messageService:MessageService,
    private routerService:RouterService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }

  login(){
    if (this.loginForm.valid) {
      const registerFormValue = Object.assign({},this.loginForm.value);
      this.authenticationService.login(registerFormValue).subscribe( (responseUser) =>{
        if (responseUser.user.email === UserConstants.email) {
          this.routerService.route("admin/panel");
          this.messageService.success("Admin paneline yönlendiriliyorsun");
        } else {
          this.routerService.route("user/panel");
          this.messageService.success("Panele yönlendiriliyorsunuz");

        }
        
      })
      
    } else {
      this.messageService.error("Lütfen bilgileri boş geçmeyin !");
    }
  }
}
