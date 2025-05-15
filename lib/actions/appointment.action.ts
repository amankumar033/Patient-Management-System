"use server";

import { ID, Query } from "node-appwrite";

import {
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  databases,
  APPOINTMENT_COLLECTION_ID,
  storage,
  users,
  
} from "../appwrite.config";
import { parseStringify } from "../utils";
interface RegisterPageProps {
  params: {
    userid: string;
  };
}

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
    console.log("Creating appointment with data:", appointment);
  try {
    const response = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );
    return response;
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error;
  }
};