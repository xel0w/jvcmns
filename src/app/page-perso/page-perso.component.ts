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
  public id: any;
  public pseudo: any;
  public token:string|null =localStorage.getItem('token');
  public profilPicture: any;
  public formulaireEnvoi: any;
 
    
    constructor(
      private modalService: NgbModal,
      private formBuilder: FormBuilder,
      private client: HttpClient) { }
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }
      
      

  ngOnInit(): void {
    console.log();
    
    const token = this.token;
    if(token!=null){
      const utilisateur = JSON.parse(atob(token.split('.')[1]));
      this.pseudo = utilisateur.usersPseudo;
      this.id = utilisateur.usersId;
      this.profilPicture = utilisateur.usersProfilPicture;
      this.formulaireEnvoi= this.formBuilder.group(
        {
        id: this.id,
        namefile: this.pseudo + ".jpg",
        }
      )
    }
  }

  onSubmit(): void{


      const optionRequete = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*'
        })
      };
      
      this.client
      .post('http://localhost/php_jvcmns/image.php',this.formulaireEnvoi.value, optionRequete)

      console.log(this.formulaireEnvoi);
      
    }
  }
  
