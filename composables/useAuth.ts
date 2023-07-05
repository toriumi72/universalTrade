import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider, 
  signInWithPopup,
  signInWithRedirect,
  Auth
} from 'firebase/auth'
import type { User, IdTokenResult } from "firebase/auth"
import { LoggedInUser } from '@/type'

export const useAuth = () => {

  const { $fireAuth } = useNuxtApp()

  const auth = $fireAuth as Auth

  // const loggedInUser = useState<LoggedInUser | null>('loggedInUser', () => null)
  const loggedInUser = useState<LoggedInUser | null>('loggedInUser', () => null)
  const token = useState<string | null>('token', () => null)
  const userProfile = useState<any | null>('userProfile', () => null)

  // When onAuthStateChanged runs, it will set the loggedInUser and token
  const setFireAuthInCurrentUser = (user:User) => {
    const { uid, displayName, photoURL } = user
    loggedInUser.value = {
      id: uid, 
      displayName, 
      photoURL
    }
    console.log('setFireAuthInCurrentUser')  
  }

  //google login
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider()
    await signInWithRedirect(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken
      // The signed-in user info.
      const user = result
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.customData.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
      // ...
    })
  }
  
  //pass and email login
  const signUp = async (email: string, password: string) => {
    return await new Promise<void>((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          userCredential.user
            .getIdToken()
            .then((idToken) => {
              token.value = idToken
              resolve()
            })
            .catch(reject)
        })
        .catch(reject)
    })
  }

  const signIn = async (email: string, password: string) => {
    return await new Promise<void>((resolve, reject) => {
      return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          userCredential.user
            .getIdToken()
            .then((idToken) => {
              token.value = idToken
              resolve()
            })
            .catch(reject)
        })
        .catch(reject)
    })
  }
  
  const signOut = async () => {
    return await new Promise<void>((resolve, reject) => {
      firebaseSignOut(auth)
        .then(() => {
          token.value = null
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  
  

  return {
    loggedInUser,
    token,
    userProfile,
    setFireAuthInCurrentUser,
    googleLogin,
    signUp,
    signIn,
    signOut,
  }
}
