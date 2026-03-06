import List "mo:core/List";
import Text "mo:core/Text";

actor {
  type ShopInfo = {
    name : Text;
    tagline : Text;
    address : Text;
    phone : Text;
    whatsapp : Text;
    timings : Text;
  };

  type ProductCategory = {
    name : Text;
    description : Text;
    exampleItems : [Text];
  };

  type Review = {
    reviewerName : Text;
    rating : Nat8;
    reviewText : Text;
    date : Text;
  };

  type GalleryItem = {
    caption : Text;
  };

  let shopInfo : ShopInfo = {
    name = "Hari Om Stationary Store";
    tagline = "Your one-stop shop for stationery and gifts";
    address = "Main Market, Near Jain Temple, Singrauli, India";
    phone = "9644094256";
    whatsapp = "9644094256";
    timings = "Mon - Sat: 9am - 8pm, Sun: 10am - 4pm";
  };

  let productCategories = List.fromArray<ProductCategory>([
    {
      name = "Stationery";
      description = "Wide range of stationery items for students and professionals.";
      exampleItems = ["Notebooks", "Pens", "Pencils", "Markers", "Files", "Folders"];
    },
    {
      name = "Gifts";
      description = "Unique gift items for all occasions.";
      exampleItems = ["Greeting Cards", "Decorative Items", "Photo Frames", "Mugs"];
    },
    {
      name = "School Supplies";
      description = "Everything students need for school.";
      exampleItems = ["School Bags", "Water Bottles", "Lunch Boxes", "Geometry Boxes"];
    },
  ]);

  let reviews = List.fromArray<Review>([
    {
      reviewerName = "Rahul Sharma";
      rating = 5;
      reviewText = "Great variety of products and excellent service!";
      date = "2024-05-10";
    },
    {
      reviewerName = "Priya Jain";
      rating = 4;
      reviewText = "Found everything I needed for my kids' school. Highly recommended!";
      date = "2024-04-22";
    },
    {
      reviewerName = "Amit Patel";
      rating = 5;
      reviewText = "Best stationery store in town. Friendly staff!";
      date = "2024-03-15";
    },
  ]);

  let galleryItems = List.fromArray<GalleryItem>([
    { caption = "Store Front" },
    { caption = "Gift Section" },
    { caption = "Stationery Display" },
    { caption = "School Supplies Section" },
  ]);

  public query ({ caller }) func getShopInfo() : async ShopInfo {
    shopInfo;
  };

  public query ({ caller }) func getProductCategories() : async [ProductCategory] {
    productCategories.toArray();
  };

  public query ({ caller }) func getReviews() : async [Review] {
    reviews.toArray();
  };

  public query ({ caller }) func getGalleryItems() : async [GalleryItem] {
    galleryItems.toArray();
  };
};
