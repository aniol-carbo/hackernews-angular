import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon'
import {MatGridListModule} from '@angular/material/grid-list';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component'
import { HttpClientModule } from '@angular/common/http';
import { NewTweetComponent } from './new-tweet/new-tweet.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ViewTweetComponent } from './view-tweet/view-tweet.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { CommentComponent } from './comment/comment.component';
import { UsersComponent } from './users/users.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HomeCommentsComponent } from './home-comments/home-comments.component';
import { MatMenuModule } from '@angular/material/menu';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NewTweetComponent,
    ViewTweetComponent,
    CommentComponent,
    UsersComponent,
    HomeCommentsComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDividerModule,
    MatCardModule,
    MatInputModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
