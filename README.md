# Employee Management System


A comprehensive employee management platform for tracking workflow, salaries, and HR operations.

## 🔗 Live Site
((https://sync-force-bd.web.app/))

## 🔑 Admin Access
- **Email**: admin@syncforce.com
- **Password**: Aa123456@

## 🚀 Key Features

- **Role-based authentication** (Admin, HR, Employee) with JWT verification
- **Work tracking system** for employees to log daily tasks
- **HR dashboard** for employee verification and payment processing
- **Admin panel** with employee management and payroll approval
- **Payment gateway integration** for salary disbursement
- **Data visualization** with interactive charts
- **Responsive design** for all device sizes
- **Image upload** for employee profiles
- **Real-time updates** with TanStack Query
- **Secure API endpoints** with middleware protection

## 📋 Technical Specifications

### Frontend
- React.js with Vite
- Tailwind CSS with Flowbite components
- TanStack Query for data fetching
- React Hook Form for form management
- Chart.js for data visualization
- React Date Picker
- SweetAlert2 for notifications

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- Firebase Authentication
- Payment gateway integration
- Image upload via ImgBB API

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/employee-management-client.git
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your Firebase and other API credentials:
```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_BASE_URL=your_api_url
```

4. Start the development server:
```bash
npm run dev
```

## 📊 Data Flow

1. **Employees** log their daily work in the worksheet
2. **HR** verifies employees and initiates payment requests
3. **Admin** approves payments and manages roles
4. Payment processed via integrated gateway
5. All parties can view relevant data in their dashboards

## 📱 Responsive Design

The application is fully responsive across:
- Mobile (320px - 480px)
- Tablet (481px - 768px)
- Desktop (769px and above)

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

