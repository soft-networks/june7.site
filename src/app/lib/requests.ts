import { addDoc, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "./firebase";

const collectionRef = collection(db, "requests");

export const addRequest = async (request: Request) => {
    const docRef = await addDoc(collectionRef, request);
    return docRef.id;
    }


export const sanitizeRequestFromDB = (id: string, request: any) => {
    return {
        id: id,
        from: request.from,
        request: request.request,
        status: request.status,
        timestamp: request.timestamp,
        phoneNumber: request.phoneNumber
    } as Request;
}

export const syncRequests = (requestListCallback: (requestList: Request[]) => void) => {
    const unsub = onSnapshot(collectionRef, (snapshot) => {
        const requestList = snapshot.docs.map((doc) => sanitizeRequestFromDB(doc.id, doc.data()));
        requestListCallback(requestList);
    });
    return () => unsub();
}

export const syncRequestCount = (requestCountCallback: (requestCount: RequestCount) => void) => {
    const unsub = onSnapshot(collectionRef, (snapshot) => {
        const requestCount = snapshot.docs.reduce((acc, doc) => {
            const status = sanitizeRequestFromDB(doc.id, doc.data()).status;
            acc[status as keyof RequestCount]++;
            acc.total++;    
            return acc;
        }, { pending: 0, completed: 0, rejected: 0, working: 0, total: 0 } as RequestCount);
        requestCountCallback(requestCount);
    });
    return () => unsub();
}
export const updateRequestStatus = async (requestId: string, status: Request['status']) => {
    const docRef = doc(collectionRef, requestId);
    await updateDoc(docRef, { status });
}
export const deleteRequest = async (requestId: string) => {
    const docRef = doc(collectionRef, requestId);
    await deleteDoc(docRef);
}