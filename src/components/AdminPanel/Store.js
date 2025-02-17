import { createSlice, configureStore } from "@reduxjs/toolkit";

// استيراد النصوص الخاصة بكل صفحة
import enAdminDashboard from "../Localization/enPages/enAdminDashboard";
import enBrands from "../Localization/enPages/enBrands";
import enCategories from "../Localization/enPages/enCategories";
import enHome from "../Localization/enPages/enHome";
import enLogin from "../Localization/enPages/enLogin";
import enProducts from "../Localization/enPages/enProducts";
import enRegister from "../Localization/enPages/enRegister";
import enWishlist from "../Localization/enPages/enWishlist";

import arAdminDashboard from "../Localization/arPages/arAdminDashboard";
import arBrands from "../Localization/arPages/arBrands";
import arCategories from "../Localization/arPages/arCategories";
import arHome from "../Localization/arPages/arHome";
import arLogin from "../Localization/arPages/arLogin";
import arProducts from "../Localization/arPages/arProducts";
import arRegister from "../Localization/arPages/arRegister";
import arWishlist from "../Localization/arPages/arWhishlist";

// الحالة الأولية للـ Redux
const initialState = {
  lang: "En",  // اللغة الافتراضية هي الإنجليزية
  content: {
    En: {
      adminDashboard: enAdminDashboard,
      brands: enBrands,
      categories: enCategories,
      home: enHome,
      login: enLogin,
      products: enProducts,
      register: enRegister,
      wishlist: enWishlist,
    },
    Ar: {
      adminDashboard: arAdminDashboard,
      brands: arBrands,
      categories: arCategories,
      home: arHome,
      login: arLogin,
      products: arProducts,
      register: arRegister,
      wishlist: arWishlist,
    }
  }
};

// الـ Slice الخاص باللغة
const languageSlice = createSlice({
  name: "handleLang",
  initialState,
  reducers: {
    toggleLanguage: (state) => {
      // التبديل بين اللغة الإنجليزية والعربية
      if (state.lang === "En") {
        state.lang = "Ar";  // تغيير اللغة إلى العربية
      } else {
        state.lang = "En";  // تغيير اللغة إلى الإنجليزية
      }
    }
  }
});

export const { toggleLanguage } = languageSlice.actions;

// إعداد الـ store
const store = configureStore({
  reducer: {
    languageReducer: languageSlice.reducer  // إضافة الـ reducer للـ language
  }
});

export default store;
