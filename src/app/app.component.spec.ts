import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';

// Mock BreakpointObserver
const breakpointObserverMock = {
  observe: (): Observable<{ matches: boolean }> => of({ matches: true }),
};

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        RouterModule.forRoot([]),
      ],
      providers: [{ provide: BreakpointObserver, useValue: breakpointObserverMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    // Prevent actual DOM/localStorage side-effects
    spyOn(localStorage, 'setItem');
    spyOn(document.documentElement, 'setAttribute');

    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy(); // ensures ngOnDestroy is called and subscriptions cleaned
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle theme', () => {
    const initialTheme = component.theme();
    component.toggleTheme();
    expect(component.theme()).toBe(initialTheme === 'dark' ? 'light' : 'dark');
  });

  it('should set isDesktop to true based on breakpoint observer', () => {
    expect(component.isDesktop).toBeTrue();
  });
});
