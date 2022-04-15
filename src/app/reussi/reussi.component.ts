import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reussi',
  templateUrl: './reussi.component.html',
  styleUrls: ['./reussi.component.scss']
})
export class ReussiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    setTimeout(()=>{window.location.replace("/connexion")},1000);
  }

}
