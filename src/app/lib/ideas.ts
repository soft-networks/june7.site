import { doc, onSnapshot } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "./firebase";

const docRef = doc(db, "admin", "ideas");

const syncIdeas = (ideaListCallback: (ideaList: string[]) => void) => {
    const unsub = onSnapshot(docRef, (snapshot) => {
        const data = snapshot.data();
        const ideaList = data?.ideas ?? [];
        ideaListCallback(ideaList);
    });
    return () => unsub();
}

export { syncIdeas };