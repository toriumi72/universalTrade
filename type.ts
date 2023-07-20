export interface LoggedInUser {
  uid: string;
  displayName: string | null;
  photoURL: string | null;
}

export interface UserProfile {
  uid: string;
  displayName: string | null;
  avatarURL: string | null;
  university?: string | null;
  faculty?: string | null;
  selfIntroduction?: string | null;
  // createdAt: FirebaseFirestore.Timestamp;
  // updatedAt: FirebaseFirestore.Timestamp;
}

export interface BookItem {
  // id: string;
  name: string;
  condition: string;
  description: string;
  price: number;
  imageURL: string;
  sellerId: string;
  // createdAt: FirebaseFirestore.Timestamp;
  // updatedAt: FirebaseFirestore.Timestamp;
  buyerId: string;
  isDelivered: boolean;
  isPurchased: boolean;
  negotiable: boolean;
  transport: string;
  sold: boolean;
  tags: string[];
  usedClass: string;
}

