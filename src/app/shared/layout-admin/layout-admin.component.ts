import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';

@Component({
  selector: 'app-layout-admin',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './layout-admin.component.html',
  styleUrls: ['./layout-admin.component.css']
})

export class LayoutAdminComponent {
  constructor(private _usersServ: AuthService) {

  }

  ngOnInit() {

    //console.log(this._usersServ.getToken())

  }
  logout() {
    this._usersServ.logout()
  }



}
