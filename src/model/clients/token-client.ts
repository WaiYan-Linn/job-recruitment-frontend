import axios from "axios";
import {
  AccountInfo,
  RefreshForm,
  SignInForm,
} from "../domains/anonymous.domain";
import { client } from "../utils";

export async function generateToken(form: SignInForm) {
  console.log("Form data being sent to backend:", form);

  return (await client.post<AccountInfo>("/security/signin", form)).data;
}

export async function refreshToken(form: RefreshForm) {
  return (await client.post<AccountInfo>("/security/refresh", form)).data;
}
