import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  baseUrl: string = 'http://localhost:3000/markers';
  constructor(private http: HttpClient) { }


  makeMarkers(map: L.Map): void {


    this.http.get(this.baseUrl).subscribe((res: any) => {
      var smallIcon = new L.Icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
        iconSize: [20, 20],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        shadowSize: [41, 35]
      });

      for (const c of res) {

        const marker = L.marker([c.coordinates.long, c.coordinates.lat], { icon: smallIcon }).addTo(map);


        marker.bindPopup(`<center>
        <p> <strong>${c.name}</strong>
        
        <h6>Longitude</h6>
        <br/>${c.coordinates.lat}</p>
        <h6>Latitude</h6>
        <br/>${c.coordinates.long}</p>
        <p>
        </center>
        <img style=" max-width: -webkit-fill-available;"src="${c.image}"/>
        <br/>
        <p>${c.description}</p>`
        );
      }
    });
  }

  addMarker(coordination): Observable<any> {
    let payload = {
      name: coordination.name,
      coordinates: { lat: coordination.lat, long: coordination.long }
    }
    return this.http.post<any>(`${this.baseUrl}`, payload)
  }

  getAllMarkers(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  deleteGateway(id) {
    return this.http.delete(this.baseUrl + "/" + id);
  }
}




