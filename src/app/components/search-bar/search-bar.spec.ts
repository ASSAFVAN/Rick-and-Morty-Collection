import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar';
import { By } from '@angular/platform-browser';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit trimmed search value after debounce', fakeAsync(() => {
    const spy = jest.spyOn(component.search, 'emit');
    const input = '   test query   ';
    
    component.searchCtrl.setValue(input);
    
    tick(300);
    
    expect(spy).toHaveBeenCalledWith('test query');
  }));

  it('should not emit if value is null', fakeAsync(() => {
    const spy = jest.spyOn(component.search, 'emit');

    component.searchCtrl.setValue(null);

    tick(300);

    expect(spy).not.toHaveBeenCalled();
  }));

  it('should not emit for same repeated value due to distinctUntilChanged', fakeAsync(() => {
    const spy = jest.spyOn(component.search, 'emit');

    component.searchCtrl.setValue('hello');
    tick(300);

    component.searchCtrl.setValue('hello');
    tick(300);

    expect(spy).toHaveBeenCalledTimes(1);
  }));
});
