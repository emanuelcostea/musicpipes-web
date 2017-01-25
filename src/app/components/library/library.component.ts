import { Component, OnInit } from '@angular/core';

import { SourcesService } from '../../services/sources.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  constructor(private sourcesService: SourcesService) { }

  ngOnInit() {
      this.sourcesService.getFiles();
  }
}
