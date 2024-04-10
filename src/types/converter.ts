import { DocumentData, FirestoreDataConverter, PartialWithFieldValue, QueryDocumentSnapshot } from "firebase/firestore";

export const converter = <T>(): FirestoreDataConverter<T> => ({
    toFirestore: (data: PartialWithFieldValue<T>) => data as DocumentData,
    fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as T
})