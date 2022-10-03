
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
import { FilesComponent } from './files/files.component';
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

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'agents', component: AgentsComponent},
    {path: 'agents/agent-status', component: AgentStatusComponent},
    {path: 'agents/new-agent', component: NewAgentComponent},
    {path: 'agents/show-agents', component: ShowAgentsComponent},
    {path: 'tasks', component: TasksComponent},
    {path: 'tasks/show-tasks', component: ShowTasksComponent},
    {path: 'tasks/new-tasks', component: NewTasksComponent},
    {path: 'tasks/preconfigured-tasks', component: PreconfiguredTasksComponent},
    {path: 'tasks/new-preconfigured-tasks', component: NewPreconfiguredTasksComponent},
    {path: 'tasks/supertasks', component: SupertasksComponent},
    {path: 'tasks/new-supertasks', component: NewSupertasksComponent},
    {path: 'tasks/import-supertasks', component: ImportSupertasksComponent},
    {path: 'lists', component: ListsComponent},
    {path: 'lists/hashlist', component: HashlistComponent},
    {path: 'lists/new-hashlist', component: NewHashlistComponent},
    {path: 'lists/superhashlist', component: SuperhashlistComponent},
    {path: 'lists/new-superhashlist', component: NewSuperhashlistComponent},
    {path: 'lists/search-hash', component: SearchHashComponent},
    {path: 'lists/show-cracks', component: ShowCracksComponent},
    {path: 'files', component: FilesComponent},
    {path: 'chunk-activity', component: ChunkActivityComponent},
    {path: 'crackers', component: CrackersComponent},
    {path: 'crackers/binaries', component: BinariesComponent},
    {path: 'crackers/new-binary', component: NewBinaryComponent},
    {path: 'account', component: AccountComponent},
    {path: 'account/settings', component: SettingsComponent},
    {path: 'account/notifications', component: NotificationsComponent},
    {path: 'config', component: ConfigComponent},
    {path: 'config/server', component: ServerComponent},
    {path: 'config/hashtypes', component: HashtypesComponent},
    {path: 'config/agent-binaries', component: AgentBinariesComponent},
    {path: 'config/log', component: LogComponent},
    {path: 'config/health-checks', component: HealthChecksComponent},
    {path: 'config/preprocessors', component: PreprocessorsComponent},
    {path: 'users', component: UsersComponent},
    {path: 'users/:id/edit', component: EditUsersComponent},
    {path: 'users/all-users', component: AllUsersComponent},
    {path: 'not-found', component: PageNotFoundComponent},
    {path: '**', redirectTo: 'not-found'}  // Needs to be always the last route
  ];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports:[
        RouterModule
    ]
})

export class AppRoutingModule{

}