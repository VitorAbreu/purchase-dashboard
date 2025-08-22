import { AfterViewInit, Component, effect, inject, OnDestroy, signal, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit, OnDestroy {
  theme = signal<'light' | 'dark'>(localStorage.getItem('theme') === 'dark' ? 'dark' : 'light');
  breakpointObserver = inject(BreakpointObserver);
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  isDesktop: boolean = true;
  private breakpointSub!: Subscription;

  constructor() {
    effect(() => {
      const theme = this.theme();
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    });
  }

  ngAfterViewInit(): void {
    this.breakpointSub = this.breakpointObserver.observe(['(min-width: 1440px)']).subscribe((result) => {
      setTimeout(() => {
        this.isDesktop = result.matches;
        if (this.isDesktop) {
          this.sidenav.open();
          this.sidenav.mode = 'side'; // always visible
        } else {
          this.sidenav.close();
          this.sidenav.mode = 'over'; // overlays content
        }
      });
    });
  }

  toggleTheme(): void {
    this.theme.set(this.theme() === 'dark' ? 'light' : 'dark');
  }

  ngOnDestroy(): void {
    this.breakpointSub.unsubscribe();
  }
}
