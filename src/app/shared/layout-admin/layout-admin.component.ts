import { RouterModule } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-layout-admin',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './layout-admin.component.html',
  styleUrls: ['./layout-admin.component.css']
})

export class LayoutAdminComponent {
  user: string | null = "";
  dropdownOpen = false;
  
  constructor(private _usersServ: AuthService) {

  }

  ngOnInit() {

    this.getUserSesion();

  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    this._usersServ.logout()
  }

  getUserSesion() {
    this.user = this._usersServ.getUser()
  }

}
