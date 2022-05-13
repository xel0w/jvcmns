import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.scss']
})
export class AjouterComponent implements OnInit {
  currentRate = 0;
  rate=0;
  public id:number|undefined;
  public token: string | null = localStorage.getItem('token');
  public formulaireArticle:any;
  public selectedFile:any;
  public selectedFileName:any;
  public formu:any;


  constructor(
    private formBuilder: FormBuilder,
    private client: HttpClient
    ){

    }
    fileChange(event: any) {
      this.selectedFile = event.target.files[0];
    }

  ngOnInit(): void {
    const token = this.token;
    if (token != null) {
    const utilisateur = JSON.parse(atob(token.split('.')[1]));
    this.id = utilisateur.usersId;
    }
    this.formulaireArticle = this.formBuilder.group(
      {
        titre: ['',Validators.required],
        genre: ['',Validators.required],
        editeur:['',Validators.required],
        note:[''],
        id: this.id,
        photo: []
      }
    )
}


  onSubmit(): void{
    
      console.log(this.formulaireArticle.value);
      const optionRequete = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
        })
      };
      this.client
      .post('http://php-jvcmns.test/article.php',this.formulaireArticle.value,optionRequete)
      .subscribe((resultat: any) => {console.log(resultat.ok)});

      const uploadData = new FormData();
      uploadData.append('myFile', this.selectedFile);
      console.log(this.selectedFile.name);
      

    this.client
      .post('http://php-jvcmns.test/ajoutImageJeux.php', uploadData, optionRequete)
      .subscribe()
      window.location.replace('/page-perso');
      
      
    }
    
  }



