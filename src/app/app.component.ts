import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public pseudo: any;
  public profilPicture: any;
  public token:any =localStorage.getItem('token');
  title = 'jvcmns';


  ngOnInit(): void {
  // const token = localStorage.getItem('token');
    const token = this.token;
    if(token!=null){
      const utilisateur = JSON.parse(atob(token.split('.')[1]));
      this.pseudo = utilisateur.usersPseudo[0].toUpperCase()+utilisateur.usersPseudo.slice(1);
      this.profilPicture = utilisateur.usersProfilPicture;
    }
  }
}
