import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deconnexion',
  templateUrl: './deconnexion.component.html',
  styleUrls: ['./deconnexion.component.scss']
})
export class DeconnexionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    setTimeout(()=>{window.location.replace("")},1000);
    localStorage.removeItem("token")
    
  }
}
