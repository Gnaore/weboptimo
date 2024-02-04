import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-importation',
  templateUrl: './importation.component.html',
  styleUrls: ['./importation.component.scss']
})
export class ImportationComponent implements OnInit {

  tables: Table[] | undefined;
  selectedTable: Table | undefined;
  selectedColumns: Columns[] = [];
  data: any[] = [];

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
    this.tables = [
      { nom: 'Zones', code: 'ZN' },
      { nom: 'Sites', code: 'ST' },
      { nom: 'Localisations', code: 'LC' },
      { nom: 'Bordereaux', code: 'BD' },
      { nom: 'Biens', code: 'BN' }
    ]
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

        console.log(this.data);
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
