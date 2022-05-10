import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss'],
})
export class ConnexionComponent implements OnInit {
  public formulaireConnexion = this.formBuilder.group({
    pseudo: ['', Validators.required],
    motDePasse: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder, private client: HttpClient) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      window.location.replace('');
    }
  }
  onSubmit(): void {
    if (this.formulaireConnexion.valid) {
      const optionRequete = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
        }),
      };

      this.client
        .post(
          'http://php-jvcmns.test/connexion.php',
          this.formulaireConnexion.value,
          optionRequete
        )
        .subscribe((resultat: any) => {
          localStorage.setItem('token', resultat.token);
        });
      if (localStorage.getItem('token')) {
        window.location.replace('/page-perso');
      } else {
        alert('Mauvais pseudo / Mot de passe');
      }
    }
  }
}
