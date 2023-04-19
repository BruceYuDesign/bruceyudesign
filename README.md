# BRUCE YU DESIGN


## 使用技術：
- Nuxt3
- Vue3
- tailwindcss
- Firebase Firestore
- Firebase Storage
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

## 待優化項目：
- [x] 使用 storage 存放圖片，目前使用 base64 存在 firestore
- [x] 各行動裝置及瀏覽器的 css 相容性處理
- [x] 針對不同的錯誤，進行相對應的處理，目前所有錯誤都會導向至error page
- [x] 新增`<Popup/>`
- [x] 新增`<Confirm/>`
- [ ] 前台首頁新增`<h1></h1>`標籤
- [ ] 前台首頁新增`particles.js`效果
- [ ] 前端不會顯示`statusMessage`，待尋找解決方案
- [ ] 前台程式碼模組化、優化
- [ ] 更多專案頁面的頁碼防呆（沒有 query 時要防呆）
- [ ] email 改為後端發送，目前前端 email 套件暴露 key


## 待評估項目：
- [ ] 各頁面`<Modal/>`由`~/components`移至`~/pages`
- [ ] `<Modal/>`帶 param 請求
- [ ] `<Table/>`帶 query 分頁請求
- [ ] `entry.js` chunk 分割、優化


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