import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-page-perso',
  templateUrl: './page-perso.component.html',
  styleUrls: ['./page-perso.component.scss']
})
export class PagePersoComponent implements OnInit {
  closeResult = '';    
  public id: number | undefined;
  public pseudo: any;
  public token:string|null =localStorage.getItem('token');
  public profilPicture: any;
  public formulaireEnvoi: any;
  public selectedFile: any;
 
    
    constructor(
      private modalService: NgbModal,
      private formBuilder: FormBuilder,
      private client: HttpClient,
      private http: HttpClient) { }
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }
      
      

  ngOnInit(): void {
    
    
    const token = this.token;
    if(token!=null){
      const utilisateur = JSON.parse(atob(token.split('.')[1]));
      this.pseudo = utilisateur.usersPseudo[0].toUpperCase()+utilisateur.usersPseudo.slice(1);
      this.id = utilisateur.usersId;
      this.profilPicture = utilisateur.usersProfilPicture;
      this.formulaireEnvoi= this.formBuilder.group(
        {
        id: utilisateur.usersId,
        namefile: utilisateur.usersPseudo
        }
      )
    }
    console.log(this.formulaireEnvoi);
  }
  onSelectedFile(event:any){
      this.selectedFile = <File>event.target.files[0];
    
  }

  onSubmit(): void{

    
      const optionRequete = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*'
        })
      };


      this.client
      .post('http://php-jvcmns.test/uploads',this.selectedFile , optionRequete)
      .subscribe(res =>{
        console.log(res);
        
      })


      this.client
      .post('http://php-jvcmns.test/image.php',this.formulaireEnvoi.value, optionRequete)
      .subscribe((resultat :any)=> {
        if(resultat.erreur){
          alert(resultat.erreur)
        }else{
          console.log(resultat.ok);
          this.profilPicture = resultat.profilPicture;
          localStorage.setItem('token', resultat.token);
          
        }

    })
  }}
  
