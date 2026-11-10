# 🏙️ Civic Issue Reporting & Resolution System

A crowdsourced platform that empowers citizens to report civic issues, track complaints, and contribute towards building better communities.

## 📌 Overview

The Civic Issue Reporting & Resolution System is a web-based platform designed to bridge the gap between citizens and local authorities. It provides a centralized space where citizens can report public issues, monitor their resolution status, and promote transparency and accountability in civic administration.

## ✨ Key Features

- **Civic Issue Reporting:** Submit reports about public infrastructure and community-related problems.
- **Issue Tracking:** Monitor the status and progress of reported complaints.
- **Citizen Engagement:** Encourage community participation in identifying and reporting civic problems.
- **Centralized Platform:** Organize civic complaints and facilitate their management.
- **Responsive Interface:** Access the application through a modern, user-friendly interface.

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS, shadcn/ui
- **Backend / Database:** Supabase
- **Form Validation:** Zod, React Hook Form
- **UI Components:** Radix UI
- **Icons:** Lucide React

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Subh-2005/Civic-Issue-Reporting-System.git
cd Civic-Issue-Reporting-System
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory and configure the required Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

## 📂 Project Structure

```text
civic-report/
├── public/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── integrations/
│   ├── lib/
│   ├── pages/
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── supabase/
├── package.json
├── vite.config.ts
└── README.md
```

## 🤝 Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Commit and push your changes.
5. Submit a pull request.

## 📄 License

Refer to the repository's license file for licensing information.
