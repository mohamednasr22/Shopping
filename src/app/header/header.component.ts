import { Component, OnInit ,Output ,EventEmitter} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import {Response} from '@angular/http'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() featureSelected = new EventEmitter<string>();

  constructor(private dataStorageService:DataStorageService) { }

  ngOnInit(): void {
  }

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }
  onSaveDate(){
    this.dataStorageService.storeRecipe()
    .subscribe(
       (response:Response)=>{
         console.log(response);
       }
    )

  }
  onFatchDate(){
    this.dataStorageService.getRecipe();
  }

}
