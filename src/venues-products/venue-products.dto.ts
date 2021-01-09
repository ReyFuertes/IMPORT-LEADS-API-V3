import { Venue } from "src/venues/venues.entity";
import { Product } from "src/products/products.entity";

export class VenueProductsDto {
  id?: string;
  venue?: Venue;
  product?: Product;
  venue_id?: string;
} 