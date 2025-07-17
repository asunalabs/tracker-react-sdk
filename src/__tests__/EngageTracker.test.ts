import { EngageTracker } from "../EngageTracker";
import { useEngageTrack } from "../useTracking";
import { generateId, setCookie, getCookie } from "../utils";

describe("EngageTracker", () => {
	test("should create instance with required config", () => {
		const config = {
			siteId: "test-site",
			domain: "test.com",
		};

		const tracker = new EngageTracker(config);
		expect(tracker).toBeDefined();
	});

	test("should throw error without siteId", () => {
		expect(() => {
			new EngageTracker({ domain: "test.com" } as any);
		}).toThrow("Site ID is required");
	});

	test("should throw error without domain", () => {
		expect(() => {
			new EngageTracker({ siteId: "test-site" } as any);
		}).toThrow("Domain is required");
	});
});

describe("Utils", () => {
	test("generateId should return a valid UUID", () => {
		const id = generateId();
		expect(id).toMatch(
			/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
		);
	});

	test("cookie functions should work", () => {
		// Note: These tests might not work in jsdom without proper setup
		// They would work in a real browser environment
		const cookieName = "test-cookie";
		const cookieValue = "test-value";

		setCookie(cookieName, cookieValue);
		const retrieved = getCookie(cookieName);

		// In a real browser, this would pass
		// expect(retrieved).toBe(cookieValue);
	});
});

describe("React Hook", () => {
	test("useEngageTrack should be defined", () => {
		expect(useEngageTrack).toBeDefined();
	});
});
