import { ComponentFixture, TestBed } from '@angular/core/testing';

import { history as dummyHistory, rHistory } from '../../mocks/history';
import { HistoryComponent } from './history.component';
import { HistoryService } from '../../services/history.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../../services/user.service';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let service: HistoryService;
  let serviceUser: UserService;

  const AngularFirestoreStub = {
    doc: () => ({
        collection: () => ({
            valueChanges: () => ({
              subscribe: (cb) => {
                cb(dummyHistory);
              }
            })
        })
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryComponent ],
      providers: [
        { provide: AngularFirestore, useValue: AngularFirestoreStub },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(HistoryService);
    serviceUser = TestBed.inject(UserService);
    serviceUser.user = {
      id: 'XXXX',
      username: 'XXX',
      password: 'XXXX',
      nombre: 'XXX',
      apellido: 'XXX',
      correo: 'XXX',
      dpi: 'XXX',
      edad: '0'
    };
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });

  it('should render table', () => {
    service.getHistory = () => {
      return new Promise((resolve) => {
        resolve(
          rHistory
        );
      });
    };

    const bannerElement: HTMLElement = fixture.nativeElement;
    const table = bannerElement.querySelector('table');
    expect(table).toBeDefined();
  });

  it('should render elements in table', () => {
    component.history = rHistory;
    fixture.detectChanges();

    const bannerElement: HTMLElement = fixture.nativeElement;
    const table = bannerElement.querySelector('table');
    const elementsInTable = Array.from(
      table.getElementsByClassName('table-row')
    );
    expect(elementsInTable.length).toEqual(rHistory.length);
  });
});
