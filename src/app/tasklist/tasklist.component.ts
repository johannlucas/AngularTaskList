import { Component, OnInit } from '@angular/core';
import { Task } from './../models/task'
import { MessageService } from 'primeng/api';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {

  tasks: Task[];
  currentTask: Task;
  editMode: boolean;

  constructor(private _messageService: MessageService,
    private _taskService: TaskService) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    //Get list of tasks
    this._taskService.getTasks().subscribe((data: Task[]) => {
      this.tasks = data;
    });
  }

  newTask() {
    this.editMode = true;
    this.currentTask = new Task();

    this._messageService.clear();
    this._messageService.add({ key: 'details', sticky: true, severity: 'success', closable: false });
  }

  saveTask() {
    if (this.editMode && this.validateTask(this.currentTask)) {
      if (this.currentTask.id > 0)
        this._taskService.updateTask(this.currentTask).subscribe((data: any) => {
          this.loadTasks();
          this.showSuccess();
        });
      else
        this._taskService.insertTask(this.currentTask).subscribe((data: any) => {
          this.loadTasks();
          this.showSuccess();
        });
    }

    this._messageService.clear('details');
    this.editMode = false;
  }

  updateDoneAt(task: Task, event) {
    if (!this.validateTask(task))
      return;

    task.done_At = event.target.checked ? new Date() : null;
    this._taskService.updateTask(task).subscribe((data: any) => {
      this.loadTasks();
      this.showSuccess();
    });
  }

  delTask(task: Task) {
    this._taskService.deleteTask(task).subscribe((data: any) => {
      this.loadTasks();
      this.showSuccess();
    });
  }

  editTask() {
    this.editMode = !this.editMode;
  }

  details(task: Task) {
    this.currentTask = task;

    this._messageService.clear();
    this._messageService.add({ key: 'details', sticky: true, severity: 'info', closable: false });
  }

  showSuccess() {
    this._messageService.add({ severity: 'success', summary: 'Success!', life: 2000 });
  }

  showError(message: string) {
    this._messageService.add({ severity: 'error', summary: 'Validation Failed!', detail: message });
  }

  validateTask(task: Task) {
    if (task.title.length > 50) {
      this.showError('Title was too long, only 50 caracters is accepted.');
      return false;
    }
    if (task.detail.length > 250) {
      this.showError('Detail was too long, only 250 caracters is accepted.');
      return false;
    }

    return true;
  }
}