import { Component, inject } from '@angular/core';
import { IAcquisition } from 'src/app/interfaces/acquisition';
import { AcquisitionService } from 'src/app/services/acquisition.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-acquisition',
  templateUrl: './liste-acquisition.component.html',
  styleUrls: ['./liste-acquisition.component.scss']
})
export class ListeAcquisitionComponent {
  visible: boolean = false;
  acquisitionService = inject(AcquisitionService);
  acquisitions: IAcquisition[] = [];
  chargement: boolean = false;

  Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  ngOnInit(): void {
    this.listeAcquisition();
  }

  listeAcquisition() {
    this.chargement = true;
    this.acquisitionService.read().subscribe(
      {
        next: response => {
          this.chargement = false;
          this.acquisitions = response;
        },
        error: response => {
          this.chargement = false;
          this.Toast.fire({
            timer: 10000,
            icon: "error",
            title: response.message
          });
        }
      }
    )
  }

  obtenirBiens(acquisitionId: number) {
    
  }
}
