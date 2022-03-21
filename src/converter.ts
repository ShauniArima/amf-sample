import { OASConfiguration, RAMLConfiguration, AMFDocumentResult, AMFValidationReport, AMFResult, PipelineId } from "amf-client-js";

export const convert = async (pathToSpecifications: string) => {
    const raml08Client = RAMLConfiguration.RAML08().baseUnitClient();
    const oas30Client = OASConfiguration.OAS30().baseUnitClient();
    
    const parseResult: AMFDocumentResult = await raml08Client.parseDocument(pathToSpecifications);
    const validationReport: AMFValidationReport = await raml08Client.validate(parseResult.document);

    const transformResult: AMFResult = oas30Client.transform(parseResult.baseUnit, PipelineId.Compatibility);
    const rendered: string = oas30Client.render(transformResult.baseUnit, "application/yaml");

    return rendered;
}