import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeComponent implements OnInit {
  public currentRate=0;
  public liste: any = [];
  public listeSearch: any;
  public formulaireRecherche = this.formBuilder.group(
    {
      recherche: ['', Validators.required]
    }
  )
  public formulaireTri = this.formBuilder.group(
    {
      triage: ['', Validators.required]
    }
  )

  public admin: boolean = false;

  public tri = [
    {value: 'jeuxTitre', viewValue: 'Titre'},
    {value: 'jeuxNote', viewValue: 'Notes'},
  ];
  
  constructor(
    private client: HttpClient,
    private formBuilder: FormBuilder )  {}
    public token = localStorage.getItem('token');


  ngOnInit(): void {
    const token = this.token
    if (token != null){
      const utilisateur = JSON.parse(atob(token.split('.')[1]));
      this.admin = utilisateur.admin == 1;
    }

    this.client.get("http://php-jvcmns.test/listeJeux.php")
    .subscribe(listeJeux =>{this.liste = listeJeux;console.log(this.liste)} ) 
    ;
       
  

  }
  onSubmit(): void{
    this.listeSearch = this.liste.filter((a: { jeuxTitre: any; })=>a.jeuxTitre.toLocaleLowerCase().includes(this.formulaireRecherche.value.recherche))
    
  }
  onSubmitTri(): void{
    console.log(this.formulaireTri.value.triage);
    
    if (this.formulaireTri.value.triage === "jeuxTitre"){
      this.listeSearch = this.liste.sort((a:any,b:any)=>(a.jeuxTitre > b.jeuxTitre) ? 1 : ((b.jeuxTitre > a.jeuxTitre) ? -1 : 0))
    }
    if(this.formulaireTri.value.triage === "jeuxNote"){      
      this.listeSearch = this.liste.sort((a: { jeuxNote: number; },b: { jeuxNote: number; })=>b.jeuxNote - a.jeuxNote)     
    }
    else{
      this.listeSearch = this.liste.sort((a:any,b:any)=>(a.jeuxTitre > b.jeuxTitre) ? 1 : ((b.jeuxTitre > a.jeuxTitre) ? -1 : 0)) 
    }
  }
  
}


