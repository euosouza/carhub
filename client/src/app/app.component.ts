import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ToastNotificationContentComponent } from './components/toast-notification-content/toast-notification-content.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ToastNotificationContentComponent,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isDarkMode = false;

  ngOnInit() {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    this.isDarkMode = localStorage.getItem('dark-mode') === 'true' || (!localStorage.getItem('dark-mode') && prefersDarkScheme);
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    }
  }


  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
