import React from "react";
import TableManager from "./component/Table_manger/TableManagerForm";
import TableManagerProvider, {
  TableManagerContext,
} from "./component/Table_manger/TableManagerProvider";

function App() {
  return (
    <div className="App">
      <TableManagerProvider>
        <TableManager />
      </TableManagerProvider>
    </div>
  );
}

export default App;
