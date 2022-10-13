import { Component, OnInit } from '@angular/core';
import { FilesService } from '../../service/files/files.service';
import { ActivatedRoute, Params } from '@angular/router';
import { faFileArchive, faFileContract, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { Configuration } from '../../shared/defines/files';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-wordlist-edit',
  templateUrl: './wordlist-edit.component.html',
  styleUrls: ['../files.component.scss']
})
export class WordlistEditComponent implements OnInit {
  faFileArchive=faFileArchive;
  faFileContract=faFileContract;
  faPeopleGroup=faPeopleGroup;

  public word = Configuration.WORDLIST;
  public rule = Configuration.RULE;
  public other = Configuration.OTHER;

  constructor(private route:ActivatedRoute, private filesService: FilesService) { }

  allowEdit = false;

  file: any[];

  ngOnInit(): void {

    this.route.queryParams
    .subscribe(
      (queryParams: Params) => {
        this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
      }
    )

    const id = +this.route.snapshot.params['id'];
    this.filesService.getFileu(id).subscribe((file: any) => {
      this.file = file;
      console.log(this.file);
    });

  }

  onUpdateFile(): void{
    Swal.fire({
      title: 'WARNING',
      text: 'Its not recommended to rename a file during running a task where this file is used. This can cause miscommunication with the client. ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Continue!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Updated!',
          'All good ;)',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Operation Cancelled',
          'No worries, your data is safe :)',
          'error'
        )
      }
    })
  }

}
