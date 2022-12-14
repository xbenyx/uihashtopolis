
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgentsComponent } from './agents/agents.component';
import { ShowAgentsComponent } from './agents/show-agents/show-agents.component';
import { NewAgentComponent } from './agents/new-agent/new-agent.component';
import { AgentStatusComponent } from './agents/agent-status/agent-status.component';
import { ProjectsComponent } from './projects/projects.component';
import { NewProjectComponent } from './projects/new-project/new-project.component';
import { EditProjectComponent } from './projects/edit-project/edit-project.component';
import { ShowTasksComponent } from './tasks/show-tasks/show-tasks.component';
import { NewTasksComponent } from './tasks/new-tasks/new-tasks.component';
import { PreconfiguredTasksComponent } from './tasks/preconfigured-tasks/preconfigured-tasks.component';
import { NewPreconfiguredTasksComponent } from './tasks/new-preconfigured-tasks/new-preconfigured-tasks.component';
import { SupertasksComponent } from './tasks/supertasks/supertasks.component';
import { NewSupertasksComponent } from './tasks/new-supertasks/new-supertasks.component';
import { ImportSupertasksComponent } from './tasks/import-supertasks/import-supertasks.component';
import { HashlistComponent } from './lists/hashlist/hashlist.component';
import { NewHashlistComponent } from './lists/new-hashlist/new-hashlist.component';
import { SuperhashlistComponent } from './lists/superhashlist/superhashlist.component';
import { NewSuperhashlistComponent } from './lists/new-superhashlist/new-superhashlist.component';
import { SearchHashComponent } from './lists/search-hash/search-hash.component';
import { ShowCracksComponent } from './lists/show-cracks/show-cracks.component';
import { FilesComponent } from './files/files.component';
import { FilesEditComponent } from './files/files-edit/files-edit.component';
import { ChunksComponent } from './tasks/chunks/chunks.component';
import { CrackersComponent } from './engine/crackers/crackers.component';
import { AccountComponent } from './account/account.component';
import { SettingsComponent } from './account/settings/settings.component';
import { NotificationsComponent } from './account/notifications/notifications.component';
import { ServerComponent } from './config/server/server.component';
import { YubikeyComponent } from './users/yubikey/yubikey.component';
import { HashtypesComponent } from './config/hashtypes/hashtypes.component';
import { AgentBinariesComponent } from './config/engine/agent-binaries/agent-binaries.component';
import { LogComponent } from './config/log/log.component';
import { HealthChecksComponent } from './config/health-checks/health-checks.component';
import { PreprocessorsComponent } from './engine/preprocessors/preprocessors.component';
import { UsersComponent } from './users/users.component';
import { EditUsersComponent } from './users/edit-users/edit-users.component';
import { AllUsersComponent } from './users/all-users/all-users.component';
import { GroupsComponent } from './users/groups/groups.component';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { ForgotComponent } from './auth/forgot/forgot.component';

