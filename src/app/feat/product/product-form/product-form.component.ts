import { Component, NgModule, Input, SimpleChange } from '@angular/core';
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

    private productForm: FormGroup;

    private _defaultProduct = {
        sku: null,
        name: null,
        category: {
            name: null,
            desc: null
        },
        price: {
            amount: null,
            discount: null
        },
        inventory: {
            total: null,
            purchased: null
        },
        isActive: true,
        desc: null,
        attrs: {
            age: null,
            weight: null,
            breed: null,
            img: null
        },
        seller: {
            name: null,
            address: null,
            contact: null
        }
    }

    constructor(
        private _fb: FormBuilder,
        private productSvc: ProductService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() { 
        this.initValidation();
    }

    ngOnChanges(data: SimpleChange) {
        debugger;
        if (data && data['id'] && data['id'].currentValue) {
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
            'description': new FormControl()
        });
    }

    private updateFormAndValidationState(
        name: string, category: string, amount: number, qty: number, desc: string
    ) {

        this.productForm.controls[ 'name' ].setValue(name);
        this.productForm.controls[ 'category' ].setValue(category);
        this.productForm.controls[ 'amount' ].setValue(amount);
        this.productForm.controls[ 'qty' ].setValue(qty);
        this.productForm.controls[ 'description' ].setValue(desc);
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
                        res.data.desc
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

            let personObj = Object.assign({}, this._defaultProduct, {
                name: name,
                desc: desc,
                'category': {
                    name: category,
                    desc: category
                },
                price: {
                    amount: amount,
                    discount: null
                },
                inventory: {
                    total: qty
                }
            });

            if (this.id) {
                this.productSvc.updateProduct(personObj, this.id)
                    .subscribe((res: any) => {

                    })
            } else {
                this.productSvc.createProduct(personObj)
                    .subscribe((res: any) => {

                    })
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