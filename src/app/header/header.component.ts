import { Component, OnDestroy, OnInit } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
  isAuthentificated = false;
  private userSub: Subscription;
  storedToggletheme:string = localStorage.getItem('toggledarkmode');

  constructor(private authService: AuthService) { }

  collapsed = true;
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  faSignOutAlt=faSignOutAlt;
  faSun=faSun;
  faMoon=faMoon;

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthentificated = !!user;
    });

  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogOut(){
    this.authService.logOut();
  }

  switchMode(){
    if(this.storedToggletheme === 'dark'){
      localStorage.setItem('toggledarkmode','light')
      this.storedToggletheme = localStorage.getItem('toggledarkmode');
    }else{
      localStorage.setItem('toggledarkmode','dark')
      this.storedToggletheme = localStorage.getItem('toggledarkmode');
    }
  }

}




