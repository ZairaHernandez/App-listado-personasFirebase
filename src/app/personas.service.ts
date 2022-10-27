
import { Persona } from './persona.model';
import { Injectable,EventEmitter } from '@angular/core';
import { DataServices } from './data.services';

@Injectable() 
export class PersonasService {
  personas: Persona[] = [
    ];
    
    saludar = new EventEmitter<number>();

  constructor(
    private dataServices: DataServices
  ) { }

  setPersonas(personas: Persona[]) {
    this.personas = personas;
  }

  obtenerPersonas() {
    return this.dataServices.cargarPersonas();
  }

  personaAgregada(persona: Persona) {
    /*
    this.logingService.enviarMensajeAConsola(
      'Agregamos persona: ' + persona.nombre + ' ' + persona.apellido
    );*/
    if (this.personas == null) {
      this.personas = [];
    }
    this.personas.push(persona);
    this.dataServices.guardarPersonas(this.personas);
  }
  encontrarPersona(index: number) {
    return this.personas[index];
  }

  modificarPersona(index: number, personaModificar: Persona) {
    let personaGuardada = this.personas[index];
    personaGuardada.nombre = personaModificar.nombre;
    personaGuardada.apellido = personaModificar.apellido;
    this.dataServices.modificarPersona(index, personaModificar);
  }

  eliminarPersona(index: number) {
    this.personas.splice(index, 1);
    this.dataServices.eliminarPersona(index);
    //Se vuelve a guardar el arreglo para regenerar indices
    this.modificarPersonas();
  }

  modificarPersonas() {
    if (this.personas != null) {
      this.dataServices.guardarPersonas(this.personas);
    }
  }
}
