import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  url: string = '/assets/git-version.json';
  footerConfig = environment.config.footer;
  year = (new Date()).getFullYear();
  gitInfo:any;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get(this.url).subscribe(res => {
      this.gitInfo = res;
    });
  }

}
