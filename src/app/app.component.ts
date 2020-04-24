import { Component, OnInit,  } from '@angular/core';
import { CoronaService } from './services/corona.service';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Awas Corona';

  indonesia: any = {
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
    lastChecked: 0,
    covid19Stats: []
  };

  histories: any[] = [];
  historiesFilter: any[] = [];

  lineChartData: ChartDataSets[] = [
    { data: [], label: 'Sembuh' }
  ];
  lineChartLabels: Label[] = [];

  lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  lineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(0, 177, 5, 1)',
      borderColor: 'rgba(0, 177, 5, 1)',
      pointBackgroundColor: '#037F34',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    },
    {
      backgroundColor: 'rgba(255, 51, 66 , 1)',
      borderColor: 'rgba(255, 51, 66 , 1)',
      pointBackgroundColor: '#FF5733',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    },
    {
      backgroundColor: 'rgba(255, 195, 0, 1)',
      borderColor: 'rgba(255, 195, 0, 1)',
      pointBackgroundColor: '#EA7901',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    }
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

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

  loadAllCountry() {
    this.coronoService.getAllCountry().subscribe((results) => {
      this.allCountries = results.data;
    })
  }

  loadHistoryIndonesia() {
    this.coronoService.getHistoryIndonesia().subscribe((results) => {
      this.histories = results.stat_by_country;

      var tempDate = null;
      var tempHistory: any;
      var lineChartDataPositiveTemp: any[] = [];
      var lineChartDataMeninggalTemp: any[] = [];
      var lineChartDataSembuh: any[] = [];
      this.histories.forEach((item) => {
        if (tempDate == null) {
          tempDate = item.record_date.split(" ")[0];
          tempHistory = item;
        }
        if (tempDate !== item.record_date.split(" ")[0]) {
          this.historiesFilter.push(tempHistory);
          lineChartDataPositiveTemp.push(parseFloat(tempHistory.total_cases.replace(",", "")));
          lineChartDataMeninggalTemp.push(parseFloat(tempHistory.total_deaths.replace(",", "")));
          lineChartDataSembuh.push(parseFloat(tempHistory.total_recovered.replace(",", "")));
          this.lineChartLabels.push(tempHistory.record_date.split(" ")[0]);
          tempDate = item.record_date.split(" ")[0];
        }
        tempHistory = item;
      });
      this.historiesFilter.push(this.histories[this.histories.length - 1]);
      var dataPositive = {
        data: lineChartDataPositiveTemp,
        label: 'Positif Corona'
      };
      var dataMeninggal = {
        data: lineChartDataMeninggalTemp,
        label: 'Meninggal'
      }
      var dataSembuh = {
        data: lineChartDataSembuh,
        label: 'Sembuh'
      }

     

      this.lineChartData = [];
      this.lineChartData.push(dataSembuh);
      this.lineChartData.push(dataMeninggal);
      this.lineChartData.push(dataPositive);

      console.log(this.lineChartData);
    });
  }
}
