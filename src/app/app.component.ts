import { Component, ElementRef, ViewChild } from '@angular/core';
import Globe from 'globe.gl';
import { SatApiService } from './sat-api.service';
import { SatelliteTLE } from './satellite-tle';
import { getLatLngObj } from 'tle.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private globeEl: ElementRef, private satApi:SatApiService){} 
  title = 'satglobe';
  satData = [{lat:0, lng:0, name:"SPACE\nSTATION", alt:0}]
  globe = Globe()(this.globeEl!.nativeElement).globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg");
  tle:string = "";
  api = this.satApi;
  ngOnInit()
  {
    var apiParam = this.findGetParameter("apiKey");
    if (apiParam == null)
    {
      alert("Please provide n2y0 api key in apiKey get parameter. Example: ?apiKey=AAAAAA-BBBBBB-CCCCCC-DDDD")
    } else { this.satApi.apiKey = apiParam}
    this.globe.objectLat("lat");
    this.globe.objectLng("lng");
    this.globe.objectLabel("name")
    setInterval(() => {
      this.globe.objectsData(this.satApi.satellites)
    }, 250);
    this.satApi.startSync();
  }
  findGetParameter(parameterName:string):string | null {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}
}

