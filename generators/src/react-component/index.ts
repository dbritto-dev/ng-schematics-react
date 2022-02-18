import * as path from "path";
import {
  Rule,
  SchematicContext,
  Tree,
  MergeStrategy,
  apply,
  url,
  template,
  move,
  mergeWith,
} from "@angular-devkit/schematics";
import { normalize } from "@angular-devkit/core";
import { GenerateComponentFilesConfig, Schema } from "./schema";

const toCapitalCase = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.substring(1);
};

const toPropertyName = (text: string): string => {
  return text
    .replace(/([^a-zA-Z0-9])+(.)?/g, (_, __, chr) =>
      chr ? chr.toUpperCase() : ""
    )
    .replace(/[^a-zA-Z\d]/g, "")
    .replace(/^([A-Z])/, (m) => m.toLowerCase());
};

const toFileName = (text: string): string => {
  return text
    .replace(/([a-z\d])([A-Z])/g, "$1_$2")
    .toLowerCase()
    .replace(/[ _]/g, "-");
};

const toClassName = (text: string): string => {
  return toCapitalCase(toPropertyName(text));
};

const getComponentDirectory = (directory: string, fileName: string) => {
  return normalize(path.join("src", directory, fileName));
};

const getGenerateComponentsFilesConfig = ({
  name,
  directory,
}: Schema): GenerateComponentFilesConfig => {
  const className = toClassName(name);
  const fileName = toFileName(name);
  const componentDirectory = getComponentDirectory(directory, fileName);
  return { componentDirectory, name, className, fileName };
};

const generateComponentFiles = (config: GenerateComponentFilesConfig) => {
  return mergeWith(
    apply(url("./files"), [template(config), move(config.componentDirectory)]),
    MergeStrategy.Default
  );
};

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function reactComponent(options: Schema): Rule {
  return (_host: Tree, _context: SchematicContext) => {
    return generateComponentFiles(getGenerateComponentsFilesConfig(options));
  };
}
