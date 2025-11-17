# SaaS Billing & Subscription Management (Angular + .NET Core)

A complete end‑to‑end **SaaS Billing & Subscription Management System** built using:

- **Angular 15+ (NgModules, not standalone)**
- **.NET Core API (Clean Architecture – future integration)**
- **Responsive SaaS UI (Premium dashboard layout)**
- **Modular architecture (Customers, Invoices, Settings, Dashboard)**
- **Reusable shared components (Modal, Buttons, Sidebar, Header)**

This project is designed as a **portfolio‑ready SaaS application**, ideal to showcase on Upwork or during technical interviews.

---

## 🚀 Features

### ✔ Customers Module  
- List customers with pagination, filtering, and search  
- Add new customer  
- Edit existing customers  
- Clean UI modal with form validation  
- Status/plan badges with color coding  
- Mock service with in‑memory data (API ready)

### ✔ Invoices Module  
- List invoices with filtering, pagination  
- Add new invoice  
- Edit invoice (modal)  
- Auto‑generated Invoice Number  
- Auto‑populate Issue & Due dates  
- Plan & Status dropdowns  
- Extendable for PDF, payment, export  

### ✔ Dashboard (Upcoming)
- KPIs (MRR, Active Customers, Churn, Revenue Growth)  
- Charts (Bar, Line, Pie using ng2‑charts)  
- Recent invoices and customer activity  

### ✔ Settings (Upcoming)
- Company info  
- Plans configuration  
- Billing cycle settings  
- Email templates  

---

## 🧱 Architecture

```
/src
│
├── app
│   ├── core
│   │   ├── models
│   │   ├── services
│   │   └── shared components (modal, badge, button)
│   │
│   ├── layout
│   │   ├── header
│   │   ├── sidebar
│   │   └── layout module
│   │
│   ├── modules
│   │   ├── dashboard
│   │   ├── customers
│   │   ├── invoices
│   │   └── settings
│   │
│   ├── app.module.ts
│   ├── app.component.ts
│   └── app-routing.module.ts
│
└── styles.css
```

---

## 🖥 Tech Stack

### **Frontend (Angular 15+)**
- Angular CLI  
- NgModules structure  
- Component‑based UI  
- Custom modal service  
- Shared design system (buttons, cards, tables)  
- Global theme variables  
- Fully responsive layout  

### **Backend (Upcoming)**
- .NET Core 8 Web API  
- Clean Architecture  
- Repository Pattern  
- EF Core + SQL Server  
- JWT Authentication  
- Stripe for payments (future)

---

## 📦 Installation

### 1️⃣ Clone the repo

```bash
git clone https://github.com/yourrepo/saas-billing.git
cd saas-billing
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run application

```bash
ng serve -o
```

---

## 📚 Scripts

| Command            | Description                     |
|-------------------|---------------------------------|
| `ng serve`        | Run dev local server            |
| `ng build`        | Build production files          |
| `ng g c`          | Generate component              |
| `ng g s`          | Generate service                |

---

## 🎨 UI/UX Design System

#### Global colors

| Variable          | Value       |
|------------------|-------------|
| `--border`       | #e5e7eb     |
| `--surface`      | #ffffff     |
| `--surface-alt`  | #f9fafb     |
| `--text`         | #1f2937     |
| `--primary`      | #3b82f6     |

### Buttons
- `.btn`  
- `.btn-primary`  
- `.btn-soft`  
- `.btn-danger`

### Components
- Reusable modal  
- Reusable badge  
- Sidebar + header  
- Table framework  

---

## 🧪 Mock Data (Temporary)

Both **Customers** and **Invoices** modules use in‑memory data via Angular services.  
These services are API‑ready and can easily be swapped with HttpClient calls.

---

## 🔌 Future Backend Integration (Planned)

### **API Endpoints**
```
GET    /api/customers
POST   /api/customers
PUT    /api/customers/{id}
DELETE /api/customers/{id}

GET    /api/invoices
POST   /api/invoices
PUT    /api/invoices/{id}
DELETE /api/invoices/{id}
```

### **Authentication**
- JWT  
- Refresh tokens  
- Role-based access  

### **Billing**
- Stripe / Razorpay  
- Subscription plans  
- Webhooks  

---

## 🤝 Contributing

Pull requests are welcome!  
If you want to add new modules (Payments, Subscriptions, Reports), feel free to submit a PR.

---

## 📄 License
Reachout to Author (https://www.linkedin.com/in/iamviru/)

---

## ⭐ Author

**Virender Thakur**  
Full‑Stack Developer • .NET Core • Angular  
**UpWork**: https://upwork.com/freelancers/iamviru

