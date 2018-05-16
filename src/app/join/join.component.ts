import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  joinForm: FormGroup;


  constructor(private router:Router, private loginService:LoginService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.joinForm = this.fb.group({
      'id' : ['',[Validators.required, Validators.minLength(3)]],
      'passwordsGroup' : this.fb.group({
        'password' : ['', [Validators.minLength(3), Validators.required] ],
        'pconfirm' : ['', ]
      }, {validator:equalValidator})
    });  
  }

  join() {
    if(this.joinForm.valid){
      let user = this.userObject();
      
      this.loginService.join(user)
          .subscribe( (data) => {
            window.alert(data.msg);
            this.router.navigate(['/'])
          }
      )
    }else {
      window.confirm('please input all fields')
    }
  }

  userObject(){
    return {
      id: this.joinForm.value.id,
      password: this.joinForm.value.passwordsGroup.password
    }
  }

  focusId() {
    console.log('focus');
  }

  focusOut() {
    console.log('focusOut')
  }

  get id() {return this.joinForm.get('id');}
  get password() {return this.joinForm.get('passwordsGroup.password');}
  get pconfirm() {return this.joinForm.get('passwordsGroup.pconfirm');}
  get passwordsGroup() {return this.joinForm.get('passwordsGroup');}
}

function equalValidator( {value} : FormGroup ): {[key:string] : any} {
  let [first, ...rest] = Object.keys( value|| {});
  let valid = rest.every( v => value[v] === value[first]);

  return valid ? null : {equal:true}; 
}

