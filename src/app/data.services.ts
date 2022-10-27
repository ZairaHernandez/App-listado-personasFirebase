import {HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { LoginService } from './login/login.services';
import { Persona } from './persona.model';


@Injectable()
export class DataServices{
  constructor(private httpClient: HttpClient,
    private loginServices: LoginService
  ) { }

  cargarPersonas() {
    const token = this.loginServices.getIdToken();
        return this.httpClient.get(
          'https://listado-personas-75bc8-default-rtdb.firebaseio.com/datos.json?auth=' + token
        );
    }
    
    //Guardar personas
  guardarPersonas(personas: Persona[]) {
      const token = this.loginServices.getIdToken();
        this.httpClient.put(
          'https://listado-personas-75bc8-default-rtdb.firebaseio.com/datos.json?auth='+token, personas
        ).subscribe(
            response => console.log("Resultado de guardar las Personas: " + response),
            error => console.log("Error al guardar Personas: " + error)
        );
    }

  modificarPersona(index: number, persona: Persona) {
      const token = this.loginServices.getIdToken();
        let url: string;
        url =
            'https://listado-personas-75bc8-default-rtdb.firebaseio.com/datos/' + index +'.json?auth=' + token;
        this.httpClient.put(url, persona).subscribe(
            response => console.log("Resultado Modificar Persona: " + response)
            ,
            error => console.log("Error modificar Persona: " + error)
        );
            
    }

  eliminarPersona(index: number) {
      const token = this.loginServices.getIdToken();
        let url: string;
        url =
          'https://listado-personas-75bc8-default-rtdb.firebaseio.com/datos/' +
          index +
          '.json?auth=' + token;
        this.httpClient.delete(url).subscribe(
          (response) => console.log('Resultado Eliminar Persona: ' + response),
          (error) => console.log('Error eliminar Persona: ' + error)
        );
    }
}