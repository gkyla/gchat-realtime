import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";
import { useStore } from "vuex";

const firebaseConfig = {
  apiKey: "AIzaSyCqmXDRJvg1BHD5v4HpkoZk_g92mmrEomY",
  authDomain: "gkychat-realtime-vue.firebaseapp.com",
  projectId: "gkychat-realtime-vue",
  storageBucket: "gkychat-realtime-vue.appspot.com",
  messagingSenderId: "9196215722",
  appId: "1:9196215722:web:bfcec280a4162b84c95fd3",
  measurementId: "G-50EMZK5HS3"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();
const chats = db.collection("chats");

export function realtimeListener() {
  const store = useStore();
  auth.onAuthStateChanged(user => {
    console.log("from state user");

    store.commit("auth/stateChange", user);
  });

  chats.orderBy("date", "asc").onSnapshot(snapshot => {
    console.log("from chat Ref");
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

export function useChat() {
  const sendChat = async (uid, payload) => {
    await chats.doc().set({
      userUid: uid,
      name: payload.name,
      photoURL: payload.photoURL,
      date: timestamp,
      text: payload.text
    });
  };

  const deleteChat = async id => {
    await chats.doc(id).delete();
  };

  return { sendChat, deleteChat };
}

export function useAuth() {
  const loginUser = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
  };

  const logoutUser = async () => {
    await auth.signOut();
  };

  return { loginUser, logoutUser };
}
