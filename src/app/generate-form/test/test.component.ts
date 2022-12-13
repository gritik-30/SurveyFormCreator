import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor() { }

  testForm: any;

  ngOnInit(): void {
    this.testForm = JSON.parse(localStorage.getItem('testForm') || '');
    console.log(this.testForm);
  }

}
