import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeCommentsComponent } from './home-comments/home-comments.component';
import { HomeComponent } from './home/home.component';
import { NewTweetComponent } from './new-tweet/new-tweet.component';
import { SettingsComponent } from './settings/settings.component';
import { UsersComponent } from './users/users.component';
import { ViewTweetComponent } from './view-tweet/view-tweet.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'home/:info/:userId', component: HomeComponent},
  {path: 'home/:order', component: HomeComponent},
  {path: 'tweet', component: NewTweetComponent},
  {path: 'users/:id', component: UsersComponent},
  {path: 'tweet/:id', component: ViewTweetComponent},
  {path: 'comments', component: HomeCommentsComponent},
  {path: 'comments/:info/:userId', component: HomeCommentsComponent},
  {path: 'settings', component: SettingsComponent},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
