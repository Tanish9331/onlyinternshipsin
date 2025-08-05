// Anti-Cheating Security System - DISABLED
class AntiCheatingSystem {
  constructor() {
    this.warnings = 0;
    this.maxWarnings = 3;
    this.inactivityTimeout = 10000; // 10 seconds
    this.lastActivity = Date.now();
    this.inactivityTimer = null;
    this.isActive = false;
    this.onWarning = null;
    this.onAutoSubmit = null;
  }

  // Initialize anti-cheating measures - DISABLED
  init(onWarning, onAutoSubmit) {
    console.log('Anti-cheating system DISABLED - all features allowed');
    return;
  }

  // Disable keyboard shortcuts - DISABLED
  disableKeyboardShortcuts() {
    console.log('Keyboard shortcuts allowed');
    return;
  }

  // Get key combination string
  getKeyCombo(e) {
    const parts = [];
    if (e.ctrlKey) parts.push('Ctrl');
    if (e.metaKey) parts.push('Meta');
    if (e.shiftKey) parts.push('Shift');
    if (e.altKey) parts.push('Alt');
    if (e.key !== 'Control' && e.key !== 'Meta' && e.key !== 'Shift' && e.key !== 'Alt') {
      parts.push(e.key);
    }
    return parts.join('+');
  }

  // Disable text selection - DISABLED
  disableTextSelection() {
    console.log('Text selection allowed');
    return;
  }

  // Monitor tab/window switching - DISABLED
  monitorTabSwitching() {
    console.log('Tab switching allowed');
    return;
  }

  // Monitor inactivity - DISABLED
  monitorInactivity() {
    console.log('Inactivity monitoring disabled');
    return;
  }

  // Monitor user activity - DISABLED
  monitorActivity() {
    console.log('Activity monitoring disabled');
    return;
  }

  // Disable developer tools - DISABLED
  disableDevTools() {
    console.log('Developer tools allowed');
    return;
  }

  // Prevent screenshots - DISABLED
  preventScreenshots() {
    console.log('Screenshots allowed');
    return;
  }

  // Add warning and handle consequences - DISABLED
  addWarning(reason) {
    console.log(`Warning ignored: ${reason}`);
    return;
  }

  // Trigger auto-submit - DISABLED
  triggerAutoSubmit() {
    console.log('Auto-submit disabled');
    return;
  }

  // Get current warning count
  getWarnings() {
    return 0;
  }

  // Reset warnings
  resetWarnings() {
    this.warnings = 0;
  }

  // Deactivate anti-cheating
  deactivate() {
    console.log('Anti-cheating system deactivated');
  }

  // Manual override for testing
  static enableForTesting() {
    console.log('Anti-cheating disabled - all features allowed');
    return false;
  }

  static disableForTesting() {
    console.log('Anti-cheating disabled - all features allowed');
    return true;
  }
}

export default AntiCheatingSystem; 