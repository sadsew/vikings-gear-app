import React from 'react';
import SecondaryPartList from './SecondaryPartList';
import '../styles/MaterialsList.css';

export default (props) => {
  const itemsArray = [];
  for (let key in props.items) {
    itemsArray.push(
      <div key={key} className="primary-list">
        <div
          className={`primary-list-item ${props.actions.primaryStyleClass([key])}`}
          onClick={() => props.actions.primaryPartClickHandler([key])}
        >
          <img src={`../images/${props.items[key].img}.png`} className="primary-img" alt={props.items[key].name[props.lang]}/>
          {props.items[key].name[props.lang]}
        </div>
        <SecondaryPartList 
          primary={key}
          items={props.items[key].subparts}
          actions={props.actions}
          lang={props.lang}
        />
      </div>
    );
  }
  return itemsArray;
}
