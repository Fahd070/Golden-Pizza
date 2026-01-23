import { displayProducts} from "./products.js";
import { displayComment } from "./comments.js";
displayProducts();
displayComment();

let userLogin = document.querySelector(".ri-user-line");
let myDialog = document.querySelector(".userLogin");
let menuList = document.querySelector(".ri-menu-line");
let showList = document.querySelector(".lists");

userLogin.onclick = function () {
    myDialog.innerHTML = `
    <i class="ri-close-large-line"></i>
    <form action="">
    <h2>Login</h2>
        <div class="userList">
    <div class="userName">
        <i class="ri-user-line"></i>
    <input type="text" name="userName" required>
    </div>
    <div class="password">
        <i class="ri-lock-line"></i>
    <input type="password" name="password" required>
    </div>
        <div class="checkBox">
        <input type="checkbox" name="checkbox"> 
        <u><p class="Remember">Remember me</p></u>
        </div>
    <div class="submit">
        <button type="submit">Submit</button>
    </div>
    </div>
</form>
    
    `;
    myDialog.showModal();
    document.querySelector(".ri-close-large-line").onclick = function () {myDialog.close();}
    
}

menuList.onclick = function () {
    showList.classList.toggle("hide");
}