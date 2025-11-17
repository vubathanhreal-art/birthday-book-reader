# Birthday Book Reader

## Overview
The Birthday Book Reader is a responsive web application designed to celebrate birthdays in a unique and interactive way. The layout resembles an online book reader, featuring images on the left page and text on the right page. Users can navigate through the pages by swiping or clicking, providing a smooth and engaging user experience.

## Features
- Responsive design that adapts to various screen sizes.
- Interactive page navigation with swipe and click options.
- Smooth animations for page transitions.
- Customizable content through a JSON data file.

## Project Structure
```
birthday-book-reader
├── index.html
├── src
│   ├── styles
│   │   ├── reset.css
│   │   └── main.css
│   ├── scripts
│   │   ├── app.js
│   │   ├── page.js
│   │   └── swipe.js
│   ├── components
│   │   ├── Book.js
│   │   └── PageView.js
│   └── data
│       └── pages.json
├── assets
│   ├── images
│   └── fonts
├── .gitignore
├── package.json
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd birthday-book-reader
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Usage
- Open `index.html` in a web browser to view the application.
- Use swipe gestures or click navigation buttons to turn the pages.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License.