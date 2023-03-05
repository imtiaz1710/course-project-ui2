import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BodyComponent } from './components/body/body.component';
import { AppRoutingModule } from './app-routing.module';
import { TopicDetailsComponent } from './components/topic-details/topic-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateRoomComponent } from './components/create-room/create-room.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './components/auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { RoomDetailsComponent } from './components/room-details/room-details.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    BodyComponent,
    TopicDetailsComponent,
    CreateRoomComponent,
    AuthComponent,
    RoomDetailsComponent,
    TopbarComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
