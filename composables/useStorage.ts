import {
  ref as storageRef, 
  uploadBytes, 
  getDownloadURL,
} from "firebase/storage"

export const useStorage = () => {
  const { $fireStorage } = useNuxtApp()

  const storage = $fireStorage as any

  const uploadFile = async (file: File, path: string) => {
    // Use the 'path' argument to determine the directory
    const storageReference = storageRef(storage, path + '/' + file.name)

    await uploadBytes(storageReference, file)

    const avatarURL = await getDownloadURL(storageReference)

    return avatarURL
  }

  return {
    uploadFile
  }
}
