import { Component, OnInit } from '@angular/core';
import { faBars, faHeart, faPhone, faRetweet, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/_service/cart.service';
import { ProductService } from 'src/app/_service/product.service';
import { WishlistService } from 'src/app/_service/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]

})
export class HomeComponent implements OnInit {


  heart = faHeart;
  bag = faShoppingBag;
  retweet = faRetweet;

  listProductNewest : any;
  listProductPrice: any;

  showDepartment = true;


  category_items_response= [

    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
  },
  {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
  },
  {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
  }

]

category_items = [
  {
    id: 1,
    src: 'assets/image/chay_7.jpg',
    alt: '',
    title: 'Camera'
  },
  {
    id: 2,
    src: 'assets/image/chay_9.jpg',
    alt: '',
    title: 'Linh Kiện'
  },
  {
    id: 3,
    src: 'assets/image/chay_3.jpg',
    alt: '',
    title: 'Laptop'
  },
  {
    id: 4,
    src: 'assets/image/chay_4.jpg',
    alt: '',
    title: 'Nguồn'
  },
  {
    id: 5,
    src: 'assets/image/chay_8.jpg',
    alt: '',
    title: 'CPU'
  },
  {
    id: 6,
    src: 'assets/image/chay_6.jpg',
    alt: '',
    title: 'Ram'
  }
] ;

constructor(private productSerive:ProductService,private cartService: CartService, private wishlistService: WishlistService,private messageService: MessageService){}

ngOnInit(): void {
  this.getListProduct();
}


getListProduct(){
  this.productSerive.getListProductNewest(8).subscribe({
    next: res =>{
      this.listProductNewest = res;
    },error: err =>{
      console.log(err);
    }
  })
  this.productSerive.getListProductByPrice().subscribe({
    next:res =>{
      this.listProductPrice =res;
    },error: err=>{
      console.log(err);
    }
  })
}

addToCart(item: any){
  this.cartService.getItems();
  this.showSuccess("Thêm thành công vào giỏ hàng !")
  this.cartService.addToCart(item,1);
}

addToWishList(item: any){
  if(!this.wishlistService.productInWishList(item)){
    this.showSuccess("Thêm thành công vào mục yêu thích !")
    this.wishlistService.addToWishList(item);
  }
}

showSuccess(text: string) {
  this.messageService.add({severity:'success', summary: 'Success', detail: text});
}
showError(text: string) {
  this.messageService.add({severity:'error', summary: 'Error', detail: text});
}

showWarn(text: string) {
  this.messageService.add({severity:'warn', summary: 'Warn', detail: text});
}
}
