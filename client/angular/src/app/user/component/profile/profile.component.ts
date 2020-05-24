import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../model/user.model';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  emailSending = false;
  showConfirmationInfo = false;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.user = route.snapshot.data.user;
  }

  ngOnInit(): void {
  }

  sendConfirmationRequest() {
    this.emailSending = true;
    this.userService.sendConfirmationRequest().subscribe(() => {
      this.showConfirmationInfo = true;
      this.emailSending = false;
    }, error => {
      this.emailSending = false;
      throw error;
    });
  }

  hideConfirmationInfo() {
    this.showConfirmationInfo = false;
  }

}
