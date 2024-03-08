import { Component, OnInit, inject } from '@angular/core';
import { BienService } from 'src/app/services/bien.service';
import { BordereauService } from 'src/app/services/bordereau.service';
import { LocalisationService } from 'src/app/services/localisation.service';
import { SiteService } from 'src/app/services/site.service';
import { ZoneService } from 'src/app/services/zone.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-importation',
  templateUrl: './importation.component.html',
  styleUrls: ['./importation.component.scss']
})
export class ImportationComponent implements OnInit {

  zoneService = inject(ZoneService);
  siteService = inject(SiteService);
  localisationService = inject(LocalisationService);
  bordereauService = inject(BordereauService);
  bienService = inject(BienService);
  tables: Table[] | undefined;
  selectedTable: Table | undefined;
  selectedColumns: Columns[] = [];
  data: any[] = [];
  dataToSend: any[] = [];
  fields: string[] = [];
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
    if (sessionStorage.getItem('request_status') === '1') {
      this.Toast.fire({
        icon: "success",
        title: "Importation des données terminée avec succès."
      });
    }
    sessionStorage.removeItem('request_status');
    this.tables = [
      { nom: 'Zones', code: 'ZN' },
      { nom: 'Sites', code: 'ST' },
      { nom: 'Localisations', code: 'LC' },
      { nom: 'Bordereaux', code: 'BD' },
      { nom: 'Biens', code: 'BN' }
    ]
  }

  reset() {
    location.reload();
    this.data = [];
    this.selectedColumns = [];
    this.selectedTable = null;
  }

  submit() {
    this.chargement = true;
    switch (this.selectedTable.code) {
      case 'ZN':
        this.fields = ['code', 'libelle', 'message'];
        this.zoneService.create({ array: this.dataToSend }).subscribe(
          {
            next: response => {
              this.chargement = false;
              sessionStorage.setItem('request_status', "1");
              this.reset();
            },
            error: response => {
              this.chargement = false;
              this.fields.forEach(field => {
                if (response.error[field]) {
                  this.Toast.fire({
                    timer: 10000,
                    icon: "error",
                    title: response.error[field]
                  });
                }
              })
            }
          }
        );
        break;
      case 'ST':
        this.fields = ['code', 'libelle', 'zone_id', 'message'];
        this.siteService.create({ array: this.dataToSend }).subscribe(
          {
            next: response => {
              this.chargement = false;
              sessionStorage.setItem('request_status', "1");
              this.reset();
            },
            error: response => {
              this.chargement = false;
              this.fields.forEach(field => {
                if (response.error[field]) {
                  this.Toast.fire({
                    timer: 10000,
                    icon: "error",
                    title: response.error[field]
                  });
                }
              })
            }
          }
        )
        break;

      case 'LC':
        this.fields = ['code', 'libelle', 'site_id', 'message'];
        this.localisationService.create({ array: this.dataToSend }).subscribe(
          {
            next: response => {
              this.chargement = false;
              sessionStorage.setItem('request_status', "1");
              this.reset();
            },
            error: response => {
              this.chargement = false;
              this.fields.forEach(field => {
                if (response.error[field]) {
                  this.Toast.fire({
                    timer: 10000,
                    icon: "error",
                    title: response.error[field]
                  });
                }
              })
            }
          }
        )
        break;

      case 'BD':
        this.fields = ['code', 'libelle', 'site_id', 'message'];
        this.bordereauService.create({ array: this.dataToSend }).subscribe(
          {
            next: response => {
              this.chargement = false;
              sessionStorage.setItem('request_status', "1");
              this.reset();
            },
            error: response => {
              this.chargement = false;
              this.fields.forEach(field => {
                if (response.error[field]) {
                  this.Toast.fire({
                    timer: 10000,
                    icon: "error",
                    title: response.error[field]
                  });
                }
              })
            }
          }
        )
        break;

      case 'BN':
        this.fields = ['reference', 'code_inventaire_id', 'localisation_id', 'description', 'etat', 'service', 'message'];
        this.bienService.create({ array: this.dataToSend }).subscribe(
          {
            next: response => {
              this.chargement = false;
              sessionStorage.setItem('request_status', "1");
              this.reset();
            },
            error: response => {
              this.chargement = false;
              this.fields.forEach(field => {
                if (response.error[field]) {
                  this.Toast.fire({
                    timer: 10000,
                    icon: "error",
                    title: response.error[field]
                  });
                }
              })
            }
          }
        )
        break;

      default:
        this.data = [];
        break;
    }
  }

  showColumns() {
    this.data = [];
    if (this.selectedTable) {
      switch (this.selectedTable.code) {
        case 'ZN':
          this.selectedColumns = [
            { field: 'code', header: 'Code' },
            { field: 'zone', header: 'Zone' },
          ];
          break;

        case 'ST':
          this.selectedColumns = [
            { field: 'code', header: 'Code' },
            { field: 'site', header: 'Site' }
          ];
          break;

        case 'LC':
          this.selectedColumns = [
            { field: 'code', header: 'Code' },
            { field: 'localisation', header: 'Localisation' }
          ];
          break;

        case 'BD':
          this.selectedColumns = [
            { field: 'code', header: 'Code' },
            { field: 'bordereau', header: 'Libéllé' }
          ];
          break;

        case 'BN':
          this.selectedColumns = [
            { field: 'codeLocalisation', header: 'Code localisation' },
            { field: 'codeInventaire', header: 'Code inventaire' },
            { field: 'ref', header: 'Référence' },
            { field: 'description', header: 'Description' },
            { field: 'etat', header: 'Etat' },
            { field: 'service', header: 'Service' },
            { field: 'miseAuRebu', header: 'Mise au rebu' },
            { field: 'note', header: 'Note' },
            { field: 'estSupprime', header: 'Est supprimé' }
          ];
          break;

        default:
          this.selectedColumns = [];
          break;
      }
    } else {
      this.selectedColumns = [];
    }
  }

  onSelect(event: any) {
    this.data = [];
    if (this.selectedColumns.length === 0) {
      this.Toast.fire({
        icon: "error",
        title: "Sélectionnez un type de données avant de charger un fichier svp !"
      });
    } else {
      const file = event.currentFiles[0];
      var reader = new FileReader();
      reader.onload = (e) => {
        const binaryData = e.target.result;
        const workbook: XLSX.WorkBook = XLSX.read(binaryData, { type: 'binary' });

        // Choisissez la première feuille de calcul
        const firstSheetName = workbook.SheetNames[0];
        const worksheet: XLSX.WorkSheet = workbook.Sheets[firstSheetName];

        // Convertissez les données en un tableau JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        jsonData.forEach(data => {
          if (this.selectedTable) {
            switch (this.selectedTable.code) {
              case 'ZN':
                if (!data['N°Zone']) {
                  this.Toast.fire({
                    timer: 10000,
                    icon: "error",
                    title: "Les données du fichier sélectionné ne correspondent pas aux données attendues."
                  });
                } else {
                  this.data.push({
                    code: data['N°Zone'],
                    zone: data['Zones']
                  })
                  this.dataToSend.push({
                    code: data['N°Zone'].toString(),
                    libelle: data['Zones']
                  });
                }
                break;

              case 'ST':
                if (!data['N°Sites']) {
                  this.Toast.fire({
                    timer: 10000,
                    icon: "error",
                    title: "Les données du fichier sélectionné ne correspondent pas aux données attendues."
                  });
                } else {
                  this.data.push({
                    code: data['N°Sites'],
                    site: data['Sites']
                  })
                  this.dataToSend.push({
                    code: data['N°Sites'].toString(),
                    libelle: data['Sites'],
                    zone_id: data['N°Sites'].toString().substr(0, 2)
                  });
                }
                break;

              case 'LC':
                if (!data['Libelle Localisation']) {
                  this.Toast.fire({
                    timer: 10000,
                    icon: "error",
                    title: "Les données du fichier sélectionné ne correspondent pas aux données attendues."
                  });
                } else {
                  this.data.push({
                    code: data['Code Localisation'],
                    localisation: data['Libelle Localisation']
                  })
                  this.dataToSend.push({
                    code: data['Code Localisation'],
                    libelle: data['Libelle Localisation'],
                    site_id: data['Code Localisation'].toString().substr(0, 4)
                  });
                }
                break;

              case 'BD':
                if (!data['CODE']) {
                  this.Toast.fire({
                    timer: 10000,
                    icon: "error",
                    title: "Les données du fichier sélectionné ne correspondent pas aux données attendues."
                  });
                } else {
                  this.data.push({
                    code: data['CODE'],
                    bordereau: data['LIBELLE']
                  })
                  this.dataToSend.push({
                    code: data['CODE'],
                    libelle: data['LIBELLE'],
                    site_id: data['CODE'].toString().substr(0, 6)
                  });
                }
                break;

              case 'BN':
                if (!data['Code Inventaire']) {
                  this.Toast.fire({
                    timer: 10000,
                    icon: "error",
                    title: "Les données du fichier sélectionné ne correspondent pas aux données attendues."
                  });
                } else {
                  this.data.push({
                    codeLocalisation: data['Code Localisation'],
                    codeInventaire: data['Code Inventaire'],
                    ref: data['Référence'],
                    description: data['Description'],
                    etat: data['Etat'],
                    service: data['Service'],
                    miseAuRebu: data['Propose au rebu'],
                    note: data['Note'],
                    estSupprime: data['Sup']
                  });
                  this.dataToSend.push({
                    reference: data['Référence'],
                    code_inventaire_id: data['Code Inventaire'].toString(),
                    localisation_id: data['Code Localisation'].toString(),
                    description: data['Description'],
                    etat: data['Etat'],
                    service: data['Service']
                  });
                }
                break;

              default:
                this.data = [];
                break;
            }
          } else {
            this.data = [];
          }
        });
      };
      reader.readAsBinaryString(file);
    }
  }
}

interface Table {
  nom: string
  code: string
}

export interface Columns {
  header: string
  field: string
}
