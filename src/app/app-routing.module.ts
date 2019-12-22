import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ViewComponent } from './view/view.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
                      {path:'',component:IndexComponent},

                     {path:'home',component:HomeComponent},
                    {path:'signup',component:SignupComponent},
                    {path:'login',component:LoginComponent},
                    {path:'view',component:ViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
