import React, { useEffect, useState } from "react";

/**
 * Sets when and how flashmessage shows
 * 
 * @param {string} theme completes CSS with used style
 * @param {string} text text shown in flash message
 * @param {object} items when changes item (persons or invoices) because of creating, deleting or changing something in parent component
 * useEffect would be called.
 * @returns JSX with flash message
 */
export function FlashMessage({ theme, text, items}) {

  const [collapse, setCollapse] = useState("");

  useEffect(() => {
    setCollapse("");
    setTimeout(() => {setCollapse("collapse")},7500);

  },[items]);


  return  <div className={"alert alert-" + theme + " " + collapse}>{text}</div>;
}

export default FlashMessage;
