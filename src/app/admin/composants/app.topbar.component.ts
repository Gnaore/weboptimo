import { Component, OnInit } from '@angular/core';
import { AdminMainComponent } from '../admin-main/admin-main.component';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-topbar',
    template: `
        <div class="topbar clearfix">
            <div class="logo">
                <a href="#">
                    <img src="assets/layout/images/logo.png">
                </a>
            </div>

			<h3 class="app-name mt-2 text-white">Opt'Immo</h3>

            <a id="topbar-menu-button" href="#" (click)="adminMain.onTopbarMenuButtonClick($event)">
                <i class="pi pi-bars"></i>
            </a>

            <ul class="topbar-menu fadeInDown" [ngClass]="{'topbar-menu-visible': adminMain.topbarMenuActive}">
                <li #profile class="profile-item" [ngClass]="{'active-topmenuitem':adminMain.activeTopbarItem === profile}">
                    <a href="#" (click)="adminMain.onTopbarItemClick($event,profile)">
                        <div class="profile-image">
                            <img src="assets/layout/images/profile-image.png">
                        </div>
                        <div class="profile-info">
                            <span class="topbar-item-name profile-name">Claire White</span>
                            <span class="topbar-item-name profile-role">System Admin</span>
                        </div>
                    </a>

                    <ul class="fadeInDown">
                        <li role="menuitem">
                            <a href="#" (click)="adminMain.onTopbarSubItemClick($event)">
                                <i class="pi pi-user"></i>
                                <span>Profil</span>
                                <span class="topbar-submenuitem-badge">5</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" (click)="adminMain.onTopbarSubItemClick($event)">
                                <i class="pi pi-lock"></i>
                                <span>Privacy</span>
                                <span class="topbar-submenuitem-badge">2</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" (click)="adminMain.onTopbarSubItemClick($event)">
                                <i class="pi pi-cog"></i>
                                <span>Settings</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a routerLink="/auth" (click)="adminMain.onTopbarSubItemClick($event)">
                                <i class="pi pi-sign-out"></i>
                                <span>Déconnexion</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li #settings [ngClass]="{'active-topmenuitem':adminMain.activeTopbarItem === settings}">
                    <a href="#" (click)="adminMain.onTopbarItemClick($event,settings)">
                        <i class="topbar-icon pi pi-cog"></i>
                        <span class="topbar-item-name">Settings</span>
                    </a>
                    <ul class="fadeInDown">
                        <li role="menuitem">
                            <a href="#" (click)="adminMain.onTopbarSubItemClick($event)">
                                <i class="pi pi-palette"></i>
                                <span>Change Theme</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" (click)="adminMain.onTopbarSubItemClick($event)">
                                <i class="pi pi-heart"></i>
                                <span>Favorites</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" (click)="adminMain.onTopbarSubItemClick($event)">
                                <i class="pi pi-lock"></i>
                                <span>Lock Screen</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" (click)="adminMain.onTopbarSubItemClick($event)">
                                <i class="pi pi-image"></i>
                                <span>Wallpaper</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li #messages [ngClass]="{'active-topmenuitem':adminMain.activeTopbarItem === messages}">
                    <a href="#" (click)="adminMain.onTopbarItemClick($event,messages)">
                        <i class="topbar-icon pi pi-envelope"></i>
                        <span class="topbar-badge">5</span>
                        <span class="topbar-item-name">Messages</span>
                    </a>
                    <ul class="fadeInDown">
                        <li role="menuitem">
                            <a href="#" class="topbar-message" (click)="adminMain.onTopbarSubItemClick($event)">
                                <img src="assets/layout/images/avatar1.png" width="35"/>
                                <span>Give me a call</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" class="topbar-message" (click)="adminMain.onTopbarSubItemClick($event)">
                                <img src="assets/layout/images/avatar2.png" width="35"/>
                                <span>Sales reports attached</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" class="topbar-message" (click)="adminMain.onTopbarSubItemClick($event)">
                                <img src="assets/layout/images/avatar3.png" width="35"/>
                                <span>About your invoice</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" class="topbar-message" (click)="adminMain.onTopbarSubItemClick($event)">
                                <img src="assets/layout/images/avatar2.png" width="35"/>
                                <span>Meeting today at 10pm</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" class="topbar-message" (click)="adminMain.onTopbarSubItemClick($event)">
                                <img src="assets/layout/images/avatar4.png" width="35"/>
                                <span>Out of office</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li #notifications [ngClass]="{'active-topmenuitem':adminMain.activeTopbarItem === notifications}">
                    <a href="#" (click)="adminMain.onTopbarItemClick($event,notifications)">
                        <i class="topbar-icon pi pi-clock"></i>
                        <span class="topbar-badge">4</span>
                        <span class="topbar-item-name">Notifications</span>
                    </a>
                    <ul class="fadeInDown">
                        <li role="menuitem">
                            <a href="#" (click)="adminMain.onTopbarSubItemClick($event)">
                                <i class="pi pi-sliders-h"></i>
                                <span>Pending tasks</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" (click)="adminMain.onTopbarSubItemClick($event)">
                                <i class="pi pi-calendar"></i>
                                <span>Meeting today at 3pm</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" (click)="adminMain.onTopbarSubItemClick($event)">
                                <i class="pi pi-download"></i>
                                <span>Download documents</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" (click)="adminMain.onTopbarSubItemClick($event)">
                                <i class="pi pi-ticket"></i>
                                <span>Book flight</span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
            
        </div>
    `
})
export class AppTopbarComponent implements OnInit {
    
