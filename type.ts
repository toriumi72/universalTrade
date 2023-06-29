export interface User {
  id: string;
  displayName: string;
  email: string;
  university: string;
  faculty: string;
  selfIntroduction: string;
  // createdAt: FirebaseFirestore.Timestamp;
  // updatedAt: FirebaseFirestore.Timestamp;
}

export interface Textbook {
  id: string;
  name: string;
  condition: string;
  description: string;
  price: number;
  imageUrl: string;
  sellerId: string;
  // createdAt: FirebaseFirestore.Timestamp;
  // updatedAt: FirebaseFirestore.Timestamp;
  interestedBuyers: number;
  isDelivered: boolean;
  isPurchased: boolean;
  negotiable: boolean;
  shipping: string;
  sold: boolean;
  tags: string[];
  usedClass: string;
}

