import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileModel } from 'src/app/models/fileModel';
import { FileManagementService } from 'src/app/services/file-management.service';
import { FileListComponent } from '../../fileManagementComponents/file-list/file-list.component';
import { FileUploadComponent } from '../../fileManagementComponents/file-upload/file-upload.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  filesModel:FileModel[] = [];
  constructor(private dialog: MatDialog,
   private fileManagementService:FileManagementService) { }

  ngOnInit(): void {
    this.getAll();
  }

  showFileUpload(){
    this.dialog.open(FileUploadComponent);
  }

  showMyFiles(){
    this.dialog.open(FileListComponent);
  }


  async getAll(){
    (await this.fileManagementService.getAll()).subscribe( (response) =>{
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
