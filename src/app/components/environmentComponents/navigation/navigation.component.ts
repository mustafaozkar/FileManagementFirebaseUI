import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MessageService } from 'src/app/services/message.service';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  
  getUser$ = this.authenticationService.currentUser$;

  constructor(private authenticationService:AuthenticationService,
    private messageService:MessageService,
    private routerService:RouterService) { }

  ngOnInit(): void {
  }

  
  logout(){
    this.authenticationService.logout().subscribe((response) => {
      this.routerService.route("account/login");
      this.messageService.success("Başarıyla çıkış yapıldı");
    })
  }

}
