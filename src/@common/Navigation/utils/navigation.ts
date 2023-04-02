import { createRef, RefObject } from "react";

export const navigationRef: RefObject<any> = createRef();

export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

export function goBack() {
  navigationRef.current?.goBack();
}
