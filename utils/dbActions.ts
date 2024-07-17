import { doc, getDoc, updateDoc } from 'firebase/firestore'
import useFirebaseClient from '~/composables/useFirebaseClient'

const { db, auth } = useFirebaseClient()

export async function getInfo(fieldPath: string = '') {
    const user = auth.currentUser
    if (!user) {
        throw new Error('User is not authenticated')
    }

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
}

export async function updateInfo(fieldPath: string, body: any) {
    const user = auth.currentUser
    if (!user) {
        throw new Error('User is not authenticated')
    }

    const userUid = user.uid
    const docRef = doc(db, 'users', userUid)

    try {
        await updateDoc(docRef, {
            [fieldPath]: body
        })
        return true
    } catch (error) {
        console.error('Error updating document:', error)
        return false
    }
}
