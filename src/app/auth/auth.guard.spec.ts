import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    // Set up TestBed with necessary providers and imports
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          useValue: {
            isLoggedIn: jasmine.createSpy('isLoggedIn').and.returnValue(false), // Mocked AuthService
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'), // Mocked Router
          },
        },
      ],
    });

    // Inject AuthGuard, AuthService, and Router
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should redirect to login if not authenticated', () => {
    // Ensure the guard returns false if the user is not authenticated
    expect(guard.canActivate()).toBeFalse();
    // Verify that router navigates to '/login'
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should allow activation if authenticated', () => {
    // Mock isLoggedIn to return true
    (authService.isLoggedIn as jasmine.Spy).and.returnValue(true);

    // Ensure the guard returns true if the user is authenticated
    expect(guard.canActivate()).toBeTrue();
  });
});
