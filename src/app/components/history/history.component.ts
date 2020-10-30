import { Component, OnInit } from '@angular/core';
import { HistoryService, IHistory} from 'src/app/services/history.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})

export class HistoryComponent implements OnInit {

  history: IHistory[] = [];

  constructor(private sHistory: HistoryService) { }

  ngOnInit(): void {
    this.sHistory.getHistory('1')
    .then(res => {
      this.history = res;
    });
  }

}
