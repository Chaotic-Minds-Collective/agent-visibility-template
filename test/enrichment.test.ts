import { describe, it, expect } from "vitest";
import { trimContent } from "../src/enrichment";

describe("trimContent", () => {
	it("removes script, style, svg, and comment blocks while preserving visible text", () => {
		expect(trimContent("before<script>alert(1)</script><style>hidden</style><svg>hidden</svg><!-- hidden -->after")).toBe("beforeafter");
	});

	it("handles script end tags with whitespace", () => {
		expect(trimContent("visible<script>hidden</script >after")).toBe("visibleafter");
	});

	it("handles browser-accepted script end tags with attributes", () => {
		expect(trimContent("visible<script>hidden</script foo='bar'>after")).toBe("visibleafter");
	});

	it("repeats block removal when nested markup recreates a script tag", () => {
		expect(trimContent("<scrip<script>t>is removed</script>t>alert(123)</script>")).toBe("");
	});

	it("drops the remainder after a malformed nested script opening", () => {
		expect(trimContent("<scr<script>ipt>alert(1)</scr</script>ipt>visible")).toBe("");
	});
});
