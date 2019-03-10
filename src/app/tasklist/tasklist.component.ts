import { Component, OnInit } from '@angular/core';
import { Task } from './../models/task'
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {

  tasks: Task[];
  currentTask: Task;
  editMode: boolean;

  constructor(private _messageService: MessageService) {}

  ngOnInit() {
    this.tasks = [];

    let task1 = new Task();
    task1.id = 1;
    task1.title = "Clean up my room.";
    task1.detail = "Mom can't hold anymore that mess on my room.";
    task1.done_at = new Date();
    
    let task2 = new Task();
    task2.id = 2;
    task2.title = "Study for python test.";
    task2.detail = "Study module 1 and 2, and listen to the alura class.";

    let task3 = new Task();
    task3.id = 3;
    task3.title = "Wash the dishes.";
    task3.detail = "The dinner last night was insane.";

    this.tasks.push(task1);
    this.tasks.push(task2);
    this.tasks.push(task3);

    console.log(this.tasks);
  }

  newTask() {

  }

  delTask() {

  }

  editTask() {
    this.editMode = !this.editMode;
  }

  details(task: Task) {
    this.currentTask = task;

    this._messageService.clear();
    this._messageService.add({ key: 'details', sticky: true, severity: 'info', closable: false });
  }

  cancelMessage() {
    this._messageService.clear('details');
    this.editMode = false;
  }
}