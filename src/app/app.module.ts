// App Main Modules
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

// App Custom Directives
import { SelectizeDirective } from './directives/selectize.directive';
import { FileSelectDirective } from './directives/file-select.directive';
import { FileDropDirective } from './directives/file-drop.directive';

// App Custom Pipes
import { FileSizePipe } from './pipes/file-size.pipe';
import { WarningColorPipe } from './pipes/warning-color.pipe';
import { ShortenStringPipe } from './pipes/shorten-string.pipe';
import { StaticArrayPipe } from './pipes/static-array.pipe';
import { SearchPipe } from './pipes/filter-search.pipe';
import { ArraySortPipe } from './pipes/orderby-item.pipe';
import { FileTypePipe } from './pipes/file-type.pipe';

// App Pages Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { AgentsComponent } from './agents/agents.component';
import { ShowAgentsComponent } from './agents/show-agents/show-agents.component';
import { NewAgentComponent } from './agents/new-agent/new-agent.component';
import { AgentStatusComponent } from './agents/agent-status/agent-status.component';
import { TasksComponent } from './tasks/tasks.component';
import { ShowTasksComponent } from './tasks/show-tasks/show-tasks.component';
import { NewTasksComponent } from './tasks/new-tasks/new-tasks.component';
import { PreconfiguredTasksComponent } from './tasks/preconfigured-tasks/preconfigured-tasks.component';
import { NewPreconfiguredTasksComponent } from './tasks/new-preconfigured-tasks/new-preconfigured-tasks.component';
import { SupertasksComponent } from './tasks/supertasks/supertasks.component';
import { NewSupertasksComponent } from './tasks/new-supertasks/new-supertasks.component';
import { ImportSupertasksComponent } from './tasks/import-supertasks/import-supertasks.component';
import { ListsComponent } from './lists/lists.component';
import { HashlistComponent } from './lists/hashlist/hashlist.component';
import { NewHashlistComponent } from './lists/new-hashlist/new-hashlist.component';
import { SuperhashlistComponent } from './lists/superhashlist/superhashlist.component';
import { NewSuperhashlistComponent } from './lists/new-superhashlist/new-superhashlist.component';
import { SearchHashComponent } from './lists/search-hash/search-hash.component';
import { ShowCracksComponent } from './lists/show-cracks/show-cracks.component';
import { ChunkActivityComponent } from './chunk-activity/chunk-activity.component';
import { CrackersComponent } from './engine/crackers/crackers.component';
import { AccountComponent } from './account/account.component';
import { SettingsComponent } from './account/settings/settings.component';
import { NotificationsComponent } from './account/notifications/notifications.component';
import { ConfigComponent } from './config/config.component';
import { ServerComponent } from './config/server/server.component';
import { CrackingComponent } from './config/server/cracking/cracking.component';
import { FinetunningComponent } from './config/server/finetunning/finetunning.component';
import { NotificationsConfigComponent } from './config/server/notifications/notifications.component';
import { UiComponent } from './config/server/ui/ui.component';
import { MulticastComponent } from './config/server/multicast/multicast.component';
import { HashtypesComponent } from './config/hashtypes/hashtypes.component';
import { AgentBinariesComponent } from './engine/agent-binaries/agent-binaries.component';
import { LogComponent } from './config/log/log.component';
import { HealthChecksComponent } from './config/health-checks/health-checks.component';
import { PreprocessorsComponent } from './engine/preprocessors/preprocessors.component';
import { UsersComponent } from './users/users.component';
import { EditUsersComponent } from './users/edit-users/edit-users.component';
import { AllUsersComponent } from './users/all-users/all-users.component';
import { YubikeyComponent } from './users/yubikey/yubikey.component';
import { GroupsComponent } from './users/groups/groups.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { FilesComponent } from './files/files.component';
import { FilesEditComponent } from './files/files-edit/files-edit.component';
import { WordlistEditComponent } from './files/wordlist-edit/wordlist-edit.component';
import { RulesEditComponent } from './files/rules-edit/rules-edit.component';
import { OtherEditComponent } from './files/other-edit/other-edit.component';
import { ProjectsComponent } from './projects/projects.component';
import { NewProjectComponent } from './projects/new-project/new-project.component';
import { EditProjectComponent } from './projects/edit-project/edit-project.component';
import { EditHashlistComponent } from './lists/edit-hashlist/edit-hashlist.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BreadcrumbComponent,
    BreadcrumbComponent,
    FooterComponent,
    AgentsComponent,
    ShowAgentsComponent,
    NewAgentComponent,
    AgentStatusComponent,
    TasksComponent,
    ShowTasksComponent,
    NewTasksComponent,
    PreconfiguredTasksComponent,
    NewPreconfiguredTasksComponent,
    SupertasksComponent,
    NewSupertasksComponent,
    ImportSupertasksComponent,
    ListsComponent,
    HashlistComponent,
    NewHashlistComponent,
    SuperhashlistComponent,
    NewSuperhashlistComponent,
    SearchHashComponent,
    ShowCracksComponent,
    FilesComponent,
    FilesEditComponent,
    WordlistEditComponent,
    RulesEditComponent,
    OtherEditComponent,
    ChunkActivityComponent,
    CrackersComponent,
    AccountComponent,
    SettingsComponent,
    NotificationsComponent,
    ConfigComponent,
    ServerComponent,
    CrackingComponent,
    YubikeyComponent,
    FinetunningComponent,
    UiComponent,
    MulticastComponent,
    NotificationsConfigComponent,
    HashtypesComponent,
    AgentBinariesComponent,
    LogComponent,
    HealthChecksComponent,
    PreprocessorsComponent,
    UsersComponent,
    EditUsersComponent,
    AllUsersComponent,
    GroupsComponent,
    HomeComponent,
    PageNotFoundComponent,
    ErrorPageComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    ForgotComponent,
    ProjectsComponent,
    NewProjectComponent,
    EditProjectComponent,
    EditHashlistComponent,
    SelectizeDirective,
    FileSelectDirective,
    FileDropDirective,
    FileSizePipe,
    WarningColorPipe,
    ShortenStringPipe,
    StaticArrayPipe,
    SearchPipe,
    ArraySortPipe,
    FileTypePipe
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
    AppRoutingModule,

  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {

}

