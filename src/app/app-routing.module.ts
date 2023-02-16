import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TopicDetailsComponent } from "./components/topic-details/topic-details.component";

const routes: Routes = [
  { path: '', component: TopicDetailsComponent },
  { path: 'topics/:id', component: TopicDetailsComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  // { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
