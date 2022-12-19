
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { ErrorPageComponent } from './layout/error-page/error-page.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
    {path: '', component: HomeComponent, data: { breadcrumb: 'Home'}, canActivate: [AuthGuard] },
    {path: 'error', component: ErrorPageComponent, data:{message: 'Page Not Found!'} ,canActivate: [AuthGuard] },
    {path: 'not-found', component: PageNotFoundComponent ,canActivate: [AuthGuard] },
    {path: '**', redirectTo: 'not-found'}  // Needs to be always the last route
  ];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {useHash: true})  // Old browsers could have issues but can be fix with hash
        // RouterModule.forRoot(appRoutes)
    ],
    exports:[
        RouterModule
    ]
})

export class AppRoutingModule{

}
