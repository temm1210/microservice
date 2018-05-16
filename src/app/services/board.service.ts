import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class BoardService {

    constructor(private http: HttpClient) {}

    write(boardValue): Observable<any> {
        return this.http.post('/board',boardValue);
    }

    inquiry(keyword): Observable<any> {
        return this.http.get(`/board?keyword=${keyword}`);
    }

    inquiryById(id): Observable<any> {
        return this.http.get(`/board/${id}`);
    }

    update(id, data): Observable<any> {
        return this.http.put(`/board/${id}`, data);
    }

    remove(id): Observable<any> {
        return this.http.delete(`/board/${id}`);
    }

    paging(totalBoards:number, currentPage:number= 1, pageSize:number=3) {
        let totalPages = Math.ceil(totalBoards/pageSize);
        let startPage, endPage;

        if(totalPages <= 3){
            startPage = 1;
            endPage = totalPages;
        } else {
            if(currentPage <= 2) {
                startPage = 1;
                // endPage = 10;
                endPage = 3;

                //currentPage + 4
            } else if( currentPage +1 >= totalPages){
                // startPage = totalPages - 9;
                startPage = totalPages - 2;
                endPage = totalPages;
            } else {
                startPage = currentPage - 2;
                endPage = currentPage + 1;
            }
        }

        let startIndex = (currentPage -1 ) * pageSize;
        let endIndex = Math.min(startIndex + pageSize -1, totalBoards -1);

        let pages =[];

        for(let i = startPage; i <= endPage; i++)
            pages.push(i);

        return {
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            totalPages:totalPages,
            totalBoards: totalBoards,
            currentPage: currentPage,
            pageSize: pageSize,
            pages: pages
        }

    }

    // makeHttpHeader() : Object {
    //     console.log(`localStorage.getItem('jwtToken'):`,localStorage.getItem('jwtToken'))
    //     return { 
    //         headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken')}) 
    //     }
    // }
}