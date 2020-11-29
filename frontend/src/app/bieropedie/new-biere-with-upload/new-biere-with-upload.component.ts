import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StateService } from '../../services/state.service';
import { BieresService } from '../../services/bieres.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Biere } from '../../models/Biere.model';
import { mimeType } from '../mime-type.validator';

@Component({
  selector: 'app-new-biere-with-upload',
  templateUrl: './new-biere-with-upload.component.html',
  styleUrls: ['./new-biere-with-upload.component.scss']
})
export class NewBiereWithUploadComponent implements OnInit {

  public biereForm: FormGroup;
  public loading = false;
  public part: number;
  public userId: string;
  public imagePreview: string;
  public errorMessage: string;

  constructor(private state: StateService,
              private formBuilder: FormBuilder,
              private bieresService: BieresService,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit() {
    this.state.mode$.next('form');
    this.biereForm = this.formBuilder.group({
      nom: [null, Validators.required],
      type: [null, Validators.required],
      pays: [null, Validators.required],
      description: [null, Validators.required],
      image: [null, Validators.required, mimeType]
    });
    this.userId = this.auth.userId;
  }

  onSubmit() {
    this.loading = true;
    const biere = new Biere();
    biere.nom = this.biereForm.get('nom').value;
    biere.type = this.biereForm.get('type').value;
    biere.pays = this.biereForm.get('pays').value;
    // this.userId;
    biere.description = this.biereForm.get('description').value;
    biere.imageUrl = '';
    this.bieresService.createNewBiereWithFile(biere, this.biereForm.get('image').value).then(
      () => {
        this.biereForm.reset();
        this.loading = false;
        this.router.navigate(['/bieropedie/bieres']);
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }

  onImagePick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.biereForm.get('image').patchValue(file);
    this.biereForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      if (this.biereForm.get('image').valid) {
        this.imagePreview = reader.result as string;
      } else {
        this.imagePreview = null;
      }
    };
    reader.readAsDataURL(file);
  }
}
