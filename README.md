# PricePal Frontend

![License](https://img.shields.io/github/license/decompi/pricepal)
![Issues](https://img.shields.io/github/issues/decompi/pricepal)
![Stars](https://img.shields.io/github/stars/decompi/pricepal?style=social)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
  - [Completed Features](#completed-features)
  - [Upcoming Features](#upcoming-features)
- [Demo](#demo)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

**PricePal** is an open-source, full-stack MERN (MongoDB, Express, React, Node.js) application designed to help users find the best prices for items across various stores. The frontend is built using **React Native** with **Expo Router**, providing a seamless mobile experience, while the backend handles data scraping, database management, and more.

## Features

### Completed Features

- **Browse Items:** View a list of items available for comparison.
- **Add to Cart:** Easily add desired items to your cart(Backend).
- **Price Comparison:** Compare prices of items in your cart across different stores to find the cheapest options(Backend).

### Upcoming Features

- **Real-Time Updates:** Implement live price updates and notifications.
- **Price Comparison:** (Frontend).
- **Add to Cart:** (Frontend)
- **Multi-Language Support:** Expand accessibility by supporting multiple languages.
- **User Authentication:** Secure login and registration for personalized experiences.

## Demo

*Coming Soon!* A live demo of PricePal will be available shortly. Stay tuned!

## Technologies

- **React Native:** For building the mobile frontend.
- **Expo Router:** Simplifies navigation within the app.
- **MongoDB:** Database management.
- **Axios:** Handling HTTP requests.
- **React Native Elements:** UI components.
- **Puppteer:** Web scraping.
## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js:** Installed on your machine. [Download Node.js](https://nodejs.org/)
- **Expo CLI:** Installed globally. You can install it using:
  ```bash
  npm install -g expo-cli
  ```
- **Git:** Installed on your machine. [Download Git](https://git-scm.com/)

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/decompi/pricepal.git
   ```
2. **Navigate to the Project Directory:**
   ```bash
   cd pricepal
   ```
3. **Install Dependencies:**
   ```bash
   npm install
   ```

## Configuration

1. **Backend Setup:**
   
   PricePal Frontend communicates with the backend for data fetching and management. Ensure you have the [PricePal Backend](https://github.com/decompi/pricepal-backend) set up and running.

2. **Environment Variables:**
   
   Create a `.env` file in the root directory and add the following variables:
   ```env
   EXPO_PUBLIC_API_BASE_URL=https://your-backend-url.com/api
   EXPO_PUBLIC_API_KEY="yourapikey:
   ```
   
   Replace `https://your-backend-url.com/api` with the actual URL where your backend is hosted.
   Replace `yourapikey` with the actual API Key you set for your backend.

## Running the Application

Start the Expo development server:

```bash
npx expo start
```

This will open the Expo Dev Tools in your browser. You can run the app on an emulator or your physical device using the Expo Go app.

## Usage

1. **Browse Items:**
   - Open the app to view a list of available items.
2. **Add to Cart:**
   - Select items you wish to purchase and add them to your cart.
3. **Compare Prices:**
   - Navigate to your cart to see price comparisons across different stores.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Repository**
2. **Create a Branch:**
   ```bash
   git checkout -b feature/YourFeature
   ```
3. **Commit Your Changes:**
   ```bash
   git commit -m "Add Your Feature"
   ```
4. **Push to the Branch:**
   ```bash
   git push origin feature/YourFeature
   ```
5. **Open a Pull Request**

Please ensure your code adheres to the project's coding standards and passes all tests.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

- **Project Link:** [https://github.com/decompi/pricepal](https://github.com/decompi/pricepal)
- **Backend Repository:** [PricePal Backend](https://github.com/decompi/pricepal-backend)

---

Happy Shopping with PricePal! 🛒✨