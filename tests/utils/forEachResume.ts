import { Page } from "@playwright/test";
import path from "path";
import loadResume from "./loadResume";

const sampleDir = path.dirname + '../sample';
const samples = [
    `${sampleDir}/juniorEngineer.json`,
    `${sampleDir}/misformattedResume.json`,
    `${sampleDir}/missingData.json`,
    `${sampleDir}/seniorEngineer.json`,
];

export default async function forEachResume(page: Page, callback: (page: Page) => unknown){
    samples.forEach(async (path) => {
        loadResume(path, page);
        callback(page);
    })
}