import React, { createContext, useState } from "react";

const AppContext = React.createContext(
    { isModal: false, setIsModal: () => { }, isNav: false, setIsNav: () => { } }
);

export default AppContext;