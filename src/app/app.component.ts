import { Component, NgModule  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeadBarComponent } from "./head-bar/head-bar.component";
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { CommonModule} from "@angular/common"

@Component({
    selector: 'app-root',
    imports: [RouterOutlet,HeadBarComponent, RouterModule, FontAwesomeModule,CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'todo-list';
}
