# React Course Project – Notes Manager

## 🧩 Описание

Това е курсова задача, разработена с React според зададените критерии. Приложението съдържа функционалности за регистрация, вход, навигация и показване на данни чрез REST API. Реализирана е основна логика за автентикация, използвани са хукове, форми и маршрутизация чрез react-router-dom.

## ⚙️ Използвани технологии

- React + Vite
- React Router
- Axios / Fetch API
- TypeScript
- JSON Server
- LocalStorage
- Git + GitHub

## 🚀 Стартиране на проекта

1. Клонирайте:
git clone (https://github.com/PavlinK1/notes_manger-reactjs.git)

2. Инсталирайте:
npm install

3. Стартирайте:
npm run dev

4. Стартирайте JSON Server:
npm run server

## 📁 Основна структура

src/
├── components/ - Login, Register, Navbar
├── pages/ - NotesPage (главна страница)
├── types/ - типове за данни
├── App.tsx - маршрутизация и защита на рути
└── main.tsx

## ✅ Покриване на критериите

- ✅ **Components:** Всички изгледи са в отделни React компоненти
- ✅ **Routing:** Реализирано чрез React Router (`App.tsx`)
- ✅ **Forms:** Контролирани форми за вход и регистрация
- ✅ **Hooks:** Използвани useState, useEffect, useNavigate и др.
- ✅ **REST API:** CRUD заявки към JSON Server
- ✅ **Authentication:** Проверка и съхранение на потребител в LocalStorage
- ✅ **Navigation bar:** Показва линкове според логнат статус
- ✅ **Main page with data:** Бележките се зареждат динамично по потребител

## 🔗 GitHub линк

https://github.com/PavlinK1/notes_manger-reactjs

## 🎓 Автор

Име: Павлин Кърчев  
Факултетен номер: 165кнз
