import { Component, OnInit } from "@angular/core";
import { StockService } from "app/services/stock.service";
import { Stock } from "app/model/stock";
import { Observable } from "rxjs/Observable";
import { UserStoreService } from "../../services/user-store.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-stock-list",
  templateUrl: "./stock-list.component.html",
  styleUrls: ["./stock-list.component.css"],
})
export class StockListComponent implements OnInit {
  public stocks$: Observable<Stock[]>;
  private page = 1; // 加入區域變數page並初始化為1

  constructor(
    private stockService: StockService,
    private userStore: UserStoreService,
    private router: Router, // 將路由注入建構元
    private route: ActivatedRoute // 將目前ActivatedRoute注入建構元
  ) {}

  ngOnInit() {
    console.log("Page No. : ", this.route.snapshot.queryParamMap.get("page")); // 從snapshot讀取查詢參數
    this.route.queryParams.subscribe((params) => {
      // 訂閱queryParams這個可觀察。此訂閱會在page改變時觸發，而我們還在同一個元件。
      // 訂閱queryParams 的改變。
      console.log("Page : ", params.page);
    });
    this.stocks$ = this.stockService.getStocks();
  }

  nextPage() {
    this.router.navigate([], {
      queryParams: {
        page: ++this.page, // 增加頁數並導向同一頁
      },
    });
  }
}
