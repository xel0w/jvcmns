import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  public liste: any = [];

  constructor(
    private client: HttpClient,
  ) { }

  ngOnInit(): void {
    this.client.get("http://php-jvcmns.test/lastAjout.php")
    .subscribe(listeJeux =>{this.liste = listeJeux;console.log(this.liste)} ) 
    ;
  }

}
