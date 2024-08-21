import React from "react";
import TableManager from "./component/table_manager/TableManagerForm";
import TableManagerProvider, {
  TableManagerContext,
} from "./component/table_manager/TableManagerProvider";

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
