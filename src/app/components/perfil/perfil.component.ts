import { Component, OnInit } from '@angular/core';
import { RegistroService } from 'src/app/services/registro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private registroS: RegistroService, private router: Router) { }
  username: any = '';
  users: any;
  usuario: any;
  id: any;
  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.registroS.getUser().subscribe(res => {
      console.log(res);
      this.users = res;
      for (const user of res) {
        if (user.payload.doc.data().username === this.username) {
          this.id = user.payload.doc.id;
          console.log(this.id);
          this.usuario = user.payload.doc.data();
        }
      }
    });
  }

  actualizar(): any {
    this.registroS.updateUser(this.usuario, this.id);
    this.router.navigateByUrl('/Catalogo');
  }

  cancelar(): any {
    this.router.navigateByUrl('/Catalogo');
  }


}
