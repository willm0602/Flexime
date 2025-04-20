declare module 'pdf-parse/lib/pdf-parse' {
    interface PDFParseResult {
        text: string;
        numpages: number;
        numrender: number;
        info: Record<string, unknown>;
        metadata: Record<string, unknown>;
        version: string;
    }

    function pdfParse(dataBuffer: Buffer): Promise<PDFParseResult>;

    export default pdfParse;
}
