import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./components/auth/auth.component";
import { RoomDetailsComponent } from "./components/room-details/room-details.component";
import { TopicDetailsComponent } from "./components/topic-details/topic-details.component";
import { AuthGuard } from "./guards/auth-guard";

const routes: Routes = [
  { path: '', component: TopicDetailsComponent, canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent },
  { path: 'topics/:id', component: TopicDetailsComponent },
  { path: 'topics/:id/:roomId', component: RoomDetailsComponent },

  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  // { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
