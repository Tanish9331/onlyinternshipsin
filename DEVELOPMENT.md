# Development Guide

## Anti-Cheating System

The application includes an anti-cheating system that is **automatically disabled in development mode**.

### Development Mode Features

1. **Console Access**: Full console access is available in development
2. **Right-Click**: Right-click context menu is **always enabled** (no restrictions)
3. **Keyboard Shortcuts**: All keyboard shortcuts work normally
4. **Dev Tools**: Browser developer tools are accessible

### Visual Indicators

- **DEV MODE** badge appears in the top-right corner
- **DEV MODE** indicator in test interface header
- **Dev Tools** button in bottom-right corner (blue gear icon)

### Testing Anti-Cheating Features

1. **Dev Tools Panel**: Click the blue gear icon in bottom-right corner
2. **Toggle Anti-Cheating**: Use the toggle button to enable/disable anti-cheating for testing
3. **Test Features**: When enabled, test:
   - Right-click blocking
   - Keyboard shortcut blocking
   - Tab switching detection
   - Inactivity monitoring

### Production Mode

In production (`NODE_ENV=production`):
- All anti-cheating features are automatically enabled
- Console access is restricted
- Right-click is disabled
- Keyboard shortcuts are blocked
- Tab switching is monitored
- Inactivity is tracked

### Environment Variables

```bash
# Development (anti-cheating disabled)
NODE_ENV=development

# Production (anti-cheating enabled)
NODE_ENV=production
```

### Manual Override

For testing specific scenarios, you can manually enable anti-cheating in development:

```javascript
// In browser console
import AntiCheatingSystem from './src/utils/antiCheating.js';
const antiCheating = new AntiCheatingSystem();
antiCheating.init(() => console.log('Warning!'), () => console.log('Auto-submit'));
```

### Network Error Solutions

If you encounter Firebase network errors:

1. **Check Environment**: Ensure `.env` file is properly configured
2. **Network Connectivity**: Verify internet connection
3. **Firebase Console**: Check Firebase project settings
4. **Browser Cache**: Clear browser cache and cookies
5. **Different Network**: Try different network connection

### Quick Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Test anti-cheating features
# 1. Start dev server
# 2. Open Dev Tools panel
# 3. Toggle anti-cheating on/off
# 4. Test right-click, console, keyboard shortcuts
```

### Troubleshooting

**Console/Right-click still disabled?**
- Check if you're in development mode (`NODE_ENV=development`)
- Look for "DEV MODE" indicators
- Use Dev Tools panel to manually disable

**DevTools not showing up?**
1. Check browser console for DevTools messages
2. Look for blue gear icon in bottom-right corner
3. Try `window.testDevTools()` in console
4. Check if "DevTools Available" indicator shows in bottom-left
5. Verify `NODE_ENV=development` in environment
6. **Right-click is always allowed** - no restrictions in any mode

**Firebase network errors?**
- Check `.env` file configuration
- Verify Firebase project settings
- Test network connectivity
- Try different browser/network

**Anti-cheating not working in production?**
- Ensure `NODE_ENV=production`
- Check if all event listeners are properly attached
- Verify warning system is functioning

### DevTools Testing

**Manual Testing:**
```javascript
// In browser console
window.testDevTools()  // Opens DevTools panel
window.devToolsComponent.getState()  // Get current state
window.devToolsComponent.toggle()  // Toggle panel
window.devToolsComponent.enableAntiCheating()  // Enable anti-cheating
window.devToolsComponent.disableAntiCheating()  // Disable anti-cheating
```

**Visual Indicators:**
- Blue gear icon (bottom-right) - DevTools toggle
- Green "DevTools Available" (bottom-left) - Fallback indicator
- Yellow "DEV MODE" (top-right) - Development mode active
- "DEV MODE" in test interface header
- **Right-click test area** in DevTools panel

**Expected Console Messages:**
```
🔧 DevTools: Component mounted in development mode
🔧 DevTools: NODE_ENV = development
🔧 DevTools: Component should be visible now
🔧 DevTools: Look for blue gear icon in bottom-right corner
🔧 DevTools: Available globally as window.devToolsComponent
🔧 DevTools: Test with window.testDevTools()
```