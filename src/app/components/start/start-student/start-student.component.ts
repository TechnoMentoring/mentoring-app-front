import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { navbarDataStudent } from './nav-dataStudent';

interface sideNavToggle {
  screenWidth: number,
  collapsed: boolean,
}

@Component({
  selector: 'app-start-student',
  templateUrl: './start-student.component.html',
  styleUrls: ['./start-student.component.css']
})
export class StartStudentComponent implements OnInit {

  @Output() onToogleSideNav: EventEmitter<sideNavToggle> = new EventEmitter();
  collapsed = false;
  navData = navbarDataStudent;
  screenWidth = 0;


  tonggleCollapse():void{
    this.collapsed = !this.collapsed;
    this.onToogleSideNav.emit({collapsed:this.collapsed,screenWidth:this.screenWidth});
  }

  closeSidenav():void{
    this.collapsed = false;
    this.onToogleSideNav.emit({collapsed:this.collapsed,screenWidth:this.screenWidth});
  }


  constructor(private router:Router) { }

  ngOnInit() {

    
  }


  envioPerfil(){
    this.router.navigateByUrl('/login/profile')
  }


  envioBusqueda(){
    this.router.navigateByUrl('/mentors/all')
  }

  solicitudes(){
    this.router.navigateByUrl('/request/all-student')
  }
}
