import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { ReducerState, ReducerDispatch } from "../reducers/index";

// Typed hooks
export const useAppDispatch = () => useDispatch<ReducerDispatch>();
export const useAppSelector: TypedUseSelectorHook<ReducerState> = useSelector;
