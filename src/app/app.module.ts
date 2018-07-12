import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomePageViewComponent } from './SecondPhase/HomePageView/homePageViewComponent';
import { BattleFieldComponent } from './SecondPhase/BattlefieldView/battleFieldComponent';
import { GenericService } from './service/genericService';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectionViewComponent } from './FirstPhase/SelectionsView/selectionViewComponent';
import { SingleBattleComponent } from './FirstPhase/SingleBattleView/singleBattleViewComponent';
import { TransictionComponent } from './UtilityView/transictionView';
import { MenuComponent } from './menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPlayerComponent } from './add-player/add-player.component';

@NgModule({
  declarations: [
    AppComponent,
    BattleFieldComponent,
    HomePageViewComponent,
    SelectionViewComponent,
    SingleBattleComponent,
    TransictionComponent,
    MenuComponent,
    AddPlayerComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [GenericService],
  bootstrap: [AppComponent]
})
export class AppModule { }
