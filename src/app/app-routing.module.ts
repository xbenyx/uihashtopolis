import { AppPreloadingStrategy } from './core/app_preloading_strategy';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { ErrorPageComponent } from './layout/error-page/error-page.component';
import { IsAuth } from './core/_guards/auth.guard';

const appRoutes: Routes = [
    {path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
      data: { preload: true, delay: false }
    },
    {
      path: 'projects',
      loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule),
      data: { preload: true, delay: false }
    },
    {
      path: 'agents',
      loadChildren: () => import('./agents/agent.module').then(m => m.AgentsModule),
      data: { preload: true, delay: false }
    },
    {
      path: 'tasks',
      loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule),
      data: { preload: true, delay: false }
    },
    {
      path: 'hashlists',
      loadChildren: () => import('./hashlists/hashlists.module').then(m => m.HashlistModule),
      data: { preload: true, delay: true }
    },
    {
      path: 'files',
      loadChildren: () => import('./files/files.module').then(m => m.FilesModule),
      data: { preload: false, delay: false }
    },
    {
      path: 'account',
      loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
      data: { preload: false, delay: false }
    },
    {
      path: 'users',
      loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
      data: { preload: false, delay: false }
    },
    {
      path: 'config',
      loadChildren: () => import('./config/config.module').then(m => m.ConfigModule),
      data: { preload: false, delay: false }
    },
    {path: 'error', component: ErrorPageComponent, data:{message: 'Page Not Found!'} ,canActivate: [IsAuth] },
    {path: 'access-denied', component: ErrorPageComponent, data:{message: 'Sorry, You are not allowed to access this page!'} ,canActivate: [IsAuth] },
    {path: 'not-found', component: PageNotFoundComponent ,canActivate: [IsAuth] },
    {path: '**', redirectTo: 'not-found'}  // Note: Always the last route. Don't change position.
  ];

@NgModule({
    imports: [
        RouterModule.forRoot(
          appRoutes,
          {
    // enableTracing: false, // <-- Debugging purposes only
    preloadingStrategy: AppPreloadingStrategy,
    useHash: true // Old browsers could have issues but can be fixed setting useHash: true. Note: if its enabled it will affect redirectURL after login
})
    ],
    exports:[
        RouterModule
    ]
})

export class AppRoutingModule{}
