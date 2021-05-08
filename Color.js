class Color {
	static randomHSL() {
		return {
			"h": Math.random(),
			"s": Math.random() / 2 + 0.5,
			"l": Math.random() / 2 + 0.25
		}
	}
}