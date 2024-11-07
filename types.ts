// types/User.ts


export interface User {
  id: string; // Unique identifier for the user (use string for MongoDB ObjectId)
  name: string; // User's full name
  email: string; // User's email address
  role: "admin" | "expert" | "farmer"; // Role of the user in the system
  image:Image;
  createdAt: Date; // Date when the user was created
  updatedAt: Date; // Date when the user was last updated
}
// id             String    @id @default(auto()) @map("_id") @db.ObjectId
// name           String?
// email          String?   @unique
// emailVerified  DateTime?
// image          Image?
// hashedPassword String?
// role           Role      @default(USER)
// expertise      String?
// availability   String?
// rating         Float?
// price          Float?
// createdAt      DateTime  @default(now())
// updatedAt      DateTime  @updatedAt

// conversationIds String[]       @db.ObjectId
// conversations   Conversation[] @relation("UserConversations", fields: [conversationIds], references: [id])

// // groupAdminOf    Conversation[]  @relation("GroupAdmins",references: [id]) // Backrelation for being admin of group conversations
// seenMessageIds String[]  @db.ObjectId
// seenMessages   Message[] @relation("Seen", fields: [seenMessageIds], references: [id])

// accounts Account[]
// messages Message[]

// notificationTokens String[]

// ExpertApplication   ExpertApplication?
// subscription        Subscription?
// expertConsultations Consultation[]     @relation("ExpertToConsultation")
// farmerConsultations Consultation[]     @relation("FarmerToConsultation")
// }
export interface Image {
  id:string;
  url:string;
}
export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
}
export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
  specifications: Specification[];
}
export interface Specification {
  id: String;
  name: String;
  values: String[];
}
export interface Product {
  id: string;
  name: string;
  detail: string;
  price: number;
  discount: number;
  quantity: number;
  averageRating: number;
  stock: number;
  isFeatured: boolean;
  color: Color;
  Ratings: Rating[];
  category: Category;
  images: Images[];
  sizes: Size[];
  size: Size;
  productSpecification: { name: string; value: string }[];
}
export interface Color {
  id: string;
  name: string;
  value: string;
}
export interface Size {
  id: string;
  name: string;
  value: string;
}
export interface Images {
  id: string;
  url: string;
}
export interface Order {
  id: string;
  orderItems: Orderitem[];
  isPaid: boolean;
  paymentStatus: string;
  orderStatus: string;
  orderTotal: number;
  phone: string;
  address: string;
  createdAt: Date;
}
export interface Orderitem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  product: Product;
}
export interface ProductSpecification {
  id: string;
  productId: string;
  specId: string;
  value: string;
}
export interface Rating {
  id: string;
  productId: string;
  rating: number;
  userEmail: string;
  createdAt: Date;
}
