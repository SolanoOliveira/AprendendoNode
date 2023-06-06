import { Prof, Techno } from './helpersTypes';

export function listProfs(profs: Prof[]) {
  const list = profs.map((p) => `<li>${p.nome} ${p.sala}</li>`);
  return `<ul>${list.join('')}</ul>`;
}

export function listTechno(technos: Array<Techno>) {
  const listT = technos.filter((t) => t.poweredByNodejs).map((t) => `<li>${t.name} ${t.type}</li>`);
  return `<ul>${listT.join('')}</ul>`;
}
