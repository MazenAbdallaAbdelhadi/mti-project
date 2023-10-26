import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ProductsComponent } from './pages/admin/products/products.component';
import { OrdersComponent } from './pages/admin/orders/orders.component';
import { HomeComponent } from './pages/client/home/home.component';
import { FooterComponent } from './shared/client/footer/footer.component';
import { SidebarComponent } from './shared/admin/sidebar/sidebar.component';
import { NavComponent } from './shared/admin/nav/nav.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AddCategoryComponent } from './pages/admin/categories/add-category/add-category.component';
import { EditCategoryComponent } from './pages/admin/categories/edit-category/edit-category.component';
import { EditUserComponent } from './pages/admin/users/edit-user/edit-user.component';
import { AddUserComponent } from './pages/admin/users/add-user/add-user.component';
import { AddProductsComponent } from './pages/admin/products/add-products/add-products.component';
import { EditProductsComponent } from './pages/admin/products/edit-products/edit-products.component';
import { CartDrawerComponent } from './shared/client/cart-drawer/cart-drawer.component';
import { CheckoutComponent } from './pages/client/checkout/checkout.component';
import { CredentialsInterceptor } from './interceptor/credentials.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ProductsComponent,
    OrdersComponent,
    HomeComponent,
    FooterComponent,
    SidebarComponent,
    NavComponent,
    UsersComponent,
    CategoriesComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    EditUserComponent,
    AddUserComponent,
    AddProductsComponent,
    EditProductsComponent,
    CartDrawerComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CredentialsInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
