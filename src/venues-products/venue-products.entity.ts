
import { BaseEntity, Entity, PrimaryGeneratedColumn, Generated, Column, ManyToOne, JoinColumn } from "typeorm";
import { Venue } from "src/venues/venues.entity";
import { Product } from "src/products/products.entity";

@Entity({synchronize: true })
export class VenueProducts extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @ManyToOne(() => Venue, v => v.venue_products, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'venue_id' })
  venue: Venue;

  @ManyToOne(() => Product, v => v.venue_products, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
