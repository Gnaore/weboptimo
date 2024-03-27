import { Component, inject } from '@angular/core';
import { ILocalisation } from 'src/app/interfaces/localisation';
import { ISite } from 'src/app/interfaces/site';
import { IZone } from 'src/app/interfaces/zone';
import { LocalisationService } from 'src/app/services/localisation.service';
import { SiteService } from 'src/app/services/site.service';
import { ZoneService } from 'src/app/services/zone.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-qr-localisation',
  templateUrl: './qr-localisation.component.html',
  styleUrls: ['./qr-localisation.component.scss']
})
export class QrLocalisationComponent {
  selectedZone: IZone;
  selectedSite: ISite;
  zones: IZone[] = [];
  sites: ISite[] = [];
  zoneSites: ISite[] = [];
  localisations: ILocalisation[] = [];
  localisationsFiltres: ILocalisation[] = [];
  zoneService = inject(ZoneService);
  siteService = inject(SiteService);
  localisationService = inject(LocalisationService);

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
    this.listeZone();
    this.listeSite();
    this.listeLocalisation();
  }

  sitesByZone() {
    this.localisationsFiltres = [];
    this.zoneSites = this.sites.filter(site => site.zone_id === this.selectedZone.id);
  }

  getLocalisations() {
    this.localisationsFiltres = [];
    this.localisationsFiltres = this.localisations.filter(localisation => localisation.site_id === this.selectedSite.id);
  }

  listeLocalisation() {
    this.localisationService.read().subscribe(
      {
        next: response => {
          this.localisations = response;
        },
        error: response => {
          this.Toast.fire({
            timer: 10000,
            icon: "error",
            title: response.error.message
          });
        }
      }
    )
  }

  listeZone() {
    this.zoneService.read().subscribe(
      {
        next: response => {
          this.zones = response;
        },
        error: response => {
          if (response.error['message']) {
            this.Toast.fire({
              timer: 10000,
              icon: "error",
              title: response.error['message']
            });
          }
        }
      }
    )
  }

  listeSite() {
    this.siteService.read().subscribe(
      {
        next: response => {
          this.sites = response;
        },
        error: response => {
          if (response.error['message']) {
            this.Toast.fire({
              timer: 10000,
              icon: "error",
              title: response.error['message']
            });
          }
        }
      }
    )
  }
}
