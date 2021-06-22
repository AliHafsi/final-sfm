import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import * as L from 'leaflet';
import { MarkerService } from '../shared/map.service';
import * as $ from "jquery"


@Component({
  selector: 'app-gateways',
  templateUrl: './gateways.component.html',
  styleUrls: ['./gateways.component.css']
})
export class GatewaysComponent implements OnInit {
  gatewayForm: FormGroup;
  gateways: any;

  constructor(private _formBuilder: FormBuilder, private markerService: MarkerService) { }
  ngOnInit() {
    this.gatewayForm = this._formBuilder.group({
      name: ["City xyz", [Validators.required]],
      lat: ["32.864371015092836", [Validators.required]],
      long: ["9.725880369943981", Validators.required],
    });

    this.getAllGateways()
  }

  onSubmit(gatewayForm: FormGroup) {
    const { valid, value } = gatewayForm;
    // console.log(valid, value);
    if (valid) {
      this.markerService.addMarker(value).subscribe((result) => {
        console.log(result);
        window.location.reload();
      })
    }

  }

  getAllGateways() {
    this.markerService.getAllMarkers().subscribe((result) => {
      this.gateways = result;
      // console.log(result);
    })
  }

  deleteGateway(id) {
    this.markerService.deleteGateway(id).subscribe(() => {
      // this.getAllGateways()
      window.location.reload();
    })
  }



}

