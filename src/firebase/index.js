import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";
import { useStore } from "vuex";

const store = useStore();
const db = firebase.firestore();
const auth = firebase.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();
const messagesRef = db.collection("messages");

export function realtimeListener() {
  auth.onAuthStateChanged(user => {
    store.commit("auth/stateChange", user);
  });

  messagesRef.onSnapshot(snapshot => {
    const docs = snapshot.docs.map(doc => {
      const data = doc.data();
      data.id = doc.id;

      if (data.date) {
        data.date = data.date.toDate().toDateString();
      }

      return data;
    });

    store.commit("snapshotChat", docs);
  });
}

export function useMessage() {
  const addChat = async (uid, payload) => {
    await messagesRef.doc(uid).add({
      name: payload.name,
      photoURL: payload.photoURL,
      date: timestamp
    });
  };

  const deleteChat = async id => {
    await messagesRef.doc(id).delete();
  };

  return { addChat, deleteChat };
}

export function useAuth() {
  /* Todo : add auth system with google login   */
}
