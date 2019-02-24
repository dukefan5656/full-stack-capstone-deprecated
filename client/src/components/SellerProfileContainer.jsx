import React from 'react';

function renderEntries(entries){
  console.log(entries);
  return <p key={1}>{entries}</p>;
};

export default function Listing({entries, loaded}) {

  

  return <div>{renderEntries(entries)}</div>
}