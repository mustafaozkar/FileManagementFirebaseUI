import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileManagementService } from 'src/app/services/file-management.service';
import { FileUploadComponent } from '../../fileManagementComponents/file-upload/file-upload.component';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {

  constructor(private dialog: MatDialog,
    private fileManagementService:FileManagementService) { }

  ngOnInit(): void {
  }
  showFileUpload(){
    this.dialog.open(FileUploadComponent);
  }
}
