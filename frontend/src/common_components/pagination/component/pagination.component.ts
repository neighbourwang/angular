import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
    selector: 'fc-pagination',
    templateUrl: '../template/pagination.component.html',
    inputs: ["tp", "pp"]
})

export class PaginationComponent implements OnInit {
    tp: number;
    cp: number = 1;
    pp: number = 10;

    prev: number;
    next: number;

    pages: Array<number> = new Array<number>();

    @Output() pf = new EventEmitter<any>();

    ngOnInit() {
        this.tp = parseInt(this.tp.toString(), 10);
        this.pp = parseInt(this.pp.toString(), 10);

        this.reCalculatePage();
    }

    // 当前显示页切换，更新分页信息，同时调用画面组件指定的分页展示方法
    paging(page: number) {
        this.pf.emit(page);
        this.cp = page;
        this.reCalculatePage();
    }

    // 计算显示页数的半值
    rangeHalf() {
        if (this.pp % 2 == 1) {
            return Math.floor(this.pp / 2) + 1;
        } else {
            return this.pp / 2
        }
    }

    // 重新计算分页信息
    reCalculatePage() {
        let bf: number = 0;
        let af: number = 0;

        if (this.pp % 2 == 1) {
            bf = Math.floor(this.pp / 2)
            af = bf;
        } else {
            bf = this.pp / 2;
            af = this.pp / 2 - 1;
        }

        let sp: number = 0;
        let ep: number = 0;

        if ((this.cp - bf) <= 0) {
            sp = 1;
            ep = sp + this.pp - 1;

            if (ep > this.tp) {
                sp = this.tp - this.pp + 1;
                ep = this.tp;
            }
        } else {
            sp = this.cp - bf;
            ep = sp + this.pp - 1;

            if (ep > this.tp) {
                sp = this.tp - this.pp + 1;
                ep = this.tp;
            }
        }

        sp = sp > 1 ? sp : 1;

        this.prev = this.cp == 1 ? 1 : this.cp - 1;
        this.next = this.cp > this.tp ? this.cp : this.cp + 1;

        let pages = new Array<number>();
        
        for (let i = sp; i <= ep; i++) {
            pages.push(i);
        }

        this.pages = pages;
    }
    
    // 是否输出组件判断
    isRender() {
        return this.tp > 1;
    }

    // 是否有前一页判断
    hasPrev() {
        return this.cp > 1;
    }

    // 是否有后一页判断
    hasNext() {
        return this.cp < this.tp;
    }
}