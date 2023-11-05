import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SatelliteTLE } from './satellite-tle';
import { SatellitePosition } from './satellite-position';

@Injectable({
  providedIn: 'root'
})
export class SatApiService {
  constructor(private http:HttpClient) { }
  baseURL:string = "https://api.n2yo.com/rest/v1/satellite"
  apiKey:string | undefined;
  satPos = [{lat:0, lng:0, alt:0, name:"", speed:0}]
  obsPos = {lat:0, lng:0}
  satellites = [{id: 25544,lat:0, lng:0, alt:0, name:"", speed:0}, {id: 33591,lat:0, lng:0, alt:0, name:"", speed:0}]
  private secondsAfterDataRefresh = 0;
  transactions:number=0;
  
  startSync()
  {
    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
      this.obsPos.lat = position.coords.latitude;
      this.obsPos.lng = position.coords.longitude;
    }, ()=>{
      //alert("Error getting current location.");
    })
    setInterval(() => {
      this.satellites.forEach((value: typeof this.satellites[0], index:number, array:object[])=>
      {
        this.http.get<SatellitePosition>(`${this.baseURL}/positions/${value.id}/${this.obsPos.lat}/${this.obsPos.lng}/0/1?apiKey=${this.apiKey}`)
        .subscribe((data: SatellitePosition) => {
          this.satellites[index].lat = data.positions[0].satlatitude
          this.satellites[index].lng = data.positions[0].satlongitude
          this.satellites[index].name= data.info.satname
          this.transactions = data.info.transactionscount;
        })
      })
      
    },this.satellites.length*4000)
  }
}
