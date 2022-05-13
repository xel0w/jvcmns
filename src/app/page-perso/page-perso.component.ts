import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-page-perso',
  templateUrl: './page-perso.component.html',
  styleUrls: ['./page-perso.component.scss'],
})
export class PagePersoComponent implements OnInit {
  closeResult = '';

  public id: any;
  public pseudo: any;
  public token: string | null = localStorage.getItem('token');
  public profilPicture: any;
  public selectedFile: any;
  public formulaireEnvoi: any;
  public formulaireEnvoiPerso: any;
  pages: number = 1;
  public currentRate=0;
  public liste: any = [];

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private client: HttpClient,
    private http: HttpClient
  ) {}

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  fileChange(event: any) {
    this.selectedFile = event.target.files[0];

  }
  uploadFile() {
    const optionRequete = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      }),
    };
    const uploadData = new FormData();
    uploadData.append('myFile', this.selectedFile, this.selectedFile.name);

    this.http
      .post('http://php-jvcmns.test/ajoutProfil.php', uploadData, optionRequete)
      .subscribe((res:any) =>{
        console.log(res.erreur);

      })


      this.formulaireEnvoi = 
        {
          id: this.id,
          namefile: this.selectedFile.name,
        }
      ;
  
      console.log(this.formulaireEnvoi);
      
      this.client
        .post(
          'http://php-jvcmns.test/image.php',
          this.formulaireEnvoi,
          optionRequete
        )
        .subscribe((resultat: any) => {
            this.profilPicture = resultat.profilPicture;
            localStorage.setItem('token', resultat.token);
            window.location.replace('/page-perso');

          });
  }

  ngOnInit(): void {
    const token = this.token;
    if (token != null) {
      const utilisateur = JSON.parse(atob(token.split('.')[1]));
      this.pseudo =
        utilisateur.usersPseudo[0].toUpperCase() +
        utilisateur.usersPseudo.slice(1);
      this.id = utilisateur.usersId;
      this.profilPicture = utilisateur.usersProfilPicture;
    }else{
      window.location.replace('/connexion')
    }

    
    const optionRequete = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      }),
    };
    this.formulaireEnvoi = 
        {
          id: this.id,
        }
      ;
    this.client.post("http://php-jvcmns.test/listeJeuxPerso.php",this.formulaireEnvoi,optionRequete)
    .subscribe(listeJeux =>{this.liste = listeJeux;console.log(this.liste)} ) 
    ;
  }
  
  
}
