import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLinkActive } from '@angular/router';
import { navbarDataAdmin } from './nav-dataAdmin';

interface sideNavToggle {
  screenWidth: number,
  collapsed: boolean,
}

@Component({
  selector: 'app-start-admin',
  templateUrl: './start-admin.component.html',
  styleUrls: ['./start-admin.component.css']
})
export class StartAdminComponent implements OnInit {

  @Output() onToogleSideNav: EventEmitter<sideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarDataAdmin;


  @HostListener('window:resize ', ['$event'])
  onResize(event:any){
    this.screenWidth=window.innerWidth;
    if(this.screenWidth <= 768){
      this.collapsed=false;
      this.onToogleSideNav.emit({collapsed:this.collapsed,screenWidth:this.screenWidth});
    }
  }

  toggleCollapse():void{
    this.collapsed = !this.collapsed;
    this.onToogleSideNav.emit({collapsed:this.collapsed,screenWidth:this.screenWidth});
  }

  closeSidenav():void{
    this.collapsed = false;
    this.onToogleSideNav.emit({collapsed:this.collapsed,screenWidth:this.screenWidth});
  }

  constructor(private router: Router,) {

  }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
  }




}
