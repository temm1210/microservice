import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  success:boolean;
  errorMsg:string;

  constructor(private loginServce: LoginService, private router: Router) { }
  ngOnInit() {
    this.success = true;
  }

  login(value) {
    this.loginServce.login(value)
      .subscribe( (data) => {
        this.success = data.result;
        if(this.success){
          localStorage.setItem('jwtToken', data.token);
          localStorage.setItem('user',data.member.id);

          this.loginServce.loginInfo.emit(data.member);
          this.loginServce.isLogin = true;

          this.router.navigate(['']);

        }else {
          this.errorMsg = data.msg;
        }
      }
      ,err => console.log(err)
    )}
}
