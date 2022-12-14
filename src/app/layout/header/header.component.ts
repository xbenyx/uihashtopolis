import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPowerOff, faSun, faMoon, faUserCircle, faInbox, faQuestionCircle, faBell, faEye } from '@fortawesome/free-solid-svg-icons';
import { environment } from './../../../environments/environment';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { NotificationsBellService } from '../../core/_services/shared/notifbell.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy {
  headerConfig = environment.config.header;

  isAuthentificated = false;
  isMobile = false;
  private userSub: Subscription;
  storedToggletheme:string = localStorage.getItem('toggledarkmode');

  // Icons User Menu
    faPowerOff=faPowerOff;
    faBell=faBell;
    faSun=faSun;
    faMoon=faMoon;
    faUserCircle=faUserCircle;
    faInbox=faInbox;
    faQuestionCircle=faQuestionCircle;
    faEye=faEye;

  public notifbell: {title: string, description: string, datetime: string}[] = [];

  constructor(private authService: AuthService, private notificationbService: NotificationsBellService) { }

  collapsed = true;
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  getUser(){
    const userData: { _username: string} = JSON.parse(localStorage.getItem('userData'));
    return userData._username;
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthentificated = !!user;
    });

    this.notificationbService.getNoficationsBell().subscribe((nb: any) => {
      this.notifbell = nb;
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




