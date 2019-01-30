const converter = require("../src/server/coordinatesConverter");

const LAT_SIZE = 2;
const LNG_SIZE = 3;

test("formatNumber tests latitude", () => {
    expect(converter.formatNumber(1, LAT_SIZE)).toBe("01");
    expect(converter.formatNumber(11, LAT_SIZE)).toBe("11");
    expect(converter.formatNumber(111, LAT_SIZE)).toBe("111");
    expect(converter.formatNumber(1111, LAT_SIZE)).toBe("1111");
})

test("formatNumber tests longitude", () => {
    expect(converter.formatNumber(1, LNG_SIZE)).toBe("001");
    expect(converter.formatNumber(11, LNG_SIZE)).toBe("011");
    expect(converter.formatNumber(111, LNG_SIZE)).toBe("111");
    expect(converter.formatNumber(1111, LNG_SIZE)).toBe("1111");
})

test("formatNumber tests errors param format", () => {
    expect(() => {
	converter.formatNumber(-1, LAT_SIZE)
    }).toThrow("NaN");
    expect(() => {
	converter.formatNumber("str", LAT_SIZE)
    }).toThrow("NaN");
})

test("toFileName tests both pos", () => {
    expect(converter.toFileName(0, 0)).toBe("S90W180");
    expect(converter.toFileName(90, 180)).toBe("N00E000");
    expect(converter.toFileName(180, 360)).toBe("N90E180");
})

test("toFileName errors", () => {
    expect(() => {
	converter.toFileName("str", 1);
    }).toThrow(Error);

    expect(() => {
	converter.toFileName(1, "str");
    }).toThrow(Error);

    expect(() => {
	converter.toFileName("str", "str");
    }).toThrow(Error);
})

test("toFileName tests errors numbers range", () => {
    expect(() => {
	converter.toFileName(380, 380)
    }).toThrow("Out of range");
    expect(() => {
	converter.toFileName(-10, 999)
    }).toThrow("Out of range");
    expect(() => {
	converter.toFileName(200, -1)
    }).toThrow("Out of range");
    expect(() => {
	converter.toFileName(-100, -1)
    }).toThrow("Out of range");
    expect(() => {
	converter.toFileName(4545, 11111)
    }).toThrow("Out of range");
})
