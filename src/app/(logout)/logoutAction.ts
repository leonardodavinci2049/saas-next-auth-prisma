"use server";

import { signOut } from "@/auth";


const logoutAction = async () => {
  await signOut();
};

export default logoutAction;