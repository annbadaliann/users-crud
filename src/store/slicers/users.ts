import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config";
import { api } from "../utils";

const initialState: any = {
  users: [],
};

const name = "users";

export const getUsers = createAsyncThunk(`${name}/getUsers`, async (page) => {
  return api({
    method: "GET",
    url: `${BASE_URL}/${name}?page=${page}`,
  });
});

export const getUser = createAsyncThunk(`${name}/getUser`, async (userId) => {
  return api({
    method: "GET",
    url: `${BASE_URL}/${name}/${userId}`,
  });
});

export const deleteUser = createAsyncThunk(`${name}/deleteUser`, async (userId) => {
  return api({
    method: "DELETE",
    url: `${BASE_URL}/${name}/${userId}`,
  });
});


export const createUser = createAsyncThunk(`${name}/createUser`, async (data) => {
  return api({
    method: "POST",
    url: `${BASE_URL}/${name}`,
    body: data,
  });
});

const mentorSlice = createSlice({
  name,
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.users = payload;
    });
  },
});

export const selectUsers = (state: any) => state.users.users;

export default mentorSlice.reducer;
