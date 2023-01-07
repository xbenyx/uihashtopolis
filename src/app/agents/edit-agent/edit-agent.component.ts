import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faAlignJustify, faIdBadge, faComputer, faKey } from '@fortawesome/free-solid-svg-icons';
import { faLinux, faWindows, faApple } from '@fortawesome/free-brands-svg-icons';

import { AgentsService } from '../../core/_services/agents/agents.service';
import { UsersService } from '../../core/_services/users/users.service';

@Component({
  selector: 'app-edit-agent',
  templateUrl: './edit-agent.component.html'
})
export class EditAgentComponent implements OnInit {
  isLoading = false;
  faAlignJustify=faAlignJustify;
  faIdBadge=faIdBadge;
  faComputer=faComputer;
  faKey=faKey;
  faLinux=faLinux;
  faWindows=faWindows;
  faApple=faApple;

  constructor(
    private route:ActivatedRoute,
    private agentsService: AgentsService,
    private usersService: UsersService
  ) { }

  updateForm: FormGroup
  showagent: any = [];
  users: any = [];

  ngOnInit(): void {

    this.updateForm = new FormGroup({
      'agentId': new FormControl(''),
      'isActive': new FormControl(''),
      'userId': new FormControl(''),
      'agentName': new FormControl(''),
      'uid': new FormControl(''),
      'token': new FormControl(''),
      'cpuOnly': new FormControl(),
      'cmdPars': new FormControl(''),
      'ignoreErrors': new FormControl(''),
      'isTrusted': new FormControl(''),
      'assignment': new FormControl(''),
    });

    this.isLoading = true;

    const id = +this.route.snapshot.params['id'];
    this.agentsService.getAgent(id).subscribe((agent: any) => {
      this.showagent = agent;
      this.isLoading = false;
      console.log(this.showagent);
    });

    this.usersService.getAllusers().subscribe((user: any) => {
      this.users = user.values;
    });

  }

  onSubmit(){

  }

}
