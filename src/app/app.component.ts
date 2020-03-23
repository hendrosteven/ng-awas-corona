import { Component, OnInit } from '@angular/core';
import { CoronaService } from './services/corona.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Awas Corona';

  indonesia: any;
  province: any;
  global: any;
  positive: any;
  sembuh: any;
  meninggal: any;

  constructor(private coronoService: CoronaService){

  }

  ngOnInit() {
    this.loadPositif();
    this.loadMeninggal();
    this.loadSembuh();
    this.loadIndonesia();
    this.loadProvinsi();
    this.loadGlobal()
  }

  loadIndonesia(){

  }

  loadProvinsi(){

  }

  loadGlobal(){

  }

  loadPositif(){
    this.coronoService.getDataGlobalPrositif().subscribe((results) => {
      this.positive = results.value;
      console.log(this.positive);
    });
  }

  loadSembuh(){

  }

  loadMeninggal(){

  }


}
