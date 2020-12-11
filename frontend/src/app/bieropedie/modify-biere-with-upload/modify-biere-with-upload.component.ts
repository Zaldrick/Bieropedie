import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StateService } from '../../services/state.service';
import { BieresService } from '../../services/bieres.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { mimeType } from '../mime-type.validator';
import { Biere } from '../../models/Biere.model';
import { GlobalConstants } from 'src/app/common/global-constants';

@Component({
  selector: 'app-modify-biere-with-upload',
  templateUrl: './modify-biere-with-upload.component.html',
  styleUrls: ['./modify-biere-with-upload.component.scss']
})
export class ModifyBiereWithUploadComponent implements OnInit {

  public biereForm: FormGroup;
  public biere: Biere;
  public loading = false;
  public userId: string;
  public imagePreview: string;
  public errorMessage: string;

  constructor(private state: StateService,
              private formBuilder: FormBuilder,
              private bieresService: BieresService,
              private route: ActivatedRoute,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit() {
    this.loading = true;
    this.userId = this.auth.userId;
    this.route.params.subscribe(
      (params) => {
        this.bieresService.getBiereById(params.id).then(
          (biere: Biere) => {
            this.biere = biere;
            this.biereForm = this.formBuilder.group({
              nom: [biere.nom, Validators.required],
              type: [biere.type, Validators.required],
              pays: [biere.pays, Validators.required],
              description: [biere.description, Validators.required],
              image: [GlobalConstants.apiURL + biere.imageUrl, Validators.required, mimeType]
            });
            this.imagePreview = biere.imageUrl;
            this.loading = false;
          }
        );
      }
    );
  }

  onSubmit() {
    this.loading = true;
    const biere = new Biere();
    biere._id = this.biere._id;
    biere.nom = this.biereForm.get('nom').value;
    biere.type = this.biereForm.get('type').value;
    biere.pays = this.biereForm.get('pays').value;
    biere.description = this.biereForm.get('description').value;
    biere.imageUrl = '';
    this.bieresService.modifyBiereWithFile(this.biere._id, biere, this.biereForm.get('image').value).then(
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
    console.log(file);
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
