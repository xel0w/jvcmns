import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, VERSION } from '@angular/core';
import { Validators,FormBuilder, NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeComponent implements OnInit {
  pages: number = 1;
  public currentRate=0;
  public id :any;
  public admin: any;
  public formulaireNote:any;
  public currentJeux="";
  public liste: any = [];
  public listeSearch: any ;
  public formulaireDelete:any;
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

  public tri = [
    {value: 'jeuxTitre', viewValue: 'Titre'},
    {value: 'jeuxNote', viewValue: 'Notes'},
  ];
  
  constructor(
    private client: HttpClient,
    private modalService: NgbModal,
    private formBuilder: FormBuilder )  {}
    public token = localStorage.getItem('token');


  ngOnInit(): void {
    const token = this.token
    if (token != null){
      const utilisateur = JSON.parse(atob(token.split('.')[1]));
      this.admin = utilisateur.usersAdmin;
      this.id = utilisateur.usersId;
    }
    
    this.client.get("http://php-jvcmns.test/listeJeux.php")
    .subscribe(listeJeux =>{this.liste = listeJeux;console.log(this.liste)} ) 
    ;
       


  }
  onDelete(j: NgForm): void{
    this.formulaireDelete={
      jeuxId: j.value.currentJeux
    }
    const optionRequete = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    };
    console.log(this.formulaireDelete);
    this.client
    .post('http://php-jvcmns.test/deleteJeux.php',this.formulaireDelete, optionRequete)
    .subscribe()
    window.location.replace('/liste');


  }
  onSubmit(): void{
    this.listeSearch = this.liste.filter((a: { jeuxTitre: any; })=>a.jeuxTitre.toLocaleLowerCase().includes(this.formulaireRecherche.value.recherche))
  }
  
  onSubmitNote(f: NgForm): void{
    console.log(this.currentRate);
    console.log(f.value);
    this.formulaireNote={
      note: this.currentRate,
      jeuxId: f.value.currentJeux,
      id: this.id

    }
    const optionRequete = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    };
    console.log(this.formulaireNote);
    this.client
    .post('http://php-jvcmns.test/ajoutNote.php',this.formulaireNote, optionRequete)
    .subscribe((resultat:any)=>{
      if(resultat.erreur){
        alert(resultat.erreur)
      }
      console.log(resultat.status)
      window.location.replace('/liste');
        
      
    })
    
    
  }
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
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


