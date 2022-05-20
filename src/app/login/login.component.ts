import { Component, OnInit, NgZone } from '@angular/core';
import { Login } from 'src/models/login';
import { LoginService } from '../services/serviceLogin/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailString: string;
  senhaString: string;
  

  constructor(private loginService: LoginService, private ngZone: NgZone, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    var loginModel: Login = new Login(
      this.emailString,
      this.senhaString,
    );
    
    this.loginService.getLogin(loginModel).subscribe((x) => {
      window.sessionStorage.setItem("x-access-token", x.token);
      this.ngZone.run(() => this.router.navigateByUrl('/dashboard') )
    })
  }

}
