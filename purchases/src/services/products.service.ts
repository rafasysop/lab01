import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreateProductParams {
  title: string;
}

@Injectable()
export class ProductsService {
  constructor(private prima: PrismaService) {}

  listAllProducts() {
    return this.prima.product.findMany();
  }

  async createProduct({ title }: CreateProductParams) {
    const slug = slugify(title, { lower: true });
    const productWithSameSlug = await this.prima.product.findUnique({
      where: { slug },
    });

    if (productWithSameSlug) {
      throw new Error(`this product title exists`);
    }

    return this.prima.product.create({
      data: {
        title,
        slug,
      },
    });
  }
}
