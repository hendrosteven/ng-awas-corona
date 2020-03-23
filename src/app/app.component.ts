import { Component, OnInit } from '@angular/core';
import { CoronaService } from './services/corona.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Awas Corona';

  indonesia: any= {
    positif: 0,
    meninggal: 0,
    sembuh: 0
  };
  province: any;
  global: any;
  positive: any = 0;
  sembuh: any = 0;
  meninggal: any = 0;

  constructor(private coronoService: CoronaService) {

  }

  ngOnInit() {
    this.loadPositif();
    this.loadMeninggal();
    this.loadSembuh();
    this.loadIndonesia();
    this.loadProvinsi();
    this.loadGlobal()
  }

  loadIndonesia() {
    this.coronoService.getDataIndonesia().subscribe((results) => {
      this.indonesia = results;
    });
  }

  loadProvinsi() {
    this.coronoService.getDataPerProvinsi().subscribe((results) => {
      this.province = results;
    });
  }

  loadGlobal() {
    this.coronoService.getDataGlobal().subscribe((results) => {
      this.global = results;
    });
  }

  loadPositif() {
    this.coronoService.getDataGlobalPrositif().subscribe((results) => {
      this.positive = results.value;
    });
  }

  loadSembuh() {
    this.coronoService.getDataGlobalSembuh().subscribe((results) => {
      this.sembuh = results.value;
    });
  }

  loadMeninggal() {
    this.coronoService.getDataGlobalMeninggal().subscribe((results) => {
      this.meninggal = results.value;
    });
  }


}
