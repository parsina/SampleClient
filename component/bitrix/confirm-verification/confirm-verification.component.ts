import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BitrixService} from '../../../service/bitrix.service';

@Component({
  selector: 'app-confirm-verification',
  templateUrl: './confirm-verification.component.html',
  styleUrls: ['./confirm-verification.component.css']
})
export class ConfirmVerificationComponent implements OnInit
{
  token: string;

  constructor(private bitrixService: BitrixService,
              private router: Router,
              private route: ActivatedRoute)
  {
  }

  ngOnInit()
  {
    this.route.queryParams.subscribe(params =>
    {
      this.token = params['token'];
    });

    this.bitrixService.confirmVerification(this.token)
      .subscribe(data =>
      {
        this.bitrixService.notify('success', '').dismiss();
        const result = JSON.parse(JSON.stringify(data));


        if (result.success)
        {
          this.bitrixService.notify("success", result.message);
          this.router.navigate(['/Login']);
        }
        else
        {
          this.bitrixService.notify("error", result.message);
        }
      });
  }
}
