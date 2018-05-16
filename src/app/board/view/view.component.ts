import { BoardService } from './../../services/board.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  board={};
  user={};
  updateMode:boolean;
  id;

  constructor(private route: ActivatedRoute, private router: Router, private boardService: BoardService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.user = localStorage.getItem('user');
    this.updateMode = false;
    this.getBook();
  }

  getBook(){
    this.boardService.inquiryById(this.id)
    .subscribe( (data) => {
      if(data.result){
        this.board = data.board;
      }
    })
  }

  update() {
    this.updateMode = !this.updateMode;
    if( !this.updateMode && window.confirm('수정하시겠습니까？')){
      this.boardService.update(this.id, this.board) 
      .subscribe( (data) => {
        this.alertAndRoute(data.msg, `/board/view/${this.id}`)
      })
    } else {
      this.getBook();
    }
  }

  alertAndRoute(msg:string, url:string) {
    window.alert(msg);
    this.router.navigateByUrl(url);
  }

  remove() {
    if(window.confirm('삭제하시겠습니까？')){
      this.boardService.remove(this.id) 
      .subscribe( (data) => {
        this.alertAndRoute(data.msg, '/board')
      })
    } else {
      this.getBook();
    }
  }

  cancel() {
    this.updateMode = false;
    this.getBook();
  }
}
