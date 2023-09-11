import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/shared/services/core.service';
import { UserService } from 'src/app/modules/manage-user/shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  
  formLogin: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private _coreService: CoreService
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.login(this.formLogin.value)
      .then(response => {
        console.log(response);
        this._coreService.openSnackBar('Login Successfully');
        this.router.navigate(['/list-product']);
      })
      .catch(error => {
        console.log(error);
        let errorMessage = 'Incorrect Email or Password, please try again';
  
        this._coreService.openSnackBar(errorMessage);
      });
  }
  
  onClick() {
        this.router.navigate(['/register']);    
  }
}
