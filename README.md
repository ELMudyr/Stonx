# STONKS | Forex Trading App with AI-based Technical Analysis

This is a web app designed to provide forex trading signals using **AI-based technical analysis**. The app retrieves real-time forex pair data and uses it for analysis to help traders make better trading decisions.

### **Features:**
- **Select Forex Pair:** Choose from a list of the most commonly traded forex pairs like EUR/USD, USD/JPY, GBP/USD, etc.
- **Real-Time Data Fetching:** Retrieve live forex pair data from a reliable API sources.
- **AI-based Technical Analysis:** Analyze the selected forex pair using machine learning model to provide the recommended position.
- **Intuitive User Interface:** Clean, user-friendly interface with easy selection of forex pairs and real-time updates.
- **Data Visualization:** View real-time forex pair data (e.g., price charts) to support trading decisions.

---

### **Tech Stack:**
- **Frontend:** Next.js (React)
- **Styling:** Tailwind CSS
- **Backend/Integration:** API calls to external services for real-time forex data
- **UI Components:** ShadCn
- **AI Model:** Gemini 2.5 API for AI-based analysis

---

### **How it Works:**

1. **Select Forex Pair:**
   The user selects a forex pair from the dropdown menu (e.g., EUR/USD, GBP/JPY).
   
2. **Fetch Forex Data:**
   Upon clicking the **Submit** button, the app fetches real-time data for the selected forex pair from the API.

3. **AI-based Technical Analysis:**
   The app uses AI (powered by Gemini 2.5) to analyze the market and predict the **Take-Profit (TP)** and **Stop-Loss (SL)** levels based on the historical price data of the selected forex pair.

4. **Display Data:**
   The results of the analysis, including the TP/SL levels, are displayed in the app for the user to review.

<!-- --- -->
<!---->
<!-- ### **Screenshots:** -->
<!-- (You can add images of the app in action here.) -->
<!---->
---

### **Contributing:**

1. **Fork the repository.**
2. **Create a new branch** (`git checkout -b feature-name`).
3. **Make your changes.**
4. **Commit your changes** (`git commit -m 'Add feature'`).
5. **Push to the branch** (`git push origin feature-name`).
6. **Create a new Pull Request**.

---

### **License:**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## ToDo

- [x] Add UI elements
- [x] Implement ohlc data API
- [x] Connect Data entry to API
- [x] Implement groq API
- [x] Add cards to home page for previous trades
- [x] Add card details page
- [x] Fix Overflow on toast
- [ ] Reduce Page loading time
- [x] Add trading view chart
- [ ] Add Landing Page
- [x] Add 404 page
- [x] Save card history to local storage
- [ ] Add Animations
- [x] Limit Cards display
- [x] Add Technical Indicator API
- [x] Update LLM to Gemini 2.5
- [ ] Add News API

---

### Disclaimer:

This app was created as a side project for educational purposes only. It is not intended for real-world financial decision-making. The forex data and AI-generated recommendations are provided for informational purposes and should not be relied upon for trading or investment decisions. I am not responsible for any financial losses or damages that may result from using this app. Always do your own research and consult with a financial advisor before making any investment decisions.

