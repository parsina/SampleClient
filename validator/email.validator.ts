import { FormControl } from '@angular/forms';

export interface ValidationResult
{
  [key: string]: boolean;
}

export class EmailValidator 
{
  public static validEmail(control: FormControl): ValidationResult 
  {
        let hasDot = /./.test(control.value);
        let hasAt = /@/.test(control.value);
        const valid = hasDot && hasAt;
        if (!valid) 
        {
            // return what´s not valid
            return { validEmail: true };
        }
        return null;
    }
}