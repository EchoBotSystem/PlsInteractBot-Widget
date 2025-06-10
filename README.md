# Top Commenters Widget for OBS

![Widget Preview](https://github.com/user-attachments/assets/e1f99aaa-6c2b-4ede-800f-619d72187164)



A dynamic, customizable browser source widget for OBS Studio that displays and ranks top commenters in real-time with smooth animations.

## Features ✨

- 🏆 Real-time ranking of top commenters with gold/silver/bronze medals
- 🔼 Visual indicators showing position changes (up/down arrows)
- 💬 Displays comment counts with automatic formatting
- 🎨 Fully customizable CSS for seamless integration with your stream theme
- ⚡ Simulated live updates (can be connected to real API)
- 🖥️ Optimized for OBS Browser Source

## Installation & Setup 🛠️

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [OBS Studio](https://obsproject.com/) (v28 or later)

### Quick Start

1. Clone this repository:

```bash
git clone https://github.com/yourusername/top-commenters-widget.git
cd top-commenters-widget
```

2. Install dependencies:

```bash
 npm install
```

3. Run development server:

```bash
 npm run dev
```

4. In OBS:

- Add a new Browser Source
- Set URL to http://localhost:3000
- Set width to 800 and height to 600
- Check "Custom CSS" option if you want to override styles

### Production Build

```bash
npm run build
```

Serve the `dist` folder using any static file server.

## Customization 🎨

### CSS Styling

You can override any styles directly in OBS Browser Source properties:

```css
/* Example customizations */
.top-commenters-widget {
  background: linear-gradient(to right, #1a1a2e, #16213e) !important;
}

.rank-1 {
  color: #ffd700 !important; /* Gold */
  text-shadow: 0 0 10px #ffd70080 !important;
}

.widget-header {
  background: rgba(10, 10, 35, 0.7) !important;
}
```

## Troubleshooting 🚑

**Widget not updating:**

- Ensure OBS Browser Source refresh is enabled
- Check console for errors (right-click → Inspect in browser source)

**Styling issues:**

- Use `!important` flag when overriding CSS in OBS
- Verify your custom CSS syntax is correct

## Support the Project 💖

If you find this widget useful, consider:

- ⭐ Starring this repository
- 🐛 Reporting issues
- 💡 Suggesting new features
