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

test("formatNumber tests errors", () => {
    expect(() => {
	converter.formatNumber(-1, LAT_SIZE)
    }).toThrow(Error);
    expect(() => {
	converter.formatNumber("str", LAT_SIZE)
    }).toThrow(Error);
})

test("toFileName tests both pos", () => {
    expect(converter.toFileName(1, 1)).toBe("N01E001");
    expect(converter.toFileName(11, 11)).toBe("N11E011");
    expect(converter.toFileName(111, 111)).toBe("N111E111");
    expect(converter.toFileName(1111, 1111)).toBe("N1111E1111");
})

test("toFileName tests lat neg lng pos", () => {
    expect(converter.toFileName(-1, 1)).toBe("S01E001");
    expect(converter.toFileName(-11, 11)).toBe("S11E011");
    expect(converter.toFileName(-111, 111)).toBe("S111E111");
    expect(converter.toFileName(-1111, 1111)).toBe("S1111E1111");
})

test("toFileName tests lat pos lng neg", () => {
    expect(converter.toFileName(1, -1)).toBe("N01W001");
    expect(converter.toFileName(11, -11)).toBe("N11W011");
    expect(converter.toFileName(111, -111)).toBe("N111W111");
    expect(converter.toFileName(1111, -1111)).toBe("N1111W1111");
})

test("toFileName tests both neg", () => {
    expect(converter.toFileName(-1, -1)).toBe("S01W001");
    expect(converter.toFileName(-11, -11)).toBe("S11W011");
    expect(converter.toFileName(-111, -111)).toBe("S111W111");
    expect(converter.toFileName(-1111, -1111)).toBe("S1111W1111");
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
