import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ScheduleModule, RecurrenceEditorModule, DayService, WeekService, MonthService, MonthAgendaService } from '@syncfusion/ej2-angular-schedule';
import { AlertComponent } from './alert/alert.component';

import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { CalendarComponent } from './calendar/calendar.component';
import { EmployeeCreateComponent } from './employee-create/employee-create/employee-create.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit/employee-edit.component';
import { EmployeeListComponent } from './employee-list/employee-list/employee-list.component';
import { EmployeeService } from './employee.service';
import { GatewaysComponent } from './gateways/gateways.component';
import { MapComponent } from './heatmap/map/map.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { MotComponent } from './mot/mot.component';
import { appRoutes } from './routes';
import { GatewayService } from './shared/gateway.service';
import { UserService } from './shared/user.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { UserComponent } from './user/user.component';
import { NavbarComponent } from './_includs/navbar/navbar.component';

import { IMqttMessage, MqttModule, IMqttServiceOptions } from "ngx-mqtt";
import { MqttComponent } from './mqtt/mqtt.component';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'localhost',
  port: 1883,
  path: '/mqtt'
}

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent,
    HomeComponent,
    MapComponent,
    EmployeeCreateComponent,
    EmployeeEditComponent,
    EmployeeListComponent,
    AlertComponent,
    MotComponent,
    LogoutComponent,
    GatewaysComponent,
    CalendarComponent,
    NavbarComponent,
    MqttComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    ScheduleModule, RecurrenceEditorModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, AuthGuard, UserService, EmployeeService, GatewayService, DayService, WeekService, MonthService, MonthAgendaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
