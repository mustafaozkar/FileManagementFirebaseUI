import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/userModel';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FileManagementService } from 'src/app/services/file-management.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  fileAddForm:FormGroup;
  userModel:UserModel = {id:"",email:"",displayName:""};
  constructor(private fileManagementService:FileManagementService,
    private formBuilder:FormBuilder,
    private messageService:MessageService,
    private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    this.createPostingAddForm();
    this.getUser();
  }

  createPostingAddForm(){
    this.fileAddForm = this.formBuilder.group({
      name:['',Validators.required],
      file:['',Validators.required]
    })
  }

       
  getUser(){
    this.authenticationService.currentUser$.subscribe( (response) =>{
      this.userModel.id = response.uid;
      this.userModel.email = response.email;
      this.userModel.displayName = response.displayName;
    })
  }

  async add(){
    if (this.fileAddForm.valid) {
      const fileAddFormValue = Object.assign({},this.fileAddForm.value);
      const date = new Date().getTime().toString();
      (await this.fileManagementService.add({
        id:date,
        name:fileAddFormValue.name,
        uploadDate:date,
        userId:this.userModel.id,
        file:fileAddFormValue.file
      })).subscribe(()=>{
        this.messageService.success("Başarıyla yüklendi")
      })
    } else {
      
      this.messageService.success("Başarılı olamadı")
    }
  }
}
