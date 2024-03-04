import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-key',
  templateUrl: './add-key.component.html',
  styleUrl: './add-key.component.scss',
})
export class AddKeyComponent {
  username = new FormControl('');
  apikey = new FormControl('');
}
