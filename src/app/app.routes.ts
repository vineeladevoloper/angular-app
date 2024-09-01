import { Routes } from '@angular/router';
import { RegisterComponent } from './Models/user/register/register.component';
import { LoginComponent } from './Models/user/login/login.component';
import { EdituserComponent } from './Models/user/edituser/edituser.component';
import { ProfileComponent } from './Models/profile/profile.component';
import { UserdashbordComponent } from './Models/user/userdashbord/userdashbord.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './Models/about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AdminDashbordComponent } from './admin-dashbord/admin-dashbord.component';
import { PostProductComponent } from '../../product/post-product/post-product.component';
import { GetProductComponent } from '../../product/get-product/get-product.component';
import { ViewProductComponent } from '../../product/view-product/view-product.component';
import { GetAllCartitemsComponent } from '../../product/get-product/Cart/get-all-cartitems/get-all-cartitems.component';
import { GetAllOrderComponent } from '../../order/place-order/get-all-order/get-all-order.component';
import { GetOrderBYidComponent } from '../../order/place-order/get-order-byid/get-order-byid.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'userdashbord',
    component: UserdashbordComponent,
    children: [
      { path: 'edituser/:uid', component: EdituserComponent },
      { path: 'profile/:uid', component: ProfileComponent },
      { path: 'getproduct', component: GetProductComponent },
      { path: 'view-product/:pid', component: ViewProductComponent },
      { path: 'get-all-cartitems', component: GetAllCartitemsComponent },
      { path: 'get-order-byid', component: GetOrderBYidComponent },

    
      
    ]
  },
  {
    path: 'admin-dashbord', // Corrected path spelling
    component: AdminDashbordComponent,
    children: [
      { path: 'edituser/:uid', component: EdituserComponent },
      { path: 'profile/:uid', component: ProfileComponent },
      { path: 'getproduct', component: GetProductComponent },
      { path: 'post-product/:uid', component: PostProductComponent },
      { path: 'view-product/:pid', component: ViewProductComponent },
      { path: 'get-all-order', component: GetAllOrderComponent },



    ]
  }
];
