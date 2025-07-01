# AgriTech Platform

A comprehensive agricultural technology platform that connects farmers, experts, and administrators. It provides crop management tools, expert consultations, smart farming features, and a robust e-commerce system for agricultural products.

## 🌟 Features

### 1. User Management
- Multi-role system (Farmers, Experts, Admins)
- Authentication with Google and Facebook
- Profile management with expertise areas
- Rating and review system

### 2. Expert Consultation
- Real-time video consultations
- Appointment scheduling system
- Expert verification and application process
- Consultation history and tracking
- Payment integration for consultations

### 3. Crop Management
- Crop database with detailed information
- Disease identification and prevention
- Watering schedule management
- Seasonal crop suggestions
- Satellite imagery integration for field monitoring

### 4. E-commerce Platform
- Product catalog with categories and subcategories
- Secure payment processing (Khalti integration)
- Order management system
- Product specifications and ratings
- Shopping cart functionality
- Wishlist and recently viewed items
- Product comparison tools

### 5. Communication Tools
- Real-time chat system (one-to-one and group)
- File and image sharing
- Push notifications
- Video conferencing

### 6. Smart Farming Features
- Field mapping with polygons
- Satellite image analysis (NDVI, crop health)
- Crop health monitoring and alerts
- Automated irrigation alerts
- Weather integration
- Field boundary management
- Soil health and water resource management

### 7. Subscription Management
- Multiple subscription tiers (Basic, Pro, Premium, Family)
- Automated billing and feature access control
- Subscription analytics

### 8. Shipping and Delivery
- Multiple shipping options
- Delivery tracking
- Shipping cost calculation
- Address validation
- Delivery status updates
- Return management

### 9. Customer Support
- Live chat support
- Order assistance
- Product inquiries
- Return and refund processing
- Customer feedback system
- FAQ management

### 10. Admin Features
- Inventory and order management
- Sales analytics and reporting
- Customer management
- Product performance tracking
- Discount and promotion management
- Announcement system

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS, Framer Motion, Radix UI, Lucide Icons
- **Backend**: Flask (Python)
- **Database**: MongoDB (with Prisma ORM)
- **Authentication**: NextAuth.js
- **Real-time Communication**: Pusher
- **Payment Processing**: Khalti
- **Internationalization**: i18next
- **Containerization**: Docker

## 📁 Folder Structure

- `app/` - Main Next.js app folder (App Router)
  - `(auth)/` - Authentication pages and components
  - `(expert)/` - Expert dashboard and features
  - `(protected)/admin/` - Admin dashboard and management features
  - `(users)/` - User-facing features (store, cart, wishlist, field, chats, etc.)
  - `api/` - API routes for all features (auth, products, appointments, chat, etc.)
  - `fonts/` - Custom fonts
  - `payment/` - Payment integration logic
- `components/` - Shared UI components
- `providers/` - Context and providers (auth, toast, modal, theme, etc.)
- `lib/` - Utility libraries (e.g., Agromonitoring integration)
- `public/` - Static assets

## 📚 API Documentation

The API is organized into several key areas:

- `/api/auth` - Authentication endpoints
- `/api/expert` - Expert consultation services
- `/api/products` - E-commerce functionality
- `/api/consultation` - Consultation management
- `/api/payment` - Payment processing
- `/api/satellite-images` - Satellite imagery services
- `/api/polygons` - Field mapping services
- `/api/chats` - Real-time chat and messaging
- `/api/appointments` - Appointment scheduling and management
- `/api/announcements` - Admin announcements

## 🔐 Security

- JWT-based authentication
- Role-based access control
- Secure payment processing
- Data encryption
- Rate limiting
- CORS protection

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- Python 3.11+
- MongoDB
- Docker and Docker Compose

### Installation

1. Clone the repository:
    ```bash
    git clone [repository-url]
    cd agritech
    ```

2. Set up environment variables:
    ```bash
    cp .env.example .env
    # Edit .env with your configuration
    ```

3. Install dependencies:
    ```bash
    # Frontend
    npm install

    # Backend
    cd flask-backend
    pip install -r requirements.txt
    ```

4. Start the development environment:
    ```bash
    # Using Docker
    docker-compose up --build

    # Or run services separately
    # Frontend
    npm run dev

    # Backend
    cd flask-backend
    python app.py
    ```

## 📦 Docker Deployment

The application is containerized using Docker. To deploy:

```bash
# Build and start containers
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop containers
docker-compose down
```

## 🔧 Environment Variables

Required environment variables:

```env
# Database
DATABASE_URL=mongodb://mongodb:27017/agritech

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret

# OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret

# Pusher
PUSHER_APP_ID=your-pusher-app-id
PUSHER_SECRET=your-pusher-secret
NEXT_PUBLIC_PUSHER_KEY=your-pusher-key
NEXT_PUBLIC_PUSHER_CLUSTER=your-pusher-cluster

# Payment (Khalti)
KHALTI_SECRET_KEY=your-khalti-secret-key
KHALTI_MERCHANT_USERNAME=your-username
KHALTI_MERCHANT_EMAIL=your-email
KHALTI_PAYMENT_API=your-payment-api-url

# Email
SMTP_USER=your-smtp-user
SMTP_PASSWORD=your-smtp-password

# Agro API
AGRO_APP_ID=your-agro-app-id
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Bhim Prasad Adhikari - Initial work

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Prisma team for the database toolkit
- All contributors who have helped shape this project
