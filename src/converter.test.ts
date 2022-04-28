import { convert, convertWithoutValidation } from "./converter";
import fs from "fs";
import { OASConfiguration, RAMLConfiguration } from "amf-client-js";

describe("Converter", () => {
    const oas30Client = OASConfiguration.OAS30().baseUnitClient();
    const raml08Client = RAMLConfiguration.RAML08().baseUnitClient();

    const ramlToOas = convert(raml08Client, oas30Client);
    const ramlToOasWithoutValidation = convertWithoutValidation(raml08Client, oas30Client);

    test("should not generate duplicated schemas", async () => {
        const convertedSpecs = await ramlToOas("file://api/raml/api.raml");
    
        const expectedSpecs = fs.readFileSync(`api/expected_specs.yaml`).toString();
    
        expect(convertedSpecs).toStrictEqual(expectedSpecs);
    });
    
    test("should correctly resolve traits", async () => {
        const convertedSpecs = await ramlToOas("file://api/raml/api_with_traits.raml");
    
        const expectedSpecs = fs.readFileSync(`api/expected_specs_with_traits.yaml`).toString();
    
        expect(convertedSpecs).toStrictEqual(expectedSpecs);
    });
    
    test("should correctly resolve traits without validation", async () => {
        const convertedSpecs = await ramlToOasWithoutValidation("file://api/raml/api_with_traits.raml");
    
        const expectedSpecs = fs.readFileSync(`api/expected_specs_with_traits.yaml`).toString();
    
        expect(convertedSpecs).toStrictEqual(expectedSpecs);
    });
});
