import { Component, OnInit } from '@angular/core';
import { Validators,FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-reglages',
  templateUrl: './reglages.component.html',
  styleUrls: ['./reglages.component.scss']
})
export class ReglagesComponent implements OnInit {

  public token:any=localStorage.getItem('token');
  public pseudo:any;
  public id:any;
  public email:any;


  public formulairePseudo :any;
  public formulaireMdp :any;
  public formulaireMail :any;


  constructor(
    private formBuilder: FormBuilder,
    private client: HttpClient
  ) { }

  ngOnInit(): void {
    const token = this.token;
    if(token!=null){
      const utilisateur = JSON.parse(atob(token.split('.')[1]));
      this.pseudo = utilisateur.usersPseudo[0].toUpperCase()+utilisateur.usersPseudo.slice(1);
      this.id = utilisateur.usersId;
      this.email = utilisateur.usersMail;
      this.formulairePseudo = this.formBuilder.group(
        {
          pseudo: ['', Validators.required],
          id: this.id
        }
      );
      this.formulaireMdp = this.formBuilder.group(
        {
          mdp: ['', Validators.required],
          id: this.id
        }
      );
      this.formulaireMail = this.formBuilder.group(
        {
          mail: ['', Validators.required],
          pseudo: this.pseudo,
          id: this.id
        }
      )
    }
  }

  onSubmitPseudo(): void{
    if(this.formulairePseudo.valid){
      
      const optionRequete = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*'
        })
      };
      
      this.client
      .post('http://php-jvcmns.test/changePseudo.php',this.formulairePseudo.value, optionRequete)
      .subscribe((resultat :any)=> {

          localStorage.setItem('token', resultat.token);
          window.location.replace("/page-perso");
          
        
      })
    }
  }

  onSubmitMdp(): void{
    if(this.formulaireMdp.valid){
      
      const optionRequete = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*'
        })
      };
      
      this.client
      .post('http://php-jvcmns.test/changeMdp.php',this.formulaireMdp.value, optionRequete)
      .subscribe(()=>{
        localStorage.removeItem('token');

        window.location.replace("/connexion");
      });


      
    }
  }

  onSubmitMail(): void{
    if(this.formulaireMail.valid){
      
      const optionRequete = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*'
        })
      };
      
      this.client
      .post('http://php-jvcmns.test/changeMail.php',this.formulaireMail.value, optionRequete)
      .subscribe((resultat :any)=> {

          localStorage.setItem('token', resultat.token);
          window.location.replace("/page-perso");
          
        
      })
    }
  }
}
