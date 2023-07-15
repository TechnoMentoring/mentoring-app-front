import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { navbarDataMentor } from './nav-dataMentor';
import { RouterLinkActive } from '@angular/router';

interface sideNavToggle {
  screenWidth: number,
  collapsed: boolean,
}

@Component({
  selector: 'app-start-mentor',
  templateUrl: './start-mentor.component.html',
  styleUrls: ['./start-mentor.component.css']
})
export class StartMentorComponent implements OnInit {

  @Output() onToogleSideNav: EventEmitter<sideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarDataMentor;


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


  envioPerfil() {
    this.router.navigateByUrl('/login/profile')
  }

  envioBusqueda() {
  }

  crearHorario() {
    this.router.navigateByUrl('/schedule/creation');
  }

  listarSchedule() {
    this.router.navigateByUrl('/schedule/findMentor');
  }

  renovarSchedule() {
    this.router.navigateByUrl('/schedule/select');
  }

  solicitudes() {
    this.router.navigateByUrl('/request/all-mentor')
  }






















}
