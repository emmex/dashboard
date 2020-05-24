import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent implements OnInit {

  processing = false;
  showSuccessMessage = false;
  showErrorMessage = false;
  errorMessage: string;

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit(): void {
    this.processing = true;
    this.userService.confirmEmail(this.route.snapshot.queryParams.uuid, this.route.snapshot.queryParams.email).subscribe(() => {
      this.processing = false;
      this.showSuccessMessage = true;
    }, error => {
      this.processing = false;
      this.showErrorMessage = true;
      this.errorMessage = error.error.message;
      throw error;
    });
  }

}
