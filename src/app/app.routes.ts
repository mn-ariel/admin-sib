import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LayoutAdminComponent } from './shared/layout-admin/layout-admin.component';
import { AgreementCreateComponent } from './features/agreement/components/agreement-create/agreement-create.component' 
import { RegisterComponent } from './features/auth/register/register.component' 
import { HomeComponent } from './shared/home/home.component'

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutAdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'new-agreement', component: AgreementCreateComponent, canActivate: [AuthGuard] },
      { path: 'new-user', component: RegisterComponent, canActivate: [AuthGuard] },
    ],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];