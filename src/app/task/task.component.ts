import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {TaskService} from '../service/task.service';
import {ITaskResponse, ITaskRequest} from '../model/task.interface';
import { FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks:ITaskResponse[];
  createForm: FormGroup;
  toUpdate:number = 0;

  constructor(private modalService: NgbModal, private taskService:TaskService) { 
    this.loadData();
  }

  ngOnInit(): void {

    this.createForm = new FormGroup({
      description: new FormControl(),
      creationDate: new FormControl('')
    });
  }

  openLg(content) {
    this.toUpdate = 0;
    this.createForm.reset();
    this.modalService.open(content, { size: 'lg' });
  }

  save(form:ITaskRequest){
    if(this.createForm.invalid)
    {
      alert("Complete the Form!")
    }
    else if(this.toUpdate>0){
        this.taskService.update(form,this.toUpdate).subscribe(()=>{
          this.loadData();
          this.modalService.dismissAll();
        });
      }
      else{
        this.taskService.create(form).subscribe(()=>{
          this.loadData();
          this.modalService.dismissAll();
        });
      }
  }

  findById(content, id:number){
    this.toUpdate = id;
    this.taskService.findById(id).subscribe(response=>{
      this.createForm.controls['description'].setValue(response.data.description);
      this.createForm.controls['creationDate'].setValue(response.data.creationDate);
    });

    this.modalService.open(content, { size: 'lg' });
  }

  delete(id:number){
    if(confirm("Are you sure to delete")) {
      this.taskService.delete(id).subscribe(response=>{
        this.loadData();
      });
    }
  }

  loadData(){
    this.taskService.getTasks().subscribe(
      response => this.tasks = response.data
    );
  }

}
