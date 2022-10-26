import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPowerOff, faSun, faMoon, faUserCircle, faInbox, faQuestionCircle, faBell } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
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

  faPowerOff=faPowerOff;
  faBell=faBell;
  faSun=faSun;
  faMoon=faMoon;
  faUserCircle=faUserCircle;
  faInbox=faInbox;
  faQuestionCircle=faQuestionCircle;

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




