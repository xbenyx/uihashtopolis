import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  title = 'Hastopolis';
  username: string = 'Admin';

  getUsername(){
      return this.username;
  }

}
