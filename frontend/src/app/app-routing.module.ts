import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GridComponent } from './components/grid/grid.component';

const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'dashboard', component: DashboardComponent },
{ path: 'login', component: LoginSignupComponent },
{ path: 'grid', component: GridComponent },
 { path: '**', redirectTo: '', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
