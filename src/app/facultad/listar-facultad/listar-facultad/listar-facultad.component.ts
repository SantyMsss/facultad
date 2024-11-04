import {Component, OnInit} from '@angular/core';
import {Facultad} from "../model/facultad";
import {facultadeservice} from "../service/facultad.service";
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-listar-facultad',
  templateUrl: './listar-facultad.component.html',
  styleUrls: ['./listar-facultad.component.css']
})
export class ListarfacultadesComponent implements OnInit {
  public facultades: Array<Facultad> = [];
  public nombreFacultad!: string;
  public facultadeselected!: Facultad;
  public selected: boolean = false;

  constructor(private facultadeservice: facultadeservice, private routerPath: Router, private router: ActivatedRoute) {
    this.facultadeservice.getfacultades().subscribe(
      (facultades: Array<Facultad>) => {
        this.facultades = facultades;
      }
    );
  }


  /**
   * Metodo que se ejecuta al iniciar el componente
   */
  ngOnInit(): void {
    // this.facultades[0] = {id: 1, Facultad: 'Angular', programa: 'Ingenieria de sistemas'};
    // this.facultades[1] = {id: 2, Facultad: 'Java', programa: 'Ingenieria de sistemas'};
    // this.facultades[2] = {id: 3, Facultad: 'Python', programa: 'Ingenieria de sistemas'};
    // this.facultades[3] = {id: 4, Facultad: 'C#', programa: 'Ingenieria de sistemas'};
    // this.facultades[4] = {id: 5, Facultad: 'C++', programa: 'Ingenieria de sistemas'};
  }

  /**
   * Evento que se dispara al seleccionar un Facultad en la lista
   * @param Facultad Facultad seleccionado
   */
  onSelected(Facultad: Facultad) {
    this.facultadeselected = Facultad;
    this.selected=true;
    // console.log(this.facultadeselected); //Imprime en la consola del navegador el Facultad seleccionado
    this.routerPath.navigate(['/editar/' + this.facultadeselected.id]); //Redirecciona a la ruta /editar/:id
  }

  /**
   * Metodo que elimina un Facultad seleccionado de la lista
   * @param Facultad Facultad a eliminar
   */
  borrarFacultad(Facultad: Facultad) {
    Swal.fire({
      title: "Esta seguro?",
      text: "Usted no puede revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borra el Facultad!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.facultadeservice.borrarFacultad(Facultad.id).subscribe(() => { // Llama al servicio para eliminar el Facultad
          Swal.fire({
            title: "Eliminado!",
            text: "la facultad ha sido eliminada.",
            icon: "success"
          });
          this.facultades = this.facultades.filter((c) => c !== Facultad); // Actualiza la lista de facultades en la vista
        });
      }
    });
  }

  /**
   * Metodo que redirecciona a la ruta /crear
   */
  crearFacultad() {
    this.routerPath.navigate(['/crear']);
  }
}
