import { Component, OnInit, Renderer2, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss']
})
export class AdminMainComponent implements OnInit {
  router = inject(Router);
  activeTabIndex: number;

  sidebarActive: boolean;

  topbarMenuActive: boolean;

  sidebarClick: boolean;

  topbarItemClick: boolean;

  activeTopbarItem: any;

  documentClickListener: any;

  configActive: boolean;

  configClick: boolean;

  items: MenuItem[] | undefined;
  showModalClient: boolean = false;
  showModalFournisseur: boolean = false;
  showModalBonCom: boolean = false;
  showModalFamille: boolean = false;
  showModalNatBien: boolean = false;
  showModalParam: boolean = false;
  showModalMdp: boolean = false;
  showModalBiensOrp: boolean = false;
  showModalBien: boolean = false;
  showModalZone: boolean = false;
  showModalLocalisation: boolean = false;
  showModalBordereau: boolean = false;
  showModalSite: boolean = false;
  showModalGroup: boolean = false;
  showModalUser: boolean = false;

  constructor(public renderer: Renderer2, private primengConfig: PrimeNGConfig,
    public app: AppComponent) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Menu',
        icon: 'pi pi-fw pi-ellipsis-v',
        items: [
          {
            label: 'Paramètres',
            icon: 'pi pi-fw pi-cog',
            command: () => {
              this.showModalParam = true;
            }
          },
          {
            label: 'Gestion des accès',
            icon: 'pi pi-fw pi-lock',
            items: [
              {
                label: 'Utilisateurs',
                icon: 'pi pi-fw pi-user',
                command: () => {
                  this.showModalUser = true;
                }
              },
              {
                label: 'Groupes',
                icon: 'pi pi-fw pi-users',
                command: () => {
                  this.showModalGroup = true;
                }
              },
              {
                label: 'Changer le mot de passe',
                icon: 'pi pi-fw pi-key',
                command: () => {
                  this.showModalMdp = true;
                }
              }
            ]
          },
          {
            label: 'Importation',
            icon: 'pi pi-fw pi-upload',
            command: () => {
              this.router.navigate(['/admin/importation']);
            }
          },
          {
            label: 'Dossiers impressions',
            icon: 'pi pi-fw pi-print',
            command: () => {
              this.router.navigate(['/admin/dossier-impression']);
            }
          },
          {
            separator: true
          },
          {
            label: 'Quitter',
            icon: 'pi pi-fw pi-times'
          }
        ]
      },
      {
        label: 'Module acquisition',
        items: [
          {
            label: 'Client',
            command: () => {
              this.showModalClient = true;
            }
          },
          {
            label: 'Fournisseur',
            command: () => {
              this.showModalFournisseur = true;
            }
          },
          {
            label: 'Bon de commande',
            command: () => {
              this.showModalBonCom = true;
            }
          },
          {
            label: 'Famille',
            command: () => {
              this.showModalFamille = true;
            }
          },
          {
            label: 'Nature du bien',
            command: () => {
              this.showModalNatBien = true;
            }
          },
          {
            label: 'Gestion des acquisitions',
            command: () => {
              // this.showModalFournisseur = true;
            }
          },
          {
            label: 'Liste des acquisitions en attente de code inventaire',
            command: () => {
              this.router.navigate(['/admin/liste-acquisition']);
            }
          }
        ]
      },
      {
        label: 'Module inventaire',
        items: [
          {
            label: 'Gestion des emplacements',
            icon: 'pi pi-fw pi-building',
            command: () => {
              this.router.navigate(['/admin/emplacements']);
            }
          },
          {
            label: 'QRCode',
            icon: 'pi pi-fw pi-qrcode',
            items: [
              {
                label: 'Bordereaux',
                icon: 'pi pi-fw pi-folder',
                command: () => {
                  this.router.navigate(['/admin/bordereau']);
                }
              },
              {
                label: 'Localisation',
                icon: 'pi pi-fw pi-map-marker',
                command: () => {
                  this.router.navigate(['/admin/localisation']);
                }
              }
            ]
          },
          {
            label: 'Biens orphelins',
            command: () => {
              this.showModalBiensOrp = true;
            }
          },
          {
            label: 'Codification',
            items: [
              {
                label: 'Zones',
                command: () => {
                  this.showModalZone = true;
                }
              },
              {
                label: 'Biens',
                command: () => {
                  this.showModalBien = true;
                }
              },
              {
                label: 'Sites',
                command: () => {
                  this.showModalSite = true;
                }
              },
              {
                label: 'Localisations',
                command: () => {
                  this.showModalLocalisation = true;
                }
              },
              {
                label: 'Bordereaux',
                command: () => {
                  this.showModalBordereau = true;
                }
              }
            ]
          },
          {
            label: 'Recherche rapide',
            command: () => {
              this.router.navigate(['/admin/recherche-rapide']);
            }
          },
          {
            label: 'Recherche avancée',
            command: () => {
              this.router.navigate(['/admin/recherche-avancee']);
            }
          },
        ]
      },
      {
        label: 'Module mouvement',
        items: [
          {
            label: 'Mouvement de bien'
          },
          {
            label: 'Historique des transferts'
          },
          {
            label: 'Propositions de mises au rebut et réactivation'
          },
          {
            label: 'Historique des validations de mises au rebut'
          }
        ]
      },
      {
        label: 'Module Amortissement',
        items: [
          {
            label: 'Vérification de plan d\'amortissement'
          },
          {
            label: 'Amortissements par an'
          },
          {
            label: 'Amortissements journaliers'
          },
          {
            label: 'Génération d\'écriture comptable'
          }
        ]
      },
    ];
  }

  ngAfterViewInit() {
    this.documentClickListener = this.renderer.listen('body', 'click', (event) => {
      if (!this.topbarItemClick) {
        this.activeTopbarItem = null;
        this.topbarMenuActive = false;
      }

      if (!this.sidebarClick && (this.overlay || !this.isDesktop())) {
        this.sidebarActive = false;
      }

      if (this.configActive && !this.configClick) {
        this.configActive = false;
      }

      this.configClick = false;
      this.topbarItemClick = false;
      this.sidebarClick = false;
    });
  }

  onTabClick(event: Event, index: number) {
    if (this.activeTabIndex === index) {
      this.sidebarActive = !this.sidebarActive;
    } else {
      this.activeTabIndex = index;
      this.sidebarActive = true;
    }

    event.preventDefault();
  }

  closeSidebar(event: Event) {
    this.sidebarActive = false;
    event.preventDefault();
  }

  onSidebarClick($event) {
    this.sidebarClick = true;
  }

  onTopbarMenuButtonClick(event) {
    this.topbarItemClick = true;
    this.topbarMenuActive = !this.topbarMenuActive;

    event.preventDefault();
  }

  onTopbarItemClick(event, item) {
    this.topbarItemClick = true;

    if (this.activeTopbarItem === item) {
      this.activeTopbarItem = null;
    } else {
      this.activeTopbarItem = item;
    }

    event.preventDefault();
  }

  onTopbarSubItemClick(event) {
    event.preventDefault();
  }



  onConfigClick(event) {
    this.configClick = true;
  }

  onRippleChange(event) {
    this.app.ripple = event.checked;
    this.primengConfig = event.checked;
  }

  get overlay(): boolean {
    return this.app.layoutMode === 'overlay';
  }

  isDesktop() {
    return window.innerWidth > 1024;
  }

  ngOnDestroy() {
    if (this.documentClickListener) {
      this.documentClickListener();
    }
  }
}
