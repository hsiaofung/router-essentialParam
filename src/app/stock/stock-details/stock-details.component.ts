import { Component, OnInit } from "@angular/core";
import { StockService } from "../../services/stock.service";
import { ActivatedRoute } from "@angular/router";
import { Stock } from "../../model/stock";

@Component({
  selector: "app-stock-details",
  templateUrl: "./stock-details.component.html",
  styleUrls: ["./stock-details.component.css"],
})
export class StockDetailsComponent implements OnInit {
  public stock: Stock;
  constructor(
    private stockService: StockService,
    private route: ActivatedRoute
  ) {} // 將作用中的路徑注入建構元

  ngOnInit() {
    const stockCode = this.route.snapshot.paramMap.get("code"); // 使用作用中的路徑從URL讀取代號。
    console.log("AAA", stockCode);
    this.stockService
      .getStock(stockCode)
      .subscribe((stock) => (this.stock = stock)); // 使用代號發出服務呼叫，並將回傳值儲存在變數中。
  }
}
