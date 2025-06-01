import { TrackingData } from './types';

const DEFAULT_SERVER_URL = "http://localhost:5000/api/track";
const IDLE_TIMEOUT = 30000; // 30 seconds
const CHECK_INTERVAL = 1000; // 1 second

export class TrackingUtils {
  static setCookie(name: string, value: string, days = 365, domain?: string): string | undefined {
    const expires = new Date(
      Date.now() + days * 24 * 60 * 60 * 1000
    ).toUTCString();

    // Build cookie string conditionally based on domain availability and validity
    let cookieString = `${name}=${value}; expires=${expires}; path=/`;

    // Only add domain if it's provided and valid
    if (domain && domain.trim() !== "") {
      // Handle localhost and IP addresses
      if (
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        /^\d+\.\d+\.\d+\.\d+$/.test(window.location.hostname)
      ) {
        // For localhost/IP, don't set domain attribute
        console.warn("Domain attribute not set for localhost/IP address");
      } else {
        // For regular domains, ensure domain starts with a dot for subdomain support
        const domainValue = domain.startsWith(".") ? domain : `.${domain}`;
        cookieString += `; domain=${domainValue}`;
      }
    }

    // Add SameSite attribute for better security and compatibility
    cookieString += `; SameSite=Lax`;

    document.cookie = cookieString;

    return TrackingUtils.getCookie(name);
  }

  static getCookie(name: string): string | undefined {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift();
    }
    return undefined;
  }

  static generateId(): string {
    return crypto.randomUUID();
  }

  static isValidProtocol(): boolean {
    return (
      window.location.protocol === "http:" ||
      window.location.protocol === "https:"
    );
  }

  static isDisabled(): boolean {
    return localStorage.getItem("engageTrackDisabled") === "true";
  }
}

export class ActivityTracker {
  private startTime: number;
  private lastActivityTime: number;
  private intervalId: number | null = null;
  private onIdle: (timeSpent: number) => void;
  private onHidden: (timeSpent: number) => void;

  constructor(
    onIdle: (timeSpent: number) => void,
    onHidden: (timeSpent: number) => void
  ) {
    this.startTime = Date.now();
    this.lastActivityTime = this.startTime;
    this.onIdle = onIdle;
    this.onHidden = onHidden;
    
    this.setupEventListeners();
    this.startTracking();
  }

  private setupEventListeners(): void {
    // Activity tracking
    const updateActivity = () => {
      this.lastActivityTime = Date.now();
    };

    document.addEventListener("mousemove", updateActivity);
    document.addEventListener("keydown", updateActivity);
    document.addEventListener("scroll", updateActivity);
    document.addEventListener("click", updateActivity);

    // Visibility change tracking
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.stop();
        this.onHidden(Date.now() - this.startTime);
      } else {
        this.reset();
        this.startTracking();
      }
    });

    // Page unload tracking
    window.addEventListener("pagehide", () => {
      this.stop();
    });
  }

  private checkActivity = (): void => {
    if (document.hidden) {
      this.stop();
      this.onHidden(Date.now() - this.startTime);
    } else {
      const currentTime = Date.now();
      if (currentTime - this.lastActivityTime >= IDLE_TIMEOUT) {
        this.onIdle(currentTime - this.startTime);
        this.stop();
      }
    }
  };

  private startTracking(): void {
    if (!this.intervalId) {
      this.intervalId = window.setInterval(this.checkActivity, CHECK_INTERVAL);
    }
  }

  private stop(): void {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private reset(): void {
    this.startTime = Date.now();
    this.lastActivityTime = this.startTime;
  }

  public destroy(): void {
    this.stop();
  }

  public getTimeSpent(): number {
    return Date.now() - this.startTime;
  }
}
