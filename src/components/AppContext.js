import React, { createContext, useState } from "react";

 const AppContext = React.createContext({ isModal: false, setIsModal: () => { } });

export default AppContext;