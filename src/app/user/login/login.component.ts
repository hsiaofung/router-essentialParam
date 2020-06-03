import { Component } from "@angular/core";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  public username: string = "";
  public password: string = "";

  public message: string = "";
  constructor(private userService: UserService, private router: Router) {} // 將Router注入元件

  login() {
    this.userService.login(this.username, this.password).subscribe(
      (resp) => {
        console.log("Successfully logged in");
        this.message = resp.msg;
        // 成功登入時，導向股票清單。
        this.router.navigate(["stocks", "list"], { queryParams: { page: 1 } }); // 傳入查詢變數作為瀏覽請求的一部份
      },
      (err) => {
        console.error("Error logging in", err);
        this.message = err.error.msg;
      }
    );
  }
}
