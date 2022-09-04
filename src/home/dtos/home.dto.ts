import { PropertyType } from "@prisma/client";
import { Exclude, Expose } from "class-transformer";


// DTOs ===============================================
export class HomeResponseDto {
  constructor(partial: Partial<HomeResponseDto>) {
    Object.assign(this, partial);
  }

  id: number;
  address: string;
  city: string;
  price: number;
  propertyType: PropertyType;

  @Exclude()
  number_of_bedrooms: number;
  @Expose({ name: "numberOfBedrooms" })
  pascalBedroomNum() {
    return this.number_of_bedrooms;
  }

  @Exclude()
  number_of_bathrooms: number;
  @Expose({ name: "numberOfBathRooms" })
  pascalBathroomNum() {
    return this.number_of_bathrooms;
  }

  @Exclude()
  listed_date: Date;
  @Expose({ name: "listedDate" })
  pascalListedDate() {
    return this.listed_date;
  }

  @Exclude()
  land_size: number;
  @Expose({ name: "landSize" })
  pascalLandSize() {
    return this.land_size;
  }

  @Exclude()
  realtor_id: number;
  @Expose({ name: "realtorId" })
  pascalRealtorId() {
    return this.realtor_id;
  }

  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;
}

export class UpdateHomeRequestDto{
  
}

export class CreateHomeRequestDto{}

//=====================================================

// Query intrerfaces ==================================
export interface SearchHomeQuery{

}
//=====================================================
