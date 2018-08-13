import { FormControl, FormGroup } from '@angular/forms';

export interface ValidationResult
{
  [key: string]: boolean;
}

export class PasswordValidator 
{
  public static strong(control: FormControl): ValidationResult 
  {
        let hasNumber = /\d/.test(control.value);
        let hasUpper = /[A-Z]/.test(control.value);
        let hasLower = /[a-z]/.test(control.value);
        let min = control.value.length >= 8;
        const valid = hasNumber && hasUpper && hasLower && min;
        if (!valid) 
        {
            // return what´s not valid
            return { strong: true };
        }
        return null;
    }
  
  public static match(group: FormGroup): ValidationResult 
  {
//    if(group.controls.repeatPassword.value == "")
//      alert(group.controls.repeatedPassword);
    
    let password = group.controls.password.value;
    let repeatedPassword = group.controls.repeatedPassword.value;
    
    if (repeatedPassword.length <= 0)
      return null;
    
    if (repeatedPassword !== password) 
    {
      return { matchPassword: true };
    }
 
    return null;
   }
}