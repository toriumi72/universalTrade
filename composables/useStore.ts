import {
  doc,
  collection,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  FieldValue,
  Timestamp,
  serverTimestamp,
  writeBatch,
  onSnapshot,
  SnapshotListenOptions,
  Firestore
} from "firebase/firestore"
import { LoggedInUser, BookItem } from '@/type'

import { cdate } from "cdate"

export const useStore = () => {
  const {
    collectionRef,
    docRef,
    getDocumentSnapshot,
    getQuerySnapshot,
    voidSetDoc,
    getAddDocRef,
    voidUpdateDoc,
    voidDeleteDoc,
  } = useFireStore()
  const { uploadFile } = useStorage()

  const { $fireStore } = useNuxtApp()
  const db = $fireStore as Firestore

  //global
  const bookList = useState<any>('bookList', () => null)
  const chatList = useState<any>('chatList', () => [])

  //read
  const getProfile = async (loggedInUser:LoggedInUser) => {
    const { uid } = loggedInUser
    // docRef("Users", uid)は、doc(db, "Users", uid)と同じ
    const documentSnapshot = await getDocumentSnapshot(doc(db, "Users", uid))
    const data = documentSnapshot.data()
    if (!data) {
      throw new Error("ドキュメントがないよ！")
    }
    console.log(data)
    return Promise.resolve(data)
  }

  const getBookListRealtime = async () => {
    const bookListCollection = collection(db, "BookList")
    const sortedBookListCollection = query(bookListCollection)
    const onNext = (querySnapshot: any) => {
      console.log("Metadata:", querySnapshot.metadata)
      bookList.value = querySnapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      }))
    }
  
    const onError = (error: Error) => {
      console.error("Error fetching data:", error)
    }

    const options: SnapshotListenOptions = { includeMetadataChanges: true }
    
    onSnapshot(sortedBookListCollection, options, onNext, onError)
  }

  const getChatListRealtime = (chatList: Ref<any[]>) => {
    const chatListCollection = collection(db, "ChatList")
    const sortedChatListCollection = query(chatListCollection, orderBy("updatedAt", "desc"))
    const onNext = (querySnapshot: any) => {
      console.log("Metadata:", querySnapshot.metadata)
      chatList.value = querySnapshot.docs.map((doc: any) => ({
        ...doc.data(),
      }))
    }
  
    const onError = (error: Error) => {
      console.error("Error fetching data:", error)
    }

    const options: SnapshotListenOptions = { includeMetadataChanges: true }
    
    onSnapshot(sortedChatListCollection, options, onNext, onError)
  }

  //create
  const addProfile = async (loggedInUser:LoggedInUser, data:any) => {
    const { uid } = loggedInUser
    const { avatarURL, ...otherData } = data

    // Upload the file to Firebase Storage and get the URL
    const fileUrl = await uploadFile(avatarURL)

    await voidSetDoc(docRef("Users", uid), {
      uid,
      avatarURL: fileUrl,
      ...otherData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }).catch((e: Error) => Promise.reject(e))

    return Promise.resolve()
  }

  const addBookItem = async (loggedInUser:LoggedInUser, data:any) => {
    const { uid } = loggedInUser
    const { seller, imageURL, ...otherData } = data

    const fileUrl = await uploadFile(imageURL)

    const bookListCollection = collection(db, "BookList")
    const bookListRef = await getAddDocRef(bookListCollection, {
      sellerId:uid,
      imageURL: fileUrl,
      ...otherData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }).catch((e: Error) => Promise.reject(e))
    return Promise.resolve(bookListRef)
  }

  const addChatItem = async (data:object) => {
    const chatListCollection = collection(db, "ChatList")
    const chatListRef = await getAddDocRef(chatListCollection, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }).catch((e: Error) => Promise.reject(e))
    return Promise.resolve(chatListRef)
  }

  //update
  const updateProfile = async (loggedInUser:any, data:object) => {
    const { uid } = loggedInUser
    await voidUpdateDoc(docRef("Users", uid), {
      ...data,
      updatedAt: serverTimestamp(),
    }).catch((e: Error) => Promise.reject(e))
    return Promise.resolve()
  }
  
  const updateBookItem = async (bookItemId:any, data:object) => {
    await voidUpdateDoc(docRef("BookList", bookItemId), {
      ...data,
      updatedAt: serverTimestamp(),
    }).catch((e: Error) => Promise.reject(e))
    return Promise.resolve()
  }

    //delete
  const deleteBookItem = async (data:object) => {
      // const { uid } = loggedInUser
  }

  return {
    //global 
    bookList,
    chatList,
    //Profile
    getProfile,
    addProfile,
    updateProfile,
    //BookList
    getBookListRealtime,
    addBookItem,
    updateBookItem,
    deleteBookItem,
    //ChatList
    getChatListRealtime,
    addChatItem,
  }
}