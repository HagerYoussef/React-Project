import { createSlice, configureStore } from "@reduxjs/toolkit";

import enAdminDashboard from "../Localization/enPages/enAdminDashboard";
import enCategories from "../Localization/enPages/enCategories";
import enLogin from "../Localization/enPages/enLogin";
import enProducts from "../Localization/enPages/enProducts";
import enRegister from "../Localization/enPages/enRegister";
import enWishlist from "../Localization/enPages/enWishlist";
import enNavbarLogin from "../Localization/enPages/enNavbarLogin";
import enNavbarHome from "../Localization/enPages/enNavbarHome";

import arAdminDashboard from "../Localization/arPages/arAdminDashboard";
import arCategories from "../Localization/arPages/arCategories";
import arLogin from "../Localization/arPages/arLogin";
import arProducts from "../Localization/arPages/arProducts";
import arRegister from "../Localization/arPages/arRegister";
import arWishlist from "../Localization/arPages/arWhishlist";
import arNavbarLogin from "../Localization/arPages/arNavbarLogin";
import arNavbarHome from "../Localization/arPages/arNavbarHome";


const initialState = {
  lang: "En", 
  content: {
    En: {
      adminDashboard: enAdminDashboard,
      categories: enCategories,
      login: enLogin,
      products: enProducts,
      register: enRegister,
      wishlist: enWishlist,
      navbarLogin: enNavbarLogin,
      navbarHome: enNavbarHome,
    },
    Ar: {
      adminDashboard: arAdminDashboard,
      categories: arCategories,
      login: arLogin,
      products: arProducts,
      register: arRegister,
      wishlist: arWishlist,
      navbarLogin: arNavbarLogin,
      navbarHome: arNavbarHome,
    }
  }
};


const languageSlice = createSlice({
  name: "handleLang",
  initialState,
  reducers: {
    toggleLanguage: (state) => {

      if (state.lang === "En") {
        state.lang = "Ar";
      } else {
        state.lang = "En";
      }
    }
  }
});

export const { toggleLanguage } = languageSlice.actions;


const store = configureStore({
  reducer: {
    languageReducer: languageSlice.reducer
  }
});

export default store;

