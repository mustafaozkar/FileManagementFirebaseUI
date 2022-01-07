import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MessageService } from 'src/app/services/message.service';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  registerForm:FormGroup;
  constructor(private formBuilder:FormBuilder,
    private authenticationService:AuthenticationService,
    private messageService:MessageService,
    private routerService:RouterService) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }

  register(){
    if (this.registerForm.valid) {
      const registerFormValue = Object.assign({},this.registerForm.value);
      this.authenticationService.register(registerFormValue).subscribe( () =>{
        this.routerService.route("panels/select")
        this.messageService.success("Başarıyla hesap oluşturuldu");
      })
      
    } else {
      this.messageService.error("Lütfen bilgileri boş geçmeyin !");
    }
  }
}