    items: MenuItem[] | undefined;
    constructor(public adminMain: AdminMainComponent) { }

    ngOnInit(): void {
        this.items = [
            {
                label: 'File',
                icon: 'pi pi-fw pi-file',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            {
                                label: 'Bookmark',
                                icon: 'pi pi-fw pi-bookmark'
                            },
                            {
                                label: 'Video',
                                icon: 'pi pi-fw pi-video'
                            }
                        ]
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-fw pi-trash'
                    },
                    {
                        separator: true
                    },
                    {
                        label: 'Export',
                        icon: 'pi pi-fw pi-external-link'
                    }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    {
                        label: 'Left',
                        icon: 'pi pi-fw pi-align-left'
                    },
                    {
                        label: 'Right',
                        icon: 'pi pi-fw pi-align-right'
                    },
                    {
                        label: 'Center',
                        icon: 'pi pi-fw pi-align-center'
                    },
                    {
                        label: 'Justify',
                        icon: 'pi pi-fw pi-align-justify'
                    }
                ]
            },
            {
                label: 'Users',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-user-plus'
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-fw pi-user-minus'
                    },
                    {
                        label: 'Search',
                        icon: 'pi pi-fw pi-users',
                        items: [
                            {
                                label: 'Filter',
                                icon: 'pi pi-fw pi-filter',
                                items: [
                                    {
                                        label: 'Print',
                                        icon: 'pi pi-fw pi-print'
                                    }
                                ]
                            },
                            {
                                icon: 'pi pi-fw pi-bars',
                                label: 'List'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Events',
                icon: 'pi pi-fw pi-calendar',
                items: [
                    {
                        label: 'Edit',
                        icon: 'pi pi-fw pi-pencil',
                        items: [
                            {
                                label: 'Save',
                                icon: 'pi pi-fw pi-calendar-plus'
                            },
                            {
                                label: 'Delete',
                                icon: 'pi pi-fw pi-calendar-minus'
                            }
                        ]
                    },
                    {
                        label: 'Archieve',
                        icon: 'pi pi-fw pi-calendar-times',
                        items: [
                            {
                                label: 'Remove',
                                icon: 'pi pi-fw pi-calendar-minus'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Quit',
                icon: 'pi pi-fw pi-power-off'
            }
        ];
    }
}
