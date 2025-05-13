"use server";

import { ID, Query } from "node-appwrite";

import {
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  databases,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";
interface RegisterPageProps {
  params: {
    userid: string;
  };
}

// CREATE APPWRITE USER
export const createUser = async (user: CreateUserParams) => {
  try {
    // Create new user -> https://appwrite.io/docs/references/1.5.x/server-nodejs/users#create
    const newuser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    return parseStringify(newuser);
  } catch (error: any) {
    // Check existing user
    if (error && error?.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);

      return existingUser.users[0];
    }
    console.error("An error occurred while creating a new user:", error);
  }
};

// // GET USER
// export const getUser = async (userId: string) => {
//   try {
//     const user = await users.get(userId);

//     return parseStringify(user);
//   } catch (error) {
//     console.error(
//       "An error occurred while retrieving the user details:",
//       error
//     );
//   }
// };

// REGISTER PATIENT

// export const registerPatient = async ({
//   document,
//   ...patient
// }: RegisterUserParams) => {
//   try {
//     // `document` is assumed to be the uploaded file array
//     const file = document?.[0];

//     if (!(file instanceof Blob)) {
//       throw new Error("Invalid file provided.");
//     }

//     // Upload file to Appwrite Storage
//     const uploadedFile = await storage.createFile(BUCKET_ID!, ID.unique(), file);

//     console.log("Uploaded file:", uploadedFile);

//     // You can now use uploadedFile.$id to associate it with the patient
//     // Submit patient registration with the uploaded file reference
//     // await db.createDocument(...)

//   } catch (error) {
//     console.error("Error in registerPatient:", error);
//     throw error;
//   }
// };

//     // Create new patient document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
//     const newPatient = await databases.createDocument(
//       DATABASE_ID!,
//       PATIENT_COLLECTION_ID!,
//       ID.unique(),
//       {
//         identificationDocumentId: file?.$id ? file.$id : null,
//         identificationDocumentUrl: file?.$id
//           ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
//           : null,
//         ...patient,
//       }
//     );

//     return parseStringify(newPatient);
//   } catch (error) {
//     console.error("An error occurred while creating a new patient:", error);
//   }
// };

// // GET PATIENT
// export const getPatient = async (userId: string) => {
//   try {
//     const patients = await databases.listDocuments(
//       DATABASE_ID!,
//       PATIENT_COLLECTION_ID!,
//       [Query.equal("userId", [userId])]
//     );

//     return parseStringify(patients.documents[0]);
//   } catch (error) {
//     console.error(
//       "An error occurred while retrieving the patient details:",
//       error
//     );
//   }
// };