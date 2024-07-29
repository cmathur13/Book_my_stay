# Hotel Booking Application

Welcome to the Hotel Booking application! This full-stack web application is designed to help users find and book accommodations, including hotels, apartments, and villas. Users can input their desired dates, city, and the number of guests to discover available options. The application allows users to select a hotel and, depending on availability, proceed to book their stay.

## Features

### Search and Filter

- **Input Preferences:** Users can input their preferred dates, city, and the number of guests.
- **Dynamic Results:** The application dynamically fetches and displays available accommodations based on user input.

### Hotel Selection

- **Detailed Information:** Users can view detailed information about each hotel, including amenities, pricing, and user reviews.
- **Availability Calendar:** Check the availability of rooms for specific dates.

### Booking Process

- **Secure Booking:** Depending on availability, users can proceed with the booking process, providing necessary details for a secure reservation.
- **Booking Confirmation:** Users receive a confirmation of their booking, including booking details and instructions.

### Admin Dashboard

- **Manage Hotels:** Admins can perform Create, Read, Update, and Delete operations on hotel listings.
- **Manage Users:** Admins can perform CRUD operations on user accounts.
- **Manage Reservations:** Admins can view and manage reservations, including booking details and status.

### Analytics and Statistics

- **Transaction History:** View a detailed history of transactions, including dates and amounts.
- **Revenue Analytics:** Analyze the revenue generated over the past 6 months.
- **User Engagement:** Track user engagement and interactions with the platform.


## Preview the application


**Home Page**

<img width="1265" alt="Screenshot 2023-12-25 at 5 12 26 PM" src="https://github.com/atharvakonge/book-my-stay/assets/73238261/8702d7c6-6a9b-4f18-99e0-beb5b7158418">

---


**Hotel Results**

 <img width="1263" alt="Screenshot 2023-12-25 at 5 12 53 PM" src="https://github.com/atharvakonge/book-my-stay/assets/73238261/e52232a5-8a2e-48bf-bf5e-baa01e418e69">

---


**Single Hotel Detailed Page**

<img width="1225" alt="Screenshot 2023-12-25 at 5 13 15 PM" src="https://github.com/atharvakonge/book-my-stay/assets/73238261/92f4af37-00b9-42e9-a9cf-8db29518e684">

---


**Selecting Rooms**

<img width="1266" alt="Screenshot 2023-12-25 at 5 15 52 PM" src="https://github.com/atharvakonge/book-my-stay/assets/73238261/a8aa5870-c07e-4a09-ac17-d43690c91f26">

---


**Booking Confirmed Notification**

<img width="1262" alt="Screenshot 2023-12-25 at 5 16 03 PM" src="https://github.com/atharvakonge/book-my-stay/assets/73238261/164b6f0f-c9c4-4ed9-aaab-a6912a3200fa">

---

**Admin Dashboard**

<img width="1280" alt="Screenshot 2023-12-25 at 6 16 29 PM" src="https://github.com/atharvakonge/book-my-stay/assets/73238261/944b03d1-dea8-4f74-8651-8a92005239f9">

---

**Admin Dashboard Users Page**

<img width="1267" alt="Screenshot 2023-12-25 at 6 17 05 PM" src="https://github.com/atharvakonge/book-my-stay/assets/73238261/639a62a2-55fb-4324-818b-64f680303f4a">

---

**Admin Dashboard Hotels Page**

<img width="1267" alt="Screenshot 2023-12-25 at 6 17 32 PM" src="https://github.com/atharvakonge/book-my-stay/assets/73238261/11c45478-d677-43a8-b811-822364359ba2">

---

**Admin Dashboard Rooms Page**

<img width="1267" alt="Screenshot 2023-12-25 at 6 17 45 PM" src="https://github.com/atharvakonge/book-my-stay/assets/73238261/ff8774c0-cd8d-4834-bd5d-e9f81c25bf1b">

---


## Technology Used

- **Frontend:**
  - React.js
  - Redux for state management
  - Axios for making requests to the backend
  - CSS for styling

- **Backend:**
  - Node.js
  - Express
  - MongoDB for database storage
  - JSON Web Token (JWT) for authentication and session management

## Setup Instructions

1. **Clone the repository:**
   - `git clone https://github.com/your-username/hotel-booking-app.git`
   - `cd hotel-booking-app`

2. **Install dependencies:**
   - `npm install`

3. **Set up your MongoDB database:**
   - Create a .env file in the server directory.
   - Add your MongoDB connection string:
     - `MONGODB_URI=your-mongodb-connection-string`

4. **Run the application:**
   - `npm start`

5. **Open Application in Browser:**
   - Open your browser and navigate to http://localhost:3000 to use the Hotel Booking application.

## Contributing

Contributions to this project are welcome! Follow the steps below:

1. **Fork the repository on GitHub.**
2. **Create a new branch for your feature or bug fix:**
   - `git checkout -b feature-name`
3. **Make your changes and commit them:**
   - `git commit -m 'Add a new feature'`
4. **Push your changes to your fork:**
   - `git push origin feature-name`
5. **Submit a pull request through GitHub.**

## Issues

If you encounter any issues or have suggestions for improvements, please open an issue on the GitHub repository.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.
