import { filter, uniqBy, sortBy } from 'lodash';

export default (gear, state) => {
  const gearList = [];
  const invadersList = [];
  const ubersList = [];
  const usualMatList = [];

  for (let a in gear) {
    for (let b in gear[a].parts) {
      if(gear[a].parts[b].materials) {
        for (let e in gear[a].parts[b].materials) {
          let invader = gear[a].parts[b].materials[e].invader;
          let uber = gear[a].parts[b].materials[e].uber;
          let usualMat = gear[a].parts[b].materials[e];
          if (invader) {
            gearList.push({
              primary: b,
              secondary: e,
              invader,
              uber,
              material: e,
              materialItem: gear[a].parts[b].materials[e]
            });
          } else {
            usualMatList.push({
              primary: b,
              secondary: e,
              usualMat,
              material: e,
              materialItem: gear[a].parts[b].materials[e]
            });
          }
        }
      }
      for (let c in gear[a].parts[b].subparts) {
        let invader = gear[a].parts[b].subparts[c].invader;
        if (gear[a].parts[b].subparts[c].subparts) {
          for (let csub in gear[a].parts[b].subparts[c].subparts) {
            for (let csubmat in gear[a].parts[b].subparts[c].subparts[csub].materials) {
              if (gear[a].parts[b].subparts[c].subparts[csub].materials[csubmat].invader) {
                gearList.push({
                  primary: b,
                  secondary: c,
                  subSecondary: csub,
                  invader: gear[a].parts[b].subparts[c].subparts[csub].materials[csubmat].invader,
                  uber: gear[a].parts[b].subparts[c].subparts[csub].materials[csubmat].uber,
                  material: csubmat,
                  materialItem: gear[a].parts[b].subparts[c].subparts[csub].materials[csubmat]
                });
              }
              if (!gear[a].parts[b].subparts[c].subparts[csub].materials[csubmat].invader) {
                usualMatList.push({
                  primary: b,
                  secondary: c,
                  subSecondary: csub,
                  usualMat: gear[a].parts[b].subparts[c].subparts[csub].materials[csubmat],
                  material: csubmat,
                  materialItem: gear[a].parts[b].subparts[c].subparts[csub].materials[csubmat]
                });
              }
            }
          }
        }
        if (!invader) {
          for (let d in gear[a].parts[b].subparts[c].materials) {
            if(gear[a].parts[b].subparts[c].materials[d].invader) {
              gearList.push({
                primary: b,
                secondary: c,
                invader: gear[a].parts[b].subparts[c].materials[d].invader,
                uber: gear[a].parts[b].subparts[c].materials[d].uber,
                material: d,
                materialItem: gear[a].parts[b].subparts[c].materials[d]
              });
            }
            if (!gear[a].parts[b].subparts[c].materials[d].invader) {
              if (!gear[a].parts[b].subparts[c].materials[d].invader) {
                usualMatList.push({
                  primary: b,
                  secondary: c,
                  usualMat: gear[a].parts[b].subparts[c].materials[d],
                  material: d,
                  materialItem: gear[a].parts[b].subparts[c].materials[d]
                });
              }
            }
          }
        }
      }
    }
  }

  const invaderMaterialslList = [];

  gearList.map(item => {
    if (!item.invader) return false;
    if (filter(state, { primary: 'all', secondary: 'all', subSecondary: 'all', material: 'all'}).length !== 0) return false;
    if (filter(state, { primary: item.primary, secondary: 'all', subSecondary: 'all', material: 'all'}).length !== 0) return false;
    if (filter(state, { primary: item.primary, secondary: item.secondary, subSecondary: 'all', material: 'all'}).length !== 0) return false;
    if (filter(state, { primary: item.primary, secondary: item.secondary, subSecondary: 'all', material: item.material}).length !== 0) return false;
    if (filter(state, { primary: item.primary, secondary: item.secondary, subSecondary: item.subSecondary, material: 'all'}).length !== 0) return false;
    if (filter(state, { primary: item.primary, secondary: item.secondary, subSecondary: item.subSecondary, material: item.material}).length !== 0) return false;
    invadersList.push(item.invader);
    ubersList.push(item.uber);
    invaderMaterialslList.push(item.materialItem);
  });

  const usualList = [];

  usualMatList.map(item => {
    if (item.invader) return false;
    if (filter(state, { primary: 'all', secondary: 'all', subSecondary: 'all', material: 'all'}).length !== 0) return false;
    if (filter(state, { primary: item.primary, secondary: 'all', subSecondary: 'all', material: 'all'}).length !== 0) return false;
    if (filter(state, { primary: item.primary, secondary: item.secondary, subSecondary: 'all', material: 'all'}).length !== 0) return false;
    if (filter(state, { primary: item.primary, secondary: item.secondary, subSecondary: 'all', material: item.material}).length !== 0) return false;
    if (filter(state, { primary: item.primary, secondary: item.secondary, subSecondary: item.subSecondary, material: 'all'}).length !== 0) return false;
    if (filter(state, { primary: item.primary, secondary: item.secondary, subSecondary: item.subSecondary, material: item.material}).length !== 0) return false;
    usualList.push(item.usualMat);
  });
  
  const unicInvList = sortBy(uniqBy(invadersList), 'name.ru');
  const unicUbersList = sortBy(uniqBy(ubersList), 'name.ru');
  const unicMatList = sortBy(uniqBy(usualList), 'name.ru');

  const isInvListDone = unicInvList.length === 0;
  const isMatListDone = unicMatList.length === 0;

  return {
    unicInvList,
    unicUbersList,
    unicMatList,
    invaderMaterialslList,
    isInvListDone,
    isMatListDone
  };
}
