import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config";
import { IUserForm } from "../models/interfaces/user";
import { api } from "../utils";

const initialState: any = {
  users: [],
};

const name = "users";

export const getUsers = createAsyncThunk(
  `${name}/getUsers`,
  async (page: number) => {
    return api({
      method: "GET",
      url: `${BASE_URL}/${name}?page=${page}`,
    });
  }
);

export const getUser = createAsyncThunk(
  `${name}/getUser`,
  async (userId: number | undefined) => {
    return api({
      method: "GET",
      url: `${BASE_URL}/${name}/${userId}`,
    });
  }
);

export const deleteUser = createAsyncThunk(
  `${name}/deleteUser`,
  async (userId: number | undefined) => {
    return api({
      method: "DELETE",
      url: `${BASE_URL}/${name}/${userId}`,
    });
  }
);

export const editUser = createAsyncThunk(
  `${name}/editUser`,
  async ({ userId, data }: any) => {
    return api({
      method: "POST",
      url: `${BASE_URL}/${name}/${userId}`,
      body: data,
    });
  }
);

export const createUser = createAsyncThunk(
  `${name}/createUser`,
  async (data: IUserForm) => {
    return api({
      method: "POST",
      url: `${BASE_URL}/${name}`,
      body: data,
    });
  }
);

const mentorSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.users = payload;
    });
  },
});

export const selectUsers = (state: any) => state.users.users;

export default mentorSlice.reducer;
