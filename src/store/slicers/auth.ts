import { IUser } from "./../models/interfaces/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../utils";
import { BASE_URL } from "../../config";

const initialState: any = {
  isAuthenticated: !!localStorage.getItem("token"),
};

const name = "login";

export const loginUser = createAsyncThunk(
  `${name}/login`,
  async (data: IUser) => {
    return api({
      method: "POST",
      url: `${BASE_URL}/login`,
      body: data,
    });
  }
);

const authSlice = createSlice({
  name,
  initialState,
  reducers: {},
});

export const selectUser = (state: any) => state.auth.user;

export default authSlice.reducer;
