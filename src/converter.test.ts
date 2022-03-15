import { convert } from "./converter";
import fs from "fs";


test("should not generate duplicated schemas", async () => {
    const convertedSpecs = await convert("file://api/raml/api.raml");

    const expectedSpecs = fs.readFileSync(`api/expected_specs.yaml`).toString();

    expect(convertedSpecs).toStrictEqual(expectedSpecs);
});