import {
  ref as storageRef, 
  uploadBytes, 
  getDownloadURL,
} from "firebase/storage"

export const useStorage = () => {
  const { $fireStorage } = useNuxtApp()

  const storage = $fireStorage as any

  const uploadFile = async (file: File) => {
    const storageReference = storageRef(storage, 'images/' + file.name)

    await uploadBytes(storageReference, file)

    const avatarURL = await getDownloadURL(storageReference)

    return avatarURL
  }

  return {
    uploadFile
  }
}
