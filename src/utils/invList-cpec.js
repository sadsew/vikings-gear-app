import { filter, uniqBy, sortBy } from 'lodash';

export default (gear, state) => {
  const gearList = [];
  const invadersList = [];
  const ubersList = [];
  const usualMatList = [];

  for (let a in gear) {
    for (let b in gear[a].parts) {
      for (let c in gear[a].parts[b].subparts) {
        let invader = gear[a].parts[b].subparts[c].invader
        if (!invader) {
          const invadersArr = [];
          const uberArr = [];
          for (let d in gear[a].parts[b].subparts[c].materials) {
            invadersArr.push(gear[a].parts[b].subparts[c].materials[d].invader);
            uberArr.push(gear[a].parts[b].subparts[c].materials[d].uber);
            if (gear[a].parts[b].subparts[c].materials[d].invader) {
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
        gearList.push({
          primary: b,
          secondary: c,
          invader: gear[a].parts[b].subparts[c].invader,
          uber: gear[a].parts[b].subparts[c].uber,
          material: c,
          materialItem: gear[a].parts[b].subparts[c]
        });
      }
    }
  }

  const invaderMaterialslList = [];

  gearList.map((item) => {
    if (!item.invader) return false;
    if (filter(state, { primary: item.primary, secondary: 'all' }).length !== 0) return false;
    if (filter(state, { primary: item.primary, secondary: item.secondary, material: 'all' }).length !== 0) return false;
    if (filter(state, { primary: item.primary, secondary: item.secondary, material: item.material }).length !== 0) return false;
    invadersList.push(item.invader);
    ubersList.push(item.uber);
    invaderMaterialslList.push(item.materialItem);
  })

  const usualList = [];

  usualMatList.map(item => {
    if (item.invader) return false;
    if (filter(state, { primary: 'all', secondary: 'all', material: 'all'}).length !== 0) return false;
    if (filter(state, { primary: item.primary, secondary: 'all', material: 'all'}).length !== 0) return false;
    if (filter(state, { primary: item.primary, secondary: item.secondary, material: 'all'}).length !== 0) return false;
    if (filter(state, { primary: item.primary, secondary: item.secondary, material: item.material}).length !== 0) return false;
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
