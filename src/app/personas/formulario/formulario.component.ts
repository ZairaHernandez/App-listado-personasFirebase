import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from '../../persona.model';
import { PersonasService } from '../../personas.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent {
  //@Output() personaCreada = new EventEmitter<Persona>();

  //nombreInput: string = "";
  //apellidoInput: string = "";

  nombre: string;
  apellido: string;
  index: number;
  modoEdicion: number;

  constructor(
    private personaService: PersonasService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.personaService.saludar.subscribe((indice: number) =>
      alert('El indice es: ' + indice)
    );
  }

  ngOnInit() {
    this.index = this.route.snapshot.params['id'];
    this.modoEdicion = +this.route.snapshot.queryParams['modoEdicion'];

    if (this.modoEdicion != null && this.modoEdicion === 1) {
      let persona: Persona = this.personaService.encontrarPersona(this.index);
      this.nombre = persona.nombre;
      this.apellido = persona.apellido;
    }
  }

  //nombre:HTMLInputElement, apellido:HTMLInputElement
  onGuardarPersona() {
    let persona1 = new Persona(this.nombre, this.apellido);

    //this.logginService.enviarMensajeAConsola("Enviamos persona: " + persona1.nombre + " " + persona1.apellido);

    //this.personaCreada.emit(persona1);
    //this.personas.push(persona1);

    if (this.modoEdicion != null && this.modoEdicion === 1) {
      this.personaService.modificarPersona(this.index, persona1);
    } else {
      this.personaService.personaAgregada(persona1);
    }

    this.router.navigate(['personas']);
  }
  eliminarPersona() {
    if (this.index != null) {
      this.personaService.eliminarPersona(this.index);
    }
    this.router.navigate(['personas']);
  }
}
