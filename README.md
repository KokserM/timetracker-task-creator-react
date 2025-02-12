# Timetracker React Chrome Extension

## Overview

A Chrome extension built with React that enables seamless integration between Jira and Timetracker. This extension allows users to create Timetracker tasks directly from Jira issues and log time against them through a modern React-based interface.

## Features

- One-click task creation from Jira issues
- Integrated time logging with date/time selection
- Project selection and task management
- Auto-detection of existing tasks
- Toast notifications for user feedback
- Secure authentication with Timetracker API
- Real-time validation and error handling

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Google Chrome browser
- Access to Jira and Timetracker systems

## Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/KokserM/timetracker-task-creator-react.git
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
    - Copy manifest.json, images directory and icons directory to dist directory
    - Navigate to chrome://extensions/
    - Enable "Developer mode"
    - Click "Load unpacked"
    - Select the dist directory

## Usage

1. Navigate to any Jira issue page (domain: smjira.sm.ee)
2. Look for the "Create Timetracker Task" button in the toolbar
3. Click to open the task creation modal
4. Select project and enter time details
5. Create task and/or log time
6. Check notifications for operation status

### Key Files

- `src/background.js`: Background script for handling API requests and authentication.
- `src/contentScript.js`: Content script injected into Jira pages to add the "Create Timetracker Task" button.
- `src/App.jsx`: Main React component for the extension.
- `src/components/`: Directory containing React components like `LoginModal`, `TimeLogModal`, and `Toast`.
- `webpack.config.js`: Webpack configuration file.
- `manifest.json`: Chrome extension manifest file.



