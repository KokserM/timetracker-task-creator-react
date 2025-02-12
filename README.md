# Timetracker React Extension

## Overview

The Timetracker React Extension is a Chrome extension that allows users to create Timetracker tasks directly from Jira issues using a React-based UI. The extension integrates with the Timetracker API to manage tasks and log time efficiently.

### Key Features

- Create Timetracker tasks from Jira issues.
- Log time for tasks using a React-based modal.
- Dynamic imports for optimized bundle sizes.
- Uses Webpack for bundling and Babel for transpiling.

## Installation

### Prerequisites

- Node.js and npm installed on your machine.
- Chrome browser.

### Steps

1. **Clone the repository:**
    ```sh
    git clone https://github.com/KokserM/timetracker-react-ext.git
    cd timetracker-react-ext
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Build the project:**
    ```sh
    npm run build
    ```

4. **Load the extension in Chrome:**
    - Open Chrome and navigate to `chrome://extensions/`.
    - Enable "Developer mode" using the toggle in the top right.
    - Click "Load unpacked" and select the `dist` directory from the project.

## Usage

1. Navigate to a Jira issue page that matches the URL pattern specified in the `manifest.json`.
2. The "Create Timetracker Task" button should appear in the Jira toolbar.
3. Click the button to open the React modal and create a task or log time.

### Key Files

- `src/background.js`: Background script for handling API requests and authentication.
- `src/contentScript.js`: Content script injected into Jira pages to add the "Create Timetracker Task" button.
- `src/App.jsx`: Main React component for the extension.
- `src/components/`: Directory containing React components like `LoginModal`, `TimeLogModal`, and `Toast`.
- `webpack.config.js`: Webpack configuration file.
- `manifest.json`: Chrome extension manifest file.

## Configuration

