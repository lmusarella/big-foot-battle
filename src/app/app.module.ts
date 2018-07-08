import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomePageViewComponent } from './homePageView/homePageViewComponent';
import { BattleFieldComponent } from './battlefieldView/battleFieldComponent';
import { GenericService } from './service/genericService';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridList, MatGridTile } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    BattleFieldComponent,
    HomePageViewComponent,
    MatGridList,
    MatGridTile
  ],
  imports: [
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [GenericService],
  bootstrap: [AppComponent]
})
export class AppModule { }
