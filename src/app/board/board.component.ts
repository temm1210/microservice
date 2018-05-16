import { BoardService } from './../services/board.service';
import { Component, OnInit } from '@angular/core';
import { TimeAgoPipe } from 'time-ago-pipe';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  boards:any[];
  pagedBoards:any[];
  pager:any = {};

  keyword:string ='';
  
  constructor(private boardService: BoardService) { }

  ngOnInit() {
    this.getBoards();
  }

  getBoards() {
    this.boardService.inquiry(this.keyword)
        .subscribe( (info) => {
          if(info.result){
            this.boards = info.boards;
            this.paging(1);
          }
        }
      ,error => console.log(error));
  }

  paging(page:number) {
    if( page < 1 || page > this.pager.totalPage)
      return;

    this.pager = this.boardService.paging(this.boards.length, page);
    this.pagedBoards = this.boards.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  search(keyword:string){
    this.keyword = keyword;
    this.getBoards();
  }

}
