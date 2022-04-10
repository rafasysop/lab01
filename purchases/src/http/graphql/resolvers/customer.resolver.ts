import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { Customer } from 'src/http/graphql/models/customer';
import { CustomerService } from 'src/services/customers.service';
import { AuthUser, CurrentUser } from 'src/http/auth/currentUser';
import { PurchasesService } from 'src/services/purchases.service';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(
    private customersService: CustomerService,
    private purchaseService: PurchasesService,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => Customer)
  me(@CurrentUser() user: AuthUser) {
    return this.customersService.getCustomerByAuthUserId(user.sub);
  }

  @ResolveField()
  purchases(@Parent() customer: Customer) {
    return this.purchaseService.listAllFromCustomer(customer.id);
  }
}
