import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(private router: Router) {}

  handleLogoClick(): void {
    if (this.router.url === '/home') {
      location.reload();
    } else {
      this.router.navigate(['/home']);
    }
  }
}
