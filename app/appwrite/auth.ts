import { OAuthProvider } from 'appwrite'
import { account } from './client'

export const loginWithGoogle = async () => {
  try {
    account.createOAuth2Session(
      OAuthProvider.Google,
      `${window.location.origin}/`,
      `${window.location.origin}/404`
    )
  } catch (error) {
    console.log('loginWithGoogle: ', error)
  }
}

export const logoutUser = async () => {
  try {
  } catch (error) {
    console.log(error)
  }
}

export const getUser = async () => {
  try {
  } catch (error) {
    console.log(error)
  }
}

export const getGooglePicture = async () => {
  try {
  } catch (error) {
    console.log(error)
  }
}

export const storeUserData = async () => {
  try {
  } catch (error) {
    console.log(error)
  }
}

export const getExistingUser = async () => {
  try {
  } catch (error) {
    console.log(error)
  }
}
