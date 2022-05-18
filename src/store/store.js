import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  // users data hard coded for DEMO purposes only
  users: [
    {
      id: 1,
      firstname: "Admin",
      lastname: "Demo",
      createddate: 2000,
      username: "Admin@gmail.com",
      sessiontimeout: 90,
      permissions: [
        "View Subscriptions",
        "Create Subscriptions",
        "Delete Subscriptions",
        "Update Subscriptions",
        "View Movies",
        "Create Movies",
        "Delete Movies",
        "Update Movies",
      ],
    },

    {
      id: 2,
      firstname: "User1",
      lastname: "CanViewMovies",
      createddate:"1/1/2022",
      username: "user1@gmail.com",
      sessiontimeout: 90,
      permissions: ["View Movies"],
    },
    {
      id: 3,
      firstname: "User2:",
      lastname: "CanView&CreateMovies",
      createddate: "1/1/2022",
      username: "user2@gmail.com",
      sessiontimeout: 90,
      permissions: ["View Movies", "Create Movies"],
    },
    {
      id: 4,
      firstname: "User3:",
      lastname: "CanView&UpdateMovies",
      createddate: "1/1/2022",
      username: "user3@gmail.com",
      sessiontimeout: 90,
      permissions: ["View Movies", "Update Movies"],
    },
    {
      id: 5,
      firstname: "User4:",
      lastname: "CanView&DeleteMovies",
      createddate: "1/1/2022",
      username: "user4@gmail.com",
      sessiontimeout: 90,
      permissions: ["View Movies", "Delete Movies"],
    },

    {
      id: 6,
      firstname: "User5:",
      lastname: "CanViewSubs",
      createddate: "1/1/2022",
      username: "user5@gmail.com",
      sessiontimeout: 90,
      permissions: ["View Subscriptions"],
    },
    {
      id: 7,
      firstname: "User6:",
      lastname: "CanView&CreateSubs",
      createddate: "1/1/2022",
      username: "user6@gmail.com",
      sessiontimeout: 90,
      permissions: ["View Subscriptions", "Create Subscriptions"],
    },
    {
      id: 8,
      firstname: "User7:",
      lastname: "CanView&UpdateSubs",
      createddate: "1/1/2022",
      username: "user7@gmail.com",
      sessiontimeout: 90,
      permissions: ["View Subscriptions", "Update Subscriptions"],
    },
    {
      id: 9,
      firstname: "User8:",
      lastname: "CanView&DeleteSubs",
      createddate: "1/1/2022",
      username: "user8@gmail.com",
      sessiontimeout: 90,
      permissions: ["View Subscriptions", "Delete Subscriptions"],
      test: 0,
    },
  ],
  user: {},
  movies: [],
  members: [],
  subscriptions: [],
  loadingmembers: false,
  loadingmovies: false,
};

const cinemaSlice = createSlice({
  name: "cinema",
  initialState,
  reducers: {
    GET_MEMBERS(state, action) {
      state.members = action.payload.members;
      state.loadingmembers = false;
    },
    GET_MOVIES(state, action) {
      state.movies = action.payload.movies;
      state.loadingmovies = false;
    },

    ADD_USERS(state, action) {
      state.users = [...state.users, action.payload];
    },
    ADD_MEMBER(state, action) {
      state.members = [...state.members, action.payload];
    },
    ADD_MOVIE(state, action) {
      state.movies = [...state.movies, action.payload];
    },
    ADD_SUBSCRIPTIONS(state, action) {
      let UpdatedSubscription = state.subscriptions;
      let SubsIndex = UpdatedSubscription.findIndex(
        (subscription) => subscription.memberid === action.payload.memberid
      );
      if (SubsIndex === -1) {
        state.subscriptions = [...state.subscriptions, action.payload];
      } else {
        UpdatedSubscription[SubsIndex].movies.push({
          movieid: action.payload.movies[0].movieid,
          date: action.payload.movies[0].date,
        });
        state.subscriptions = UpdatedSubscription;
      }
    },

    DELETE_USER(state, action) {
      state.users = action.payload.users;
    },
    DELETE_MEMBER(state, action) {
      state.members = action.payload.members;
    },
    DELETE_MOVIE(state, action) {
      state.movies = action.payload.movies;
    },
    DELETE_SUBSCRIPTIONS(state, action) {
      state.subscriptions = action.payload.subscriptions;
    },

    EDIT_MEMBER(state, action) {
      let MemberIndex = state.members.findIndex((member) => member.id === action.payload.id);
      let Updatedmembers = state.members;
      Updatedmembers[MemberIndex] = action.payload;
      state.members = Updatedmembers;
    },
    EDIT_MOVIE(state, action) {
      let MovieIndex = state.movies.findIndex((movie) => movie.id === action.payload.id);
      let Updatedmovies = state.movies;
      Updatedmovies[MovieIndex] = action.payload;
      state.movies = Updatedmovies;
    },
    EDIT_USER(state, action) {
      let UserIndex = state.users.findIndex((user) => user.id === action.payload.id);
      let UpdatedUsers = state.users;
      UpdatedUsers[UserIndex] = action.payload;
      state.users = UpdatedUsers;
    },
    EDIT_SUBSCRIPTIONS(state, action) {
      state.subscriptions = action.payload.subscriptions;
    },
    SET_USER(state) {
      const username = sessionStorage.getItem("username");
      const user = state.users.filter((user) => user.username === username);
      state.user = user[0];
    },
    SWITCH_USER(state, action) {
      const USER = state.users.filter((user) => user.username === action.payload);
      state.user = USER[0];
    },
    SET_LOADING(state) {
      state.loadingmembers = true;
      state.loadingmovies = true;
    },
  },
});

const store = configureStore({
  reducer: cinemaSlice.reducer,
});

export const cinemaActions = cinemaSlice.actions;
export default store;
