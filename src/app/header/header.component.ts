import { NgClass } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  ngOnInit(): void {
    this.hamburger();
    this.screenWidth=window.innerWidth;
    window.addEventListener('resize', () => {
      this.screenWidth = window.innerWidth;
      if (this.screenWidth >= 640) this.isMenuOpen = false; // close menu on resize to large
    });
  }
  isMenuOpen = false;
screenWidth = window.innerWidth;
  currentSection!:string;
  @HostListener('window:scroll',[])
  onWindowScroll(){
    const sections = ['home', 'about', 'skills', 'education', 'work', 'experience', 'contact'];
    for (let section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 80 && rect.bottom >= 80) {
          this.currentSection = section;
          break;
        }
      }
    }
  }

  hamburger(){
    document.addEventListener('DOMContentLoaded', function() {
      // open
      const burger = document.querySelectorAll('.navbar-burger');
      const menu = document.querySelectorAll('.navbar-menu');
  
      if (burger.length && menu.length) {
          for (var i = 0; i < burger.length; i++) {
              burger[i].addEventListener('click', function() {
                  for (var j = 0; j < menu.length; j++) {
                      menu[j].classList.toggle('hidden');
                  }
              });
          }
      }
  
      // close
      const close = document.querySelectorAll('.navbar-close');
      const backdrop = document.querySelectorAll('.navbar-backdrop');
  
      if (close.length) {
          for (var i = 0; i < close.length; i++) {
              close[i].addEventListener('click', function() {
                  for (var j = 0; j < menu.length; j++) {
                      menu[j].classList.toggle('hidden');
                  }
              });
          }
      }
  
      if (backdrop.length) {
          for (var i = 0; i < backdrop.length; i++) {
              backdrop[i].addEventListener('click', function() {
                  for (var j = 0; j < menu.length; j++) {
                      menu[j].classList.toggle('hidden');
                  }
              });
          }
      }
  });
  }

}




