import { Component, OnInit } from '@angular/core';
import { CoronaService } from './services/corona.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Awas Corona';

  indonesia: any= {
    total_cases: 0,
    total_deaths: 0,
    total_recovered: 0,
    record_date: 0
  };

  global: any = {
    total_cases: 0,
    total_deaths: 0,
    total_recovered: 0,
    statistic_taken_at: 0
  }

  allCountries: any = {
    lastChecked : 0,
    covid19Stats: []
  };

  histories: any[] = [];

  constructor(private coronoService: CoronaService) {

  }

  ngOnInit() {
    this.loadIndonesia();
    this.loadGlobal()
    this.loadHistoryIndonesia();
    this.loadAllCountry();    
  }

  loadIndonesia() {
    this.coronoService.getDataIndonesia().subscribe((results) => {
      this.indonesia = results.latest_stat_by_country[0];
    });
  }


  loadGlobal() {
    this.coronoService.getDataGlobal().subscribe((results) => {
      this.global = results;
    });
  }

  loadAllCountry(){
    this.coronoService.getAllCountry().subscribe((results) =>{
      this.allCountries = results.data;
    })
  }

  loadHistoryIndonesia(){
    this.coronoService.getHistoryIndonesia().subscribe((results)=>{
      this.histories = results.stat_by_country;
    });
  }
  
}
