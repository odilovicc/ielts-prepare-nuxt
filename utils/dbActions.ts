import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import useFirebaseClient from '~/composables/useFirebaseClient'

const { db, auth } = useFirebaseClient()

async function getAuthenticatedUser() {
    const user = auth.currentUser
    if (!user) {
        throw new Error('User is not authenticated')
    }
    return user
}

export async function getInfo(fieldPath = '') {
    try {
        const user = await getAuthenticatedUser()
        const userUid = user.uid
        const docRef = doc(db, 'users', userUid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            const data = docSnap.data()
            if (fieldPath) {
                return fieldPath.split('.').reduce((acc, part) => acc && acc[part], data)
            }
            return data
        } else {
            return null
        }
    } catch (error) {
        console.error('Error getting document:', error)
        throw error
    }
}

export async function updateInfo(fieldPath, body, options = { method: 'add' }) {
    try {
        const user = await getAuthenticatedUser()
        const userUid = user.uid
        const docRef = doc(db, 'users', userUid)

        const updateMethod = options.method === 'remove' ? arrayRemove : arrayUnion;

        await updateDoc(docRef, {
            [fieldPath]: updateMethod(body)
        })
        return true
    } catch (error) {
        console.error('Error updating document:', error)
        return false
    }
}
