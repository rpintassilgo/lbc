import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { Todo } from "../reducers/todo.redux";

// ---------- firebase config ------------

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const todosCollection = collection(db, "todos");

// ---------- firebase functions ------------

export const getTodos = async () => {
  const snapshot = await getDocs(todosCollection);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: new Date(doc.data().createdAt),
    completedAt: doc.data().completedAt ? new Date(doc.data().completedAt) : null,
  })) as Todo[];
};

export const createTodo = async (text: string) => {
  const createdAt = new Date();
  const newDoc = await addDoc(todosCollection, {
    text,
    completedAt: null,
    createdAt: createdAt.toISOString(),
  });
  return { id: newDoc.id, text, completedAt: null, createdAt };
};

export const toggleTodo = async (id: string, completedAt: Date | null) => {
  const todoRef = doc(db, "todos", id);
  await updateDoc(todoRef, { completedAt: completedAt ? completedAt.toISOString() : null });
};

export const deleteTodo = async (id: string) => {
  const todoRef = doc(db, "todos", id);
  await deleteDoc(todoRef);
};

export { db };
