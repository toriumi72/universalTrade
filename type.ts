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

