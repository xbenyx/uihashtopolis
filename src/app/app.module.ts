/**
 * Main Modules
 *
*/
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Todo PrimeNG

/**
 * App Pages Components
 *
*/
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { ErrorPageComponent } from './layout/error-page/error-page.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
/**
 * App Modules
 *
*/
import { AgentsModule } from './agents/agent.module';
import { ConfigModule } from './config/config.module';
import { ComponentsModule } from './shared/components.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { ProjectsModule } from './projects/projects.module';
import { HashlistModule } from './hashlists/hashlists.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { AccountModule } from './account/account.module';
import { DirectivesModule } from './shared/directives.module';
import { PipesModule } from './shared/pipes.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BreadcrumbComponent,
    BreadcrumbComponent,
    FooterComponent,
    HomeComponent,
    PageNotFoundComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule,
    DataTablesModule,
    CommonModule,
    AuthModule,
    AccountModule,
    AgentsModule,
    ConfigModule,
    FilesModule,
    HashlistModule,
    TasksModule,
    ProjectsModule,
    UsersModule,
    DirectivesModule,
    PipesModule,
    ComponentsModule,
    AppRoutingModule

  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {

}

