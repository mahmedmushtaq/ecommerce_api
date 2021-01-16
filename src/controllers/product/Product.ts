import { InternalServerError } from "../../errors";
import Utils from "../../utils";
import BaseController from "../BaseControllers";

class Product extends BaseController {
  async creatProduct(data: {
    name: string;
    description: string;
    price: number;
    store_id: number;
    category_id: number;
    images: string[];
    variants?: number[];
  }) {
    const slug = Utils.generateSlug(data.name);
    try {
      const [
        rows,
      ]: any = await this.connection!.execute(
        "INSERT INTO products(product_name,slug, description,price,store_id,category_id) VALUES (?,?,?,?,?,?)",
        [
          data.name,
          slug,
          data.description,
          data.price,
          data.store_id,
          data.category_id,
        ]
      );

      const productId = rows.insertId;

      let imagesQuery = "INSERT INTO images(products_id,image) VALUES";
      data.images.map((singleImage, index) => {
        if (index > 0) imagesQuery += ",";
        imagesQuery += `(${productId},"${singleImage}")`;
      });

      await this.connection!.execute(imagesQuery);

      if (data.variants) {
        let variantQuery =
          "INSERT INTO product_variant(products_id,variant_id) VALUES";
        data.variants.map((singleVariant, index) => {
          if (index > 0) variantQuery += ",";
          variantQuery += `(${productId},${singleVariant})`;
        });

        await this.connection!.execute(variantQuery);
      }

      return productId;
    } catch (err) {
      throw new InternalServerError(err);
    }
  }

  private async productImageAndVariants(
    productRowsData: {
      product_id: number;
    }[]
  ) {
    const dataWithImagesAndVariants = productRowsData.map(
      async (singleData: { product_id: number }) => {
        const [
          images,
        ] = await this.connection!.execute(
          "select image from images where products_id=?",
          [singleData.product_id]
        );

        const [variants] = await this.connection!.execute(
          `select variant.name as variant_name from variant inner join product_variant on variant.id=product_variant.variant_id and product_variant.products_id=${singleData.product_id}`
        );
        //@ts-ignore
        return { ...singleData, images, variants };
      }
    );
    const data = await Promise.all(dataWithImagesAndVariants);
    return data;
  }

  async retrieveAllProducts() {
    try {
      const [rows]: any = await this.connection!.execute(
        "SELECT products.id as product_id,product_name,products.slug as product_slug,products.description as product_description,price, stores.name as store_name, stores.slug as store_slug,category.name as category_name from products left outer JOIN stores on stores.id=products.store_id left outer join category on category.id = products.category_id"
      );

      const data = await this.productImageAndVariants(rows);
      return data;
    } catch (err) {
      throw new InternalServerError(err);
    }
  }

  async retrieveProductByStore(storeId: number) {
    try {
      const [
        rows,
      ]: any = await this.connection!.execute(
        "SELECT products.id as product_id,product_name,products.slug as product_slug,products.description as product_description,price, stores.name as store_name, stores.slug as store_slug,category.name as category_name from products left outer JOIN stores on stores.id=products.store_id left outer join category on category.id = products.category_id where products.store_id=?",
        [storeId]
      );

      const data = await this.productImageAndVariants(rows);
      return data;
    } catch (err) {
      throw new InternalServerError(err);
    }
  }
}

const product = new Product();
export default product;
