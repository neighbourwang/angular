﻿import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'fc-pagination',
    templateUrl: '../template/pagination.component.html',
    inputs: ["tp", "pp"]
})

export class PaginationComponent implements OnInit, OnChanges {
    tp: number;
    pp: number = 10;

    cp: number = 1;

    prev: number;
    next: number;

    pages: Array<number> = new Array<number>();

    @Output() pf = new EventEmitter<any>();

    ngOnInit() {
        
    }

    // 分页信息变化后，重新计算分页信息
    ngOnChanges(changes: SimpleChanges) {
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

    // 描画组件
    render(cp: number) {
        this.cp = cp < this.tp ? (cp < 1 ? 1 : cp) : this.tp;

        this.reCalculatePage();
    }

    // 重新计算分页信息
    private reCalculatePage() {
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
    private isRender() {
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