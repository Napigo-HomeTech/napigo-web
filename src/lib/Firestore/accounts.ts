import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Account } from "@/types";
import app from "../Firebase";

const db = getFirestore(app);

/**
 *
 * @param path
 * @returns
 */
const getAccount = async (uid: string) => {
  const docRef = doc(db, "accounts", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    data.last_logged_in = new Date(data.last_logged_in).toISOString();
    return data;
  } else {
    return null;
  }
};

/**
 *
 * @param acc
 * @returns
 */
const saveAccount = async (acc: Account) => {
  const docRef = doc(db, "accounts", acc.uid);
  await setDoc(docRef, acc);
};

/**
 *
 * @param acc
 * @returns
 */
const updateAccount = async (uid: string, newEmail: string) => {
  const docRef = doc(db, "accounts", uid);
  await updateDoc(docRef, { email: newEmail });
};

/**
 *
 */
export const accountStore = {
  getAccount,
  saveAccount,
  updateAccount,
};
