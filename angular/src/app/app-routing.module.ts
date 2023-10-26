import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/client/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { OrdersComponent } from './pages/admin/orders/orders.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ProductsComponent } from './pages/admin/products/products.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { AddCategoryComponent } from './pages/admin/categories/add-category/add-category.component';
import { EditCategoryComponent } from './pages/admin/categories/edit-category/edit-category.component';
import { AddUserComponent } from './pages/admin/users/add-user/add-user.component';
import { EditUserComponent } from './pages/admin/users/edit-user/edit-user.component';
import { AddProductsComponent } from './pages/admin/products/add-products/add-products.component';
import { EditProductsComponent } from './pages/admin/products/edit-products/edit-products.component';
import { CheckoutComponent } from './pages/client/checkout/checkout.component';
import { authGuardGuard } from './guard/auth-guard.guard';
import { adminActivateGuard } from './guard/admin-activate.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'login', component: LoginComponent, canActivate: [authGuardGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [authGuardGuard],
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [adminActivateGuard],
    children: [
      { path: 'orders', component: OrdersComponent },
      {
        path: 'products',
        component: ProductsComponent,
      },
      { path: 'products/add', component: AddProductsComponent },
      { path: 'products/edit/:id', component: EditProductsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'users/add', component: AddUserComponent },
      { path: 'users/edit/:id', component: EditUserComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'categories/add', component: AddCategoryComponent },
      { path: 'categories/edit/:id', component: EditCategoryComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
