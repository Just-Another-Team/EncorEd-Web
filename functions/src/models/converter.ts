import { PartialWithFieldValue, QueryDocumentSnapshot } from "firebase-admin/firestore";

export const converter = <T>() => ({
    toFirestore: (data: PartialWithFieldValue<T>) => data,
    fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as T
})