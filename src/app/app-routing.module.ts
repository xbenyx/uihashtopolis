
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
import { WordlistComponent } from './files/wordlist/wordlist.component';
import { WordlistEditComponent } from './files/wordlist-edit/wordlist-edit.component';
import { RulesComponent } from './files/rules/rules.component';
import { OtherComponent } from './files/other/other.component';
import { ChunkActivityComponent } from './chunk-activity/chunk-activity.component';
import { CrackersComponent } from './crackers/crackers.component';
import { BinariesComponent } from './crackers/binaries/binaries.component';
import { NewBinaryComponent } from './crackers/new-binary/new-binary.component';
import { AccountComponent } from './account/account.component';
import { SettingsComponent } from './account/settings/settings.component';
import { NotificationsComponent } from './account/notifications/notifications.component';
import { ConfigComponent } from './config/config.component';
import { ServerComponent } from './config/server/server.component';
import { HashtypesComponent } from './config/hashtypes/hashtypes.component';
import { AgentBinariesComponent } from './config/agent-binaries/agent-binaries.component';
import { LogComponent } from './config/log/log.component';
import { HealthChecksComponent } from './config/health-checks/health-checks.component';
import { PreprocessorsComponent } from './config/preprocessors/preprocessors.component';
import { UsersComponent } from './users/users.component';
import { EditUsersComponent } from './users/edit-users/edit-users.component';
import { AllUsersComponent } from './users/all-users/all-users.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { ForgotComponent } from './auth/forgot/forgot.component';

const appRoutes: Routes = [
    {path: 'auth', component: AuthComponent },
    {path: 'auth/forgot', component: ForgotComponent },
    {path: '', component: HomeComponent ,canActivate: [AuthGuard] },
    {path: 'agents', component: AgentsComponent ,canActivate: [AuthGuard] },
    {path: 'agents/agent-status', component: AgentStatusComponent ,canActivate: [AuthGuard] },
    {path: 'agents/new-agent', component: NewAgentComponent ,canActivate: [AuthGuard] },
    {path: 'agents/show-agents', component: ShowAgentsComponent ,canActivate: [AuthGuard] },
    {path: 'tasks', component: TasksComponent ,canActivate: [AuthGuard] },
    {path: 'tasks/show-tasks', component: ShowTasksComponent ,canActivate: [AuthGuard] },
    {path: 'tasks/new-tasks', component: NewTasksComponent ,canActivate: [AuthGuard] },
    {path: 'tasks/preconfigured-tasks', component: PreconfiguredTasksComponent ,canActivate: [AuthGuard] },
    {path: 'tasks/new-preconfigured-tasks', component: NewPreconfiguredTasksComponent ,canActivate: [AuthGuard] },
    {path: 'tasks/supertasks', component: SupertasksComponent ,canActivate: [AuthGuard] },
    {path: 'tasks/new-supertasks', component: NewSupertasksComponent ,canActivate: [AuthGuard] },
    {path: 'tasks/import-supertasks', component: ImportSupertasksComponent ,canActivate: [AuthGuard] },
    {path: 'lists', component: ListsComponent ,canActivate: [AuthGuard] },
    {path: 'lists/hashlist', component: HashlistComponent ,canActivate: [AuthGuard] },
    {path: 'lists/new-hashlist', component: NewHashlistComponent ,canActivate: [AuthGuard] },
    {path: 'lists/superhashlist', component: SuperhashlistComponent ,canActivate: [AuthGuard] },
    {path: 'lists/new-superhashlist', component: NewSuperhashlistComponent ,canActivate: [AuthGuard] },
    {path: 'lists/search-hash', component: SearchHashComponent ,canActivate: [AuthGuard] },
    {path: 'lists/show-cracks', component: ShowCracksComponent ,canActivate: [AuthGuard] },
    {path: 'files/wordlist', component: WordlistComponent ,canActivate: [AuthGuard] },
    {path: 'files/:id/wordlist-edit', component: WordlistEditComponent ,canActivate: [AuthGuard] },
    {path: 'files/rules', component: RulesComponent ,canActivate: [AuthGuard] },
    {path: 'files/other', component: OtherComponent ,canActivate: [AuthGuard] },
    {path: 'chunk-activity', component: ChunkActivityComponent ,canActivate: [AuthGuard] },
    {path: 'crackers', component: CrackersComponent ,canActivate: [AuthGuard] },
    {path: 'crackers/binaries', component: BinariesComponent ,canActivate: [AuthGuard] },
    {path: 'crackers/new-binary', component: NewBinaryComponent ,canActivate: [AuthGuard] },
    {path: 'account', component: AccountComponent ,canActivate: [AuthGuard] },
    {path: 'account/settings', component: SettingsComponent ,canActivate: [AuthGuard] },
    {path: 'account/notifications', component: NotificationsComponent ,canActivate: [AuthGuard] },
    {path: 'config', component: ConfigComponent ,canActivate: [AuthGuard] },
    {path: 'config/server', component: ServerComponent ,canActivate: [AuthGuard] },
    {path: 'config/hashtypes', component: HashtypesComponent ,canActivate: [AuthGuard] },
    {path: 'config/agent-binaries', component: AgentBinariesComponent ,canActivate: [AuthGuard] },
    {path: 'config/log', component: LogComponent ,canActivate: [AuthGuard] },
    {path: 'config/health-checks', component: HealthChecksComponent ,canActivate: [AuthGuard] },
    {path: 'config/preprocessors', component: PreprocessorsComponent ,canActivate: [AuthGuard] },
    {path: 'users', component: UsersComponent ,canActivate: [AuthGuard] },
    {path: 'users/:id/edit', component: EditUsersComponent ,canActivate: [AuthGuard] },
    {path: 'users/all-users', component: AllUsersComponent ,canActivate: [AuthGuard] },
    {path: 'error', component: ErrorPageComponent, data:{message: 'Page Not Found!'} ,canActivate: [AuthGuard] },
    {path: 'not-found', component: PageNotFoundComponent ,canActivate: [AuthGuard] },
    {path: '**', redirectTo: 'not-found'}  // Needs to be always the last route
  ];

@NgModule({
    imports: [
        // RouterModule.forRoot(appRoutes, {useHash: true})  // Old browsers could have issues but can be fix with hash
        RouterModule.forRoot(appRoutes)
    ],
    exports:[
        RouterModule
    ]
})

export class AppRoutingModule{

}