const appRoutes: Routes = [
    {path: 'auth', component: AuthComponent,
    data: {
        breadcrumb: 'false'
    },
    },
    {path: 'auth/forgot', component: ForgotComponent,
    data: {
        breadcrumb: 'false'
    },
    },
    {path: '', component: HomeComponent ,
    data: {
        breadcrumb: 'Home'
    },
    canActivate: [AuthGuard] },
    {path: 'agents', component: AgentsComponent ,canActivate: [AuthGuard] },
    {path: 'agents/agent-status', component: AgentStatusComponent ,canActivate: [AuthGuard] },
    {path: 'agents/new-agent', component: NewAgentComponent ,canActivate: [AuthGuard] },
    {path: 'agents/show-agents', component: ShowAgentsComponent ,canActivate: [AuthGuard] },
    {path: 'projects', component: ProjectsComponent ,
    data: {
        breadcrumb: 'Projects'
    },
    canActivate: [AuthGuard] },
    {path: 'projects/new-project', component: NewProjectComponent ,canActivate: [AuthGuard] },
    {path: 'projects/:id/edit-project', component: EditProjectComponent ,canActivate: [AuthGuard] },
    {
        path: 'tasks',
        children: [
            {
              path: 'show-tasks', component: ShowTasksComponent,
              data: {
                  kind: 'show-tasks',
                  breadcrumb: 'Show tasks'
              },
              canActivate: [AuthGuard]},
            {
              path: 'new-tasks', component: NewTasksComponent,
              data: {
                  kind: 'new-tasks',
                  breadcrumb: 'New tasks'
              },
              canActivate: [AuthGuard]},
            {
              path: 'preconfigured-tasks', component: PreconfiguredTasksComponent,
              data: {
                   kind: 'preconfigured-tasks',
                   breadcrumb: 'Preconfigured tasks'
              },
              canActivate: [AuthGuard]},
            {
              path: 'new-preconfigured-tasks', component: NewPreconfiguredTasksComponent,
              data: {
                    kind: 'new-preconfigured-tasks',
                    breadcrumb: 'New Preconfigured tasks'
               },
               canActivate: [AuthGuard]},
            {
              path: 'supertasks', component: SupertasksComponent,
              data: {
                     kind: 'supertasks',
                     breadcrumb: 'Supertasks'
               },
               canActivate: [AuthGuard]},
            {
              path: 'supertasks', component: SupertasksComponent,
              data: {
                     kind: 'supertasks',
                     breadcrumb: 'Supertasks'
               },
                canActivate: [AuthGuard]},
            {
               path: 'new-supertasks', component: NewSupertasksComponent,
               data: {
                     kind: 'new-supertasks',
                     breadcrumb: 'New Supertasks'
                },
                 canActivate: [AuthGuard]},
            {
               path: 'import-supertasks', component: ImportSupertasksComponent,
               data: {
                      kind: 'import-supertasks',
                      breadcrumb: 'Import Supertasks'
                },
                 canActivate: [AuthGuard]},
            {
                path: 'chunks', component: ChunksComponent,
                data: {
                       kind: 'chunks',
                       breadcrumb: 'Chunks'
                },
                 canActivate: [AuthGuard]},
        ]
    },
    {
        path: 'lists',
        children: [
          {
            path: 'hashlist', component: HashlistComponent,
            data: {
                kind: 'hashlist',
                breadcrumb: 'Hashlist'
            },
            canActivate: [AuthGuard]},
          {
            path: 'archived', component: HashlistComponent,
            data: {
                kind: 'archived',
                breadcrumb: 'Hashlist Archived'
            },
            canActivate: [AuthGuard]},
          {
            path: 'new-hashlist', component: NewHashlistComponent,
            data: {
                kind: 'new-hashlist',
                breadcrumb: 'New Hashlist'
            },
            canActivate: [AuthGuard]},
          {
            path: 'superhashlist', component: SuperhashlistComponent,
            data: {
                kind: 'super-hashlist',
                breadcrumb: 'Super Hashlist'
            },
            canActivate: [AuthGuard]},
          {
            path: 'new-superhashlist', component: NewSuperhashlistComponent,
            data: {
                kind: 'new-superhashlist',
                breadcrumb: 'New Super Hashlist'
            },
            canActivate: [AuthGuard]},
          {
            path: 'search-hash', component: SearchHashComponent,
            data: {
                kind: 'search-hash',
                breadcrumb: 'Search-hash'
            },
            canActivate: [AuthGuard]},
          {
            path: 'show-cracks', component: ShowCracksComponent,
            data: {
                kind: 'show-cracks',
                breadcrumb: 'Show Cracks'
            },
            canActivate: [AuthGuard]},
        ]
    },
    {
        path: 'files',
        children: [
          {
            path: 'wordlist',  component: FilesComponent,
            data: {
                kind: 'wordlist',
                breadcrumb: 'Wordlist'
            },
            canActivate: [AuthGuard]},
          {
            path: ':id/wordlist-edit',  component: FilesEditComponent,
            data: {
                kind: 'wordlist-edit',
                breadcrumb: 'Wordlist Edit'
            },
            canActivate: [AuthGuard]},
          {
            path: 'rules', component: FilesComponent,
            data: {
                kind: 'rules',
                breadcrumb: 'Rules'
            },
            canActivate: [AuthGuard]},
          {
            path: ':id/rules-edit',  component: FilesEditComponent,
            data: {
                kind: 'rules-edit',
                breadcrumb: 'Rules Edit'
            },
            canActivate: [AuthGuard]},
          {
            path: 'other', component: FilesComponent,
            data: {
                kind: 'other',
                breadcrumb: 'Other'
            },
            canActivate: [AuthGuard]},
          {
            path: ':id/other-edit',  component: FilesEditComponent,
            data: {
                kind: 'other-edit',
                breadcrumb: 'Other Edit'
            },
            canActivate: [AuthGuard]},
        ]
    },
    {path: 'tasks/chunks', component: ChunksComponent ,canActivate: [AuthGuard] },
    {path: 'engine/crackers', component: CrackersComponent ,canActivate: [AuthGuard] },
    {path: 'engine/preprocessors', component: PreprocessorsComponent ,canActivate: [AuthGuard] },
    {path: 'account', component: AccountComponent ,canActivate: [AuthGuard] },
    {path: 'account/settings', component: SettingsComponent ,canActivate: [AuthGuard] },
    {path: 'account/notifications', component: NotificationsComponent ,canActivate: [AuthGuard] },
    {
        path: 'config',
        children: [
            {
              path: 'cracking',  component: ServerComponent,
              data: {
                  kind: 'cracking',
                  breadcrumb: 'Cracking'
              },
              canActivate: [AuthGuard]},
            {
              path: 'finetunning',  component: ServerComponent,
              data: {
                  kind: 'finetunning',
                  breadcrumb: 'Finetunning'
              },
              canActivate: [AuthGuard]},
            {
              path: 'ui',  component: ServerComponent,
              data: {
                  kind: 'ui',
                  breadcrumb: 'UI'
              },
              canActivate: [AuthGuard]},
            {
              path: 'yubikey',  component: ServerComponent,
              data: {
                  kind: 'yubikey',
                  breadcrumb: 'Yubikey'
              },
              canActivate: [AuthGuard]},
            {
              path: 'notifications',  component: ServerComponent,
              data: {
                  kind: 'notifications',
                  breadcrumb: 'Notifications'
              },
              canActivate: [AuthGuard]},
            {
              path: 'server',  component: ServerComponent,
              data: {
                  kind: 'server',
                  breadcrumb: 'Server'
              },
              canActivate: [AuthGuard]},
        ]
    },
    {path: 'config/hashtypes', component: HashtypesComponent ,
    data: {
        breadcrumb: 'Hashtypes'
    },
    canActivate: [AuthGuard] },
    {path: 'config/log', component: LogComponent ,
    data: {
        breadcrumb: 'Logs'
    },
    canActivate: [AuthGuard] },
    {path: 'config/health-checks', component: HealthChecksComponent ,    data: {
        breadcrumb: 'Health Checks'
    },
    canActivate: [AuthGuard] },
    {
      path: 'config/engine',
      children: [
        {
          path: 'agent-binaries',  component: AgentBinariesComponent,
          data: {
              kind: 'agent-binaries',
              breadcrumb: 'Agent Binaries'
          },
          canActivate: [AuthGuard]},
        {
          path: 'crackers',  component: CrackersComponent,
          data: {
              kind: 'crackers',
              breadcrumb: 'Crackers'
          },
          canActivate: [AuthGuard]},
        {
          path: 'preprocessors',  component: PreprocessorsComponent,
          data: {
              kind: 'preprocessors',
              breadcrumb: 'Preprocessors'
          },
          canActivate: [AuthGuard]},
        ]
    },
    {path: 'users', component: UsersComponent ,canActivate: [AuthGuard] },
    {path: 'users/:id/edit', component: EditUsersComponent ,canActivate: [AuthGuard] },
    {path: 'users/all-users', component: AllUsersComponent ,canActivate: [AuthGuard] },
    {path: 'users/yubikey', component: YubikeyComponent ,canActivate: [AuthGuard] },
    {path: 'users/groups', component: GroupsComponent ,
    data: {
        breadcrumb: 'Access Group'
    },
    canActivate: [AuthGuard] },
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
