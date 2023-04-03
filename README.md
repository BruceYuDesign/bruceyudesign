# BRUCE YU DESIGN

## 使用技術：
- Nuxt3
- Vue3
- tailwindcss
- Firebase Firestore
- Firebase Functions
- Firebase Hosting

## 專案結構：
```
bruceyudesign
    |__assets
    |__components
    |   |__admin      // 後台組件
    |   |__branded    // 前台組件
    |   |__Welcom.vue // 首次加載組件
    |
    |__composables
    |__layouts
    |   |__admin.vue   // 後台佈局
    |   |__blank.vue   // 空白佈局
    |   |__branded.vue // 前台佈局
    |
    |__middleware // 前端中介 僅後台使用
    |__pages
    |__plugins
    |__public
    |__server
    |   |__api
    |   |__db // firebase firestore
    |   |__middleware
    |
    |__stores // 使用pinia
    |__verify // 前後端共用資料驗證
    |__.firebaserc
    |__.gitignore
    |__.npmrc
    |__app.vue
    |__error.vue
    |__firebase.json
    |__firebaseEnv.js // 上傳firebase functions的環境設定
    |__nuxt.config.ts
    |__package-lock.json
    |__package.json
    |__README.md
    |__tailwind.config.js
    |__tsconfig.json
```

## 待處理、待優化項目：
- [ ] 前台的前端code優化，尚未做完善模組化
- [ ] 撰寫前台文案
- [ ] 上架專案作品
- [x] 使用storage存放圖片，目前使用base64存在firestore
- [ ] 針對不同的錯誤，進行相對應的處理，目前所有錯誤都會導向至error page
- [x] 各行動裝置及瀏覽器的css相容性處理
- [ ] 改用後端套件發送email，目前emailjs暴露key在前端
- [ ] 處理前台SEO

## 前台形象網站
[https://bruceyudesign.com](https://bruceyudesign.com)


## 後台系統
[https://bruceyudesign.com/login/](https://bruceyudesign.com/login/)

目前「訪客」及「高級訪客」權限，未開啟修改內容的權限，僅可修改個人檔案

### 訪客登入
帳號依序為Guest001~Guest010

密碼與帳號相同，例：帳號為Guest001，密碼即為Guest001

可修改帳號密碼測試，但測試完後建議改回原本的帳號與密碼

### 高級訪客登入
若需要觀看更多內容，且不想被互踢，可與我聯絡，我再另外開帳號給您

高級訪客可以額外再看到「帳號權限設定、帳號管理」的頁面

信箱：bruceyudesign2021@gmail.com

## 以前作品
可至我的[Repositories](https://github.com/BruceYuDesign?tab=repositories)觀看