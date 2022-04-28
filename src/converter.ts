import { OASConfiguration, RAMLConfiguration, AMFDocumentResult, AMFValidationReport, AMFResult, PipelineId, AMFBaseUnitClient } from "amf-client-js";

export const convert = (fromClient: AMFBaseUnitClient, toClient: AMFBaseUnitClient) => async (pathToSpecifications: string): Promise<string> => {
    const parseResult: AMFDocumentResult = await fromClient.parseDocument(pathToSpecifications);
    const validationReport: AMFValidationReport = await fromClient.validate(parseResult.document);

    const transformResult: AMFResult = toClient.transform(parseResult.baseUnit, PipelineId.Compatibility);
    const rendered: string = toClient.render(transformResult.baseUnit, "application/yaml");

    return rendered;
}

export const convertWithoutValidation = (fromClient: AMFBaseUnitClient, toClient: AMFBaseUnitClient) => async (pathToSpecifications: string): Promise<string> => {
    const parseResult: AMFDocumentResult = await fromClient.parseDocument(pathToSpecifications);

    const transformResult: AMFResult = toClient.transform(parseResult.baseUnit, PipelineId.Compatibility);
    const rendered: string = toClient.render(transformResult.baseUnit, "application/yaml");

    return rendered;
}