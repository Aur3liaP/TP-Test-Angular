import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BoardComponent } from "../components/board/board.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, RouterLink]
})
export class AppComponent {
  title = 'TP-Test-Angular';
}
