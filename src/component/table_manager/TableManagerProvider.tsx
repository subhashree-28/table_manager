import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { Data, Table_Tab, TableManagerContextProps } from "./types";
import { reducer } from "./tableReducer";
import { initialState } from "./config";

export const TableManagerContext =
  createContext<TableManagerContextProps | null>(null);

export default function TableManagerProvider(props: PropsWithChildren) {
  const { children } = props;

  const [state, dispatch] = useReducer(reducer, initialState);

  const setSelectRow = (id: number) => {
    dispatch({ type: "set_checked", payload: id });
  };

  const setDeleteRow = (id: number) => {
    dispatch({ type: "remove_data", payload: id });
  };

  const setAddData = (newItem: Data) => {
    dispatch({ type: "add_data", payload: newItem });
  };

  const setTableAction = (actionType: Table_Tab) => {
    dispatch({ type: "table_tab", payload: actionType });
  };

  const setSelect = (opt: boolean) => {
    dispatch({ type: "delete_data", payload: opt });
  };

  const memoizedValue = useMemo(
    () => ({
      data: state.data,
      new_data: state.new_data,
      checkedId: state.checkedId,
      table_tab: state.table_tab,
      setTableAction,
      setSelectRow,
      setDeleteRow,
      setAddData,
      setSelect,
    }),
    [state, dispatch]
  );

  return (
    <TableManagerContext.Provider value={memoizedValue}>
      {children}
    </TableManagerContext.Provider>
  );
}

export const useTableManagerContext = () => {
  const context = useContext(TableManagerContext);
  if (!context) {
    throw new Error(`useContext must be used within a TableManagerProvider`);
  }
  return context;
};
