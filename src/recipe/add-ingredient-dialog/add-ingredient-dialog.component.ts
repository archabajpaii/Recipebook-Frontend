import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-ingredient-dialog',
  templateUrl: './add-ingredient-dialog.component.html',
})
export class AddIngredientDialogComponent {
  ingredientForm: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddIngredientDialogComponent>) {
    this.ingredientForm = this.fb.group({
      name: ['', Validators.required],      
      quantity: [1, [Validators.required, Validators.min(1)]] 
    });
  }

  onAdd(): void {
    if (this.ingredientForm.valid) {
      this.dialogRef.close(this.ingredientForm.value); 
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
