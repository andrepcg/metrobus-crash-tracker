import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const acidentesDirectory = path.join(process.cwd(), 'src/data/acidentes');

export function getAllAcidentes() {
  const fileNames = fs.readdirSync(acidentesDirectory);
  const acidentes = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const fullPath = path.join(acidentesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug: fileName.replace(/\.md$/, ''),
        data: data.data,
        local: data.local,
        titulo: data.titulo,
        fonte: data.fonte,
        descricao: content.trim(),
      };
    })
    .sort((a, b) => new Date(b.data) - new Date(a.data));

  return acidentes;
}

export function getUltimoAcidente() {
  const acidentes = getAllAcidentes();
  return acidentes[0] || null;
}

export function getTotalAcidentes() {
  return getAllAcidentes().length;
}

