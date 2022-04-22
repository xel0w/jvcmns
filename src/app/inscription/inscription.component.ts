import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  public formulaireInscription = this.formBuilder.group(
    {
      pseudo: ['',Validators.required],
      motDePasse: ['',Validators.required],
      mail: ['',Validators.required],
    }
  )


  constructor(
    private formBuilder: FormBuilder,
    private client: HttpClient)
    {

    }


  ngOnInit(): void {
    if(localStorage.getItem('token')){
      window.location.replace("");
    }
  }
  onSubmit(): void{
    console.log(this.formulaireInscription);
    
    if(this.formulaireInscription.valid){


      const optionRequete = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*'
        })
      };
      
      this.client
      .post('http://php-jvcmns.test/inscription.php',this.formulaireInscription.value, optionRequete)
      .subscribe((resultat :any)=> {
        if(resultat.erreur){
          alert(resultat.erreur)
        }else{
          console.log(resultat.ok);
          
          window.location.replace("/reussi");
          console.log(this.formulaireInscription.value);
        }
        
    })
  }  
}
}