import { Component, OnInit } from '@angular/core';
import { FileModel } from 'src/app/models/fileModel';
import { UserModel } from 'src/app/models/userModel';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FileManagementService } from 'src/app/services/file-management.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {

  filesModel:FileModel[] = [];
  userModel:UserModel = {id:"",email:"",displayName:""};
  constructor(private fileManagementService:FileManagementService,
    private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    this.getUser();
    this.getAll();
  }

       
  getUser(){
    this.authenticationService.currentUser$.subscribe( (response) =>{
      this.userModel.id = response.uid;
      this.userModel.email = response.email;
      this.userModel.displayName = response.displayName;
    })
  }


  async getAll(){
    (await this.fileManagementService.getByFileUser(this.userModel.id)).subscribe( (response) =>{
      response.forEach( (responseData) =>{
        this.filesModel.push(
          {
            id:responseData.get("id"),
            name:responseData.get("name"),
            uploadDate:responseData.get("uploadDate"),
            userId:responseData.get("userId"),
            file:responseData.get("file")
          }
        )
      })
    })
  }
}
