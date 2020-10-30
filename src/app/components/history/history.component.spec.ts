import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryComponent } from './history.component';
import { HistoryService } from '../../services/history.service';
import { history as historyMock } from '../../mocks/history';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let service: HistoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(HistoryService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render table', () => {
    service.getHistory = () => {
      return new Promise((resolve) => {
        resolve(
          historyMock
        );
      });
    };

    const bannerElement: HTMLElement = fixture.nativeElement;
    const table = bannerElement.querySelector('table');
    expect(table).toBeDefined();
  });

  it('should render elements in table', () => {
    component.history = historyMock;
    fixture.detectChanges();

    const bannerElement: HTMLElement = fixture.nativeElement;
    const table = bannerElement.querySelector('table');
    const elementsInTable = Array.from(
      table.getElementsByClassName('table-row')
    );
    expect(elementsInTable.length).toEqual(historyMock.length);
  });
});
