import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { parse } from "yaml";

const root = path.join(process.cwd(), "content");

function fail(file: string, msg: string): never {
  throw new Error(`\n\n[contenido] Hay un problema en content/${file}\n  → ${msg}\n`);
}

/** Lee un archivo .yaml de /content. */
export function readYaml<T>(file: string): T {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) fail(file, "el archivo no existe");
  try {
    return parse(fs.readFileSync(full, "utf8")) as T;
  } catch (e) {
    return fail(file, `YAML inválido: ${(e as Error).message}`);
  }
}

/** Lee un archivo .md con encabezado (frontmatter) + cuerpo. */
export function readMarkdown<T>(file: string): { data: T; body: string } {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) fail(file, "el archivo no existe");
  try {
    const parsed = matter(fs.readFileSync(full, "utf8"));
    return { data: parsed.data as T, body: parsed.content.trim() };
  } catch (e) {
    return fail(file, `encabezado inválido: ${(e as Error).message}`);
  }
}

export type Entry<T> = { slug: string; data: T; body: string };

/**
 * Lee todos los elementos de una carpeta (un archivo = un elemento).
 * Acepta .yaml (el panel los guarda así; la descripción va en el campo `description`)
 * y .md / .mdx (encabezado + cuerpo).
 * - Ignora archivos que empiezan con "_" o que tienen `draft: true`.
 * - Ordena por el campo `order` (menor primero) y luego por nombre.
 */
export function readCollection<T extends { order?: number | null; draft?: boolean }>(
  dir: string,
  required: (keyof T & string)[] = [],
): Entry<T>[] {
  const full = path.join(root, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => /\.(ya?ml|mdx?)$/.test(f) && !f.startsWith("_"))
    .map((f) => {
      const rel = `${dir}/${f}`;
      let data: T;
      let body = "";
      if (/\.ya?ml$/.test(f)) {
        data = readYaml<T>(rel);
        body = String((data as { description?: unknown }).description ?? "").trim();
      } else {
        ({ data, body } = readMarkdown<T>(rel));
      }
      for (const k of required) {
        if (data[k] == null || data[k] === ("" as unknown)) fail(rel, `falta el campo "${k}"`);
      }
      return { slug: f.replace(/\.(ya?ml|mdx?)$/, ""), data, body };
    })
    .filter((e) => e.data.draft !== true)
    .sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999) || a.slug.localeCompare(b.slug));
}
