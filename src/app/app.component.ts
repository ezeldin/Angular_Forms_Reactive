import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  genders = ['male', 'female'];
  signUpForm: FormGroup;
  forbiddenNames: string[] = ['moi', 'me']

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'userData': new FormGroup({
        'userName': new FormControl(null, [Validators.required, this.forbiddenNamesValidator.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmailsValidatorAsync),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    })
  }

  GetHobbies() {
    return (<FormArray>this.signUpForm.get('hobbies')).controls
  }

  onSubmit(): void {
    console.log(this.signUpForm);
  }

  OnAddHobby() {
    const myControl = new FormControl(null, Validators.required);
    (<FormArray>(this.signUpForm.get('hobbies'))).controls.push(myControl);
  }

  forbiddenNamesValidator(control: FormControl): { [key: string]: boolean } {
    if (this.forbiddenNames.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true }
    }
    return null;
  }

  forbiddenEmailsValidatorAsync(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'ez@ez.com') {
          resolve({ 'emailIsForbidden': true })
        }
        else {
          resolve(null)
        }
      }, 1500)
    })
    return promise;
  }

}
