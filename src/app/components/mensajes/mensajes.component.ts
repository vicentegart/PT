import { Component, OnInit } from '@angular/core';
import { MensajeService } from 'src/app/shared/services/mensaje.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.scss']
})
export class MensajesComponent implements OnInit {

  constructor(public servicioMensaje: MensajeService) { }

  ngOnInit(): void {
  }

}
