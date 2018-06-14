import { Component, NgModule, Input, SimpleChange, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router'

import { ProductServiceModule, IProduct, ProductService } from '../../shared/product.service';

@Component({
    selector: 'product-form',
    template: require('./product-form.component.html')
})
export class ProductFormComponent {
    @Input() id: string = null;

    @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

    private productForm: FormGroup;

    constructor(
        private _fb: FormBuilder,
        private productSvc: ProductService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.initValidation();
    }

    ngOnChanges(data: SimpleChange) {
        if (data && data[ 'id' ] && data[ 'id' ].currentValue) {
            this.getProductById(data[ 'id' ].currentValue)
        }
    }

    ngOnDestroy() { }

    private initValidation() {
        this.productForm = this._fb.group({
            'name': new FormControl('', Validators.required),
            'category': new FormControl('', Validators.required),
            'amount': new FormControl('', Validators.required),
            'qty': new FormControl('', Validators.required),
            'description': new FormControl(),
            'image': new FormControl()
        });
    }

    private updateFormAndValidationState(
        name: string, category: string, amount: number, qty: number,
        desc: string,
        image: string
    ) {

        this.productForm.controls[ 'name' ].setValue(name);
        this.productForm.controls[ 'category' ].setValue(category);
        this.productForm.controls[ 'amount' ].setValue(amount);
        this.productForm.controls[ 'qty' ].setValue(qty);
        this.productForm.controls[ 'description' ].setValue(desc);
        this.productForm.controls[ 'image' ].setValue(image);
    }

    private getProductById(id: string) {
        this.productSvc.getProductById(id)
            .subscribe((res: any) => {
                if (res.status && res.data) {
                    this.updateFormAndValidationState(
                        res.data.name,
                        res.data.category.name,
                        res.data.price.amount,
                        res.data.inventory.total,
                        res.data.desc,
                        res.data.attrs.img
                    );
                }
            })
    }

    private save() {
        if (this.productForm.dirty && this.productForm.valid) {
            let name = this.productForm.controls[ 'name' ].value;
            let category = this.productForm.controls[ 'category' ].value;
            let qty = this.productForm.controls[ 'qty' ].value;
            let amount = this.productForm.controls[ 'amount' ].value;
            let desc = this.productForm.controls[ 'description' ].value;
            let img = this.productForm.controls[ 'image' ].value;

            let personObj = {
                name: name,
                desc: desc,
                'category': {
                    name: category,
                    desc: category
                },
                inventory: {
                    total: qty,
                    purchased: null
                },
                isActive: true,
                price: {
                    amount: amount,
                    discount: null
                },
                attrs: {
                    age: null,
                    weight: null,
                    breed: null,
                    img: img
                },
                seller: {
                    name: null,
                    address: null,
                    contact: null
                }
            };

            if (this.id) {
                this.productSvc.updateProduct(personObj, this.id)
                    .subscribe(this.onSubmit)
            } else {
                this.productSvc.createProduct(personObj)
                    .subscribe(this.onSubmit)
            }
        }
    }

}

@NgModule({
    declarations: [ ProductFormComponent ],
    exports: [ ProductFormComponent ],
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        ProductServiceModule
    ]
})
export class ProductFormModule {

}