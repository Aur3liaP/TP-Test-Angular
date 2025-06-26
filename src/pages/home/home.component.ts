import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  boards = [
    { id: 1, title: 'Choses à faire' },
    { id: 2, title: 'Projet perso' },
    { id: 3, title: 'Les bonnes résolutions 2025' },
  ];

  constructor(private router: Router) {}

  goToBoard(id: number) {
    this.router.navigate(['/board', id]);
  }
}
