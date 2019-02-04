import React from 'react';
import MaterialsList from './MaterialsList';
import '../styles/SecondaryPartList.css';
import { itemsCounter } from '../../utils/itemsCounter';

export default (props) => {
  const itemsArray = [];
  const itemsCount = itemsCounter(props.items);

  for (let key in props.items) {
    itemsArray.push(
      <div key={key} className="secondary-list">
        <div
          className={`secondary-list-item ${props.actions.secondaryStyleClass([props.primary, key])}`}
          onClick={() => props.actions.primaryPartClickHandler([props.primary, key], itemsCount)}
        >
          <img src={`../images/${props.items[key].img}.png`} className="secondary-img" alt={props.items[key].name[props.lang]}/>
          {props.items[key].name[props.lang]}
          {
            props.items[key].invader
            ? (
              <div className="secondary-list-item-inv">
                <img src={`../images/invaders/${props.items[key].invader.img}`} />
              </div>
            )
            : false
          }
        </div>
        {props.items[key].materials 
          ? <MaterialsList
              primary={props.primary}
              secondary={key}
              items={props.items[key].materials}
              actions={props.actions}
              lang={props.lang}
            />
          : false}
      </div>
    );
  }
  return itemsArray;
}
