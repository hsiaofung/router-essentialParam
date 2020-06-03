import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

import { Observable } from "rxjs/Observable";

import { Stock } from "app/model/stock";
import { HttpEvent } from "@angular/common/http/src/response";
import { UserStoreService } from "./user-store.service";

@Injectable()
export class StockService {
  constructor(private http: HttpClient, private userStore: UserStoreService) {}

  getStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>("/api/stock");
  }

  getStock(code: string): Observable<Stock> {
    // 只是以code對伺服器發出GET請求並回傳相關股票
    return this.http.get<Stock>("/api/stock/" + code);
  }

  createStock(stock: Stock): Observable<any> {
    return this.http.post("/api/stock", stock);
  }

  toggleFavorite(stock: Stock): Observable<Stock> {
    return this.http.patch<Stock>("/api/stock/" + stock.code, {
      favorite: !stock.favorite,
    });
  }
}
