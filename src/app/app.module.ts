/**
 * Main Modules
 *
*/
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppPreloadingStrategy } from './core/app_preloading_strategy';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { MomentModule } from 'ngx-moment';
import { NgModule } from '@angular/core';
/**
 * App Pages Components
 *
*/
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { AuthInterceptorService } from './core/_interceptors/auth-interceptor.service';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { ErrorPageComponent } from './layout/error-page/error-page.component';
import { TimeoutComponent } from './shared/alert/timeout/timeout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
/**
 * App Modules, Reducers
 *
*/
import { ComponentsModule } from './shared/components.module';
import { DirectivesModule } from './shared/directives.module';
import { configReducer } from './core/_store/config.reducer';
import { PipesModule } from './shared/pipes.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    BreadcrumbComponent,
    ErrorPageComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AppComponent,

  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    DirectivesModule,
    HttpClientModule,
    DataTablesModule,
    ComponentsModule,
    BrowserModule,
    CommonModule,
    MomentModule,
    PipesModule,
    FormsModule,
    AuthModule,
    NgbModule,
    AppRoutingModule,  // Main routes for the App
    NgIdleKeepaliveModule.forRoot(),
    StoreModule.forRoot({configList: configReducer})
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}, AppPreloadingStrategy],
  entryComponents:[TimeoutComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

