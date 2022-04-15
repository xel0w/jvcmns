import { HttpClient } from '@angular/common/http';
import { literal } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.scss']
})
export class AjouterComponent implements OnInit {
  currentRate = 0;

  formulaireArticle = this.formBuilder.group(
    {
      titre: ['',[Validators.required,Validators.minLength(5)]],
      genre: ['',[Validators.required,Validators.minLength(2)]],
      texte: ['',Validators.required],
      description:['',Validators.required],
    }
  )

  // formulaireArticle = new FormGroup(
  //   {
  //     titre : new FormControl('Hello', [Validators.required, Validators.minLength(5)]),
  //     texte : new FormControl('', [Validators.required])
  //   }
  // );

  constructor(
    private formBuilder: FormBuilder,
    private client: HttpClient
    ){

    }

  //titre ='paul le bg';
  texte='';


  ngOnInit(): void {
  }

  onSubmit(): void{
    if(this.formulaireArticle.valid){


      

      this.client
      .post('http://localhost/test_json/article.php',this.formulaireArticle.value)
      .subscribe(resultat => console.log(resultat));

    }
  }


}

