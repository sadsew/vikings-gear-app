import React from 'react';
import '../styles/MaterialsList.css';
import { itemsCounter } from '../../utils/itemsCounter';

export default (props) => {
  const itemsArray = [];
  const itemsCount = itemsCounter(props.items);
  for (let key in props.items) {
    itemsArray.push(
      <div key={key} className="materials-list">
        <div
          className={`materials-list-item ${props.actions.materialStyleClass([props.primary, props.secondary, key])}`}
          onClick={() => (
            props.actions.primaryPartClickHandler([props.primary, props.secondary, key], itemsCount)
          )}
        >
          <img src={`../images/${props.items[key].img}.png`} className="materials-img" alt={props.items[key].name[props.lang]}/>
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
      </div>
    );
  }
  return itemsArray;
}
