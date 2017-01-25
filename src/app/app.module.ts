import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthResolve } from './auth.resolve';
import { BaseService } from './services/base.service';
import { HttpService } from './services/http.service';
import { RoomService } from './services/room.service';
import { SourcesService } from './services/sources.service';
import { OnlineService } from './services/online.service';
import { LoadedService } from './services/loaded.service';

import { AppComponent } from './app.component';
import { LibraryItemComponent } from './components/library-item/library-item.component';
import { LibraryComponent } from './components/library/library.component';
import { EditorComponent } from './components/editor/editor.component';
import { OptionsComponent } from './components/options/options.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { CreateEffectComponent } from './components/workspace/create-effect/create-effect.component';

const getAuthHeader = function() {
  var currentUser = JSON.parse(localStorage.getItem('currentUser'));
  return currentUser && currentUser.token;
}

const appRoutes: Routes = [
  {
    path: 'room/:roomId',
    component: EditorComponent,
    resolve: {
      auth: AuthResolve
    }
  }, {
    path: '',
    component: EditorComponent,
    resolve: {
      auth: AuthResolve
    }
  }
]

export function httpServiceFactory(backend: XHRBackend, options: RequestOptions) {
  return new HttpService(backend, options);
}

@NgModule({
  declarations: [
    AppComponent,
    LibraryItemComponent,
    LibraryComponent,
    EditorComponent,
    OptionsComponent,
    WorkspaceComponent,
    CreateEffectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
     {
      provide: HttpService,
      useFactory: httpServiceFactory,
      deps: [XHRBackend, RequestOptions]
    },
    AuthResolve,
    BaseService,
    RoomService,
    SourcesService,
    OnlineService,
    LoadedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
