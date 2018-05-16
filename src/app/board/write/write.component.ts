import { Router } from '@angular/router';
import { BoardService } from './../../services/board.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {

  user;
  constructor(private boardService: BoardService, private router:Router) { }

  ngOnInit() {
    this.user = localStorage.getItem('user');
  }

  onSubmit(boardValue) {
    boardValue.writer = this.user;
    this.boardService.write(boardValue)
        .subscribe( (json) => {
          if(json.result)
            this.router.navigate(['/board']);
        })
  }
}
