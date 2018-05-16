import { Component, OnInit} from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  user=null;

  constructor(private loginService: LoginService) { 
    this.loginService.loginInfo
        .subscribe(
          (user) => {
            console.log('user:',user)
            this.user = user.id;
          }
        )
  }

  ngOnInit() {
    this.user = localStorage.getItem('user')
    console.log('user:',this.user);
  }

  logout(){
    if( window.confirm('로그아웃　하시겠습니까？') ){
      this.loginService.logOut();
      this.user = null;
    }
  }

}
