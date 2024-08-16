import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { Data, TableManagerContextProps } from "./types";
import { reducer } from "./TableReducer";
import { initialState } from "./config";

export const TableManagerContext = createContext<TableManagerContextProps | null>(null);

export default function TableManagerProvider(props: PropsWithChildren) {
  const { children } = props;

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCheck = (index: number) => {
    dispatch({ type: "set_completed", payload: index });
  };

  const handleDelete = (id: number) => {
    dispatch({ type: "delete", payload: id });
  };

  const handleAddItem = (newItem: Data) => {
    dispatch({ type: "add_item", payload: newItem });
  };

  const handleAdd = () => {
    dispatch({ type: "add" });
  };

  const handleDetails = () => {
    dispatch({ type: "display_details" });
  };

  const handleLog = () => {
    dispatch({ type: "log" });
  };
  const handleDeleted = () => {
    dispatch({ type: "deleted_item" });
  };

  const handleYes = () => {
    dispatch({ type: "delete_if_yes" });
  };

  const handleNo = () => {
    dispatch({ type: "notdelete_if_no" });
  };

  const memoizedValue = useMemo(
    () => ({
      data: state,
      handleCheck,
      handleDelete,
      handleAdd,
      handleAddItem,
      handleDetails,
      handleLog,
      handleDeleted,
      handleYes,
      handleNo,
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
    throw new Error(`useContext must be used within a TodoProvider`);
  }
  return context;
};

