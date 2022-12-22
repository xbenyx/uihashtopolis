import { Component, OnInit } from '@angular/core';
import { faFile, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { TasksService } from '../../core/_services/tasks/tasks.sevice';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-new-supertasks',
  templateUrl: './new-supertasks.component.html'
})
export class NewSupertasksComponent implements OnInit {
  isLoading = false;
  faFile=faFile;
  faMagnifyingGlass=faMagnifyingGlass;

  constructor(
    private tasksService: TasksService
  ) { }

  private maxResults = environment.config.prodApiMaxResults

  ngOnInit(): void {

    let params = {'maxResults': this.maxResults }

    this.tasksService.getAlltasks(params).subscribe((tasks: any) => {
      var self = this;
      var response = tasks.values;
      ($("#Tasks") as any).selectize({
        maxItems: null,
        valueField: "taskId",
        placeholder: "Search task...",
        labelField: "taskName",
        searchField: ["taskName"],
        loadingClass: 'Loading..',
        highlight: true,
        onChange: function (value) {
            // self.OnChangeValue(value); // We need to overide DOM event, Angular vs Jquery
        },
        render: {
          option: function (item, escape) {
            return '<div  class="hashtype_selectize">' + escape(item.taskId) + ' -  ' + escape(item.taskName) + '</div>';
          },
        },
        onInitialize: function(){
          var selectize = this;
            selectize.addOption(response); // This is will add to option
            var selected_items = [];
            $.each(response, function( i, obj) {
                selected_items.push(obj.id);
            });
            selectize.setValue(selected_items); //this will set option values as default
          }
          });
        });
  }

}
