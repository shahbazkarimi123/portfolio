import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm} from '@angular/forms';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit{
  activeIndex: number | null = null;
  @ViewChild('roleCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private roles: string[] = [
    'Backend Development',
    'Frontend Development',
    'Full Stack Development',
    'Android Development'

  ];
  private roleIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private typingSpeed = 100;
  private pauseTime = 500;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const screenWidth = window.innerWidth;
    if(screenWidth<=600){
      canvas.width=screenWidth -20;
      canvas.height =210;
    }else{
      canvas.width = 900;
      canvas.height =300;
    }
    this.ctx = canvas.getContext('2d')!;
    // this.ctx.shadowColor = '#000';
    // this.ctx.shadowBlur = 8;
    this.ctx.textBaseline = 'top';
    this.animateTyping();
  }

  private animateTyping(): void {
    const screenWidth = window.innerWidth;

    const canvas = this.canvasRef.nativeElement;
    const currentRole = this.roles[this.roleIndex];
    const textToShow = currentRole.substring(0, this.charIndex);
    const prefix = 'I Am Into: ';

    // Clear canvas
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Static name
    this.ctx.font = screenWidth <=600 ? 'bold 22px monospace':'bold 32px monospace';
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillText('console.log(', 20, 50);

    this.ctx.font = screenWidth <=600 ? 'bold 22px monospace':'bold 32px monospace';
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillText('"Hi, I\'m Shahbaz Ahmed 👨‍💻"', 55, 90);

    this.ctx.font = screenWidth <=600 ? 'bold 22px monospace':'bold 32px monospace';
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillText(');', 20, 130);

    
    // this.ctx.font = '22px Arial';
    // this.ctx.fillStyle = '#e0e0e0';
    // this.ctx.fillText('Creative Technologist | Software Engineer', 50, 110);

    // Draw prefix in dark blue
    this.ctx.font = screenWidth <= 600 ? 'bold 18px monospace' : 'bold 28 px monospace';
    this.ctx.fillStyle = '#D3D9D4';
    this.ctx.fillText(prefix, 20, 180);

    // Draw animated role in dark red
    this.ctx.fillStyle = '#FB8500';
    this.ctx.fillText(textToShow + (this.charIndex < currentRole.length ? '|' : ''), 20 + this.ctx.measureText(prefix).width, 180);

    // Typing logic
    if (!this.isDeleting && this.charIndex < currentRole.length) {
      this.charIndex++;
      setTimeout(() => this.animateTyping(), this.typingSpeed);
    } else if (this.isDeleting && this.charIndex > 0) {
      this.charIndex--;
      setTimeout(() => this.animateTyping(), this.typingSpeed / 2);
    } else {
      this.isDeleting = !this.isDeleting;
      if (!this.isDeleting) {
        this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      }
      setTimeout(() => this.animateTyping(), this.pauseTime);
    }
  }

  formData={
    name:'',
    email:'',
    phone: null,
    message:''
  }
  onSubmit(event:NgForm){
    if(this.formData.email !=null && this.formData.phone!=null){
      emailjs.init('HhGu9HxR8MGzx_kCp');
      emailjs.send("service_mag1zu8","template_6mfgfoj",{
        name: this.formData.name,
        email: this.formData.email,
        message: this.formData.message,
        phone: this.formData.phone,
        });

    }

  }
  
  toggleOverlay(index:number) {
   
    this.activeIndex = this.activeIndex === index ? null : index;
  }

}



// emailjs.send("service_mag1zu8","template_6mfgfoj",{
//   name: "karimi",
//   email: "guruprince11@gmail.com",
//   message: "take message from me",
//   phone: 988089773,
//   });