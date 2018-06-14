import { NgModule, Directive, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common'

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter'; 

interface IScroll { 
    scrollTop: number;
    scrollHeight: number;
    clientHeight: number;
}

@Directive({
    'selector': '[infinite-scroll]'
})
export class InfiteScrollComponent { 

    @Output() onScroll: EventEmitter<any> = new EventEmitter<any>();

    private disposeScroll: Subscription;
    private threshold: number = 50;

    constructor(private eleRef: ElementRef) { }

    ngAfterViewInit() { 
        this.disposeScroll =
            Observable.fromEvent(this.eleRef.nativeElement, 'scroll')
                .map((se: any) => ({
                    scrollTop: se.target.scrollTop,
                    scrollHeight: se.target.scrollHeight,
                    clientHeight: se.target.clientHeight
                }))
                .filter((data: IScroll) => this.canScroll(data))
                .subscribe(ev => this.onScroll);
    }

    ngOnDestroy() {
        this.disposeScroll.unsubscribe();
    }
    
    private canScroll(data: IScroll) { 
        return data.scrollTop + data.clientHeight >= data.scrollHeight - this.threshold;
    }
}

@NgModule({
    declarations: [ InfiteScrollComponent ],
    imports: [ CommonModule ],
    exports: [ InfiteScrollComponent ]
})
export class InfiniteScrollModule { }