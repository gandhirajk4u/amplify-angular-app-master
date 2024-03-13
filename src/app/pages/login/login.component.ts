import { Component, OnInit, NgZone } from '@angular/core';
import { Auth, Hub } from 'aws-amplify';
import { Router } from '@angular/router';
import { AmplifyService } from 'aws-amplify-angular'
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
otp: FormControl = new FormControl('');
showOtp:boolean = false;
user:any;
  constructor(
    private router: Router,
    private amplifyService: AmplifyService,
    private zone: NgZone,
    private spinner: NgxSpinnerService) {


    // Used for listening to login events
    Hub.listen("auth", ({ payload: { event, data } }) => {
      if (event === "cognitoHostedUI" || event === "signedIn") {
        console.log(event);
        this.zone.run(() => this.router.navigate(['/dashboard']));
      } else {
        this.spinner.hide();
      }
    });

    //currentAuthenticatedUser: when user comes to login page again
    Auth.currentAuthenticatedUser()
      .then(() => {
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      }).catch((err) => {
        this.spinner.hide();
        console.log(err);
      })

  }

  ngOnInit() { }

  onLoginClick() {
    this.spinner.show();
    const a =Auth.federatedSignIn();
    console.log(a);
  }

  onOtpClick() {
    this.spinner.show();
    debugger;
    if (this.user.challengeName === 'SMS_MFA' ||
    this.user.challengeName === 'SOFTWARE_TOKEN_MFA') {
        // You need to get the code from the UI inputs
        // and then trigger the following function with a button click
        // If MFA is enabled, sign-in should be confirmed with the confirmation code
        const code = this.otp.value;
        const loggedUser = Auth.confirmSignIn(
          this.user,   // Return object from Auth.signIn()
            code,   // Confirmation code  
            "SMS_MFA" // MFA Type e.g. SMS_MFA, SOFTWARE_TOKEN_MFA
        );
    }
  }

  async onLoginClickOkta() {
    this.spinner.show();
    // Auth.signIn("970700086","Test@2024").then(await Auth.confirmSignIn("970700086", "12345"));

    this.user = await Auth.signIn("970700086","Test@2024");

     this.showOtp = true;  
     this.spinner.hide();  
 
  }

}

function getCodeFromUserInput() {
  throw new Error('Function not implemented.');
}

