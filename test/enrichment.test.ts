import { describe, it, expect } from "vitest";
import { trimContent } from "../src/enrichment";

describe("trimContent", () => {
	it("removes script, style, svg, and comment blocks while preserving visible text", () => {
		expect(trimContent("before<script>alert(1)</script><style>hidden</style><svg>hidden</svg><!-- hidden -->after")).toBe("beforeafter");
	});

	it("handles script end tags with whitespace", () => {
		expect(trimContent("visible<script>hidden</script >after")).toBe("visibleafter");
	});

	it("repeats block removal when nested markup recreates a dangerous tag", () => {
		expect(trimContent("<scr<script>ipt>alert(1)</scr</script>ipt>visible")).not.toMatch(/<script\b/i);
	});
});
