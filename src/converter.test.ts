import { convert } from "./converter";
import fs from "fs";


test("should not generate duplicated schemas", async () => {
    const convertedSpecs = await convert("file://api/raml/api.raml");

    const expectedSpecs = fs.readFileSync(`api/expected_specs.yaml`).toString();

    expect(convertedSpecs).toStrictEqual(expectedSpecs);
});

test("should correctly resolve traits", async () => {
    const convertedSpecs = await convert("file://api/raml/api_with_traits.raml");

    const expectedSpecs = fs.readFileSync(`api/expected_specs_with_traits.yaml`).toString();

    console.log(convertedSpecs)

    expect(convertedSpecs).toStrictEqual(expectedSpecs);
});