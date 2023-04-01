import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  public userId!: number;
  userDetail!: User;

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['id'];
      this.fetchUserDetails(this.userId);
    });
  }

  fetchUserDetails(userId: number) {
    this.api.getUserById(this.userId).subscribe((res: any) => {
      this.userDetail = res;
    })
  }

}
