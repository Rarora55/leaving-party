import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/app/AppRouter.tsx");import { BrowserRouter, Navigate, Route, Routes } from "/node_modules/.vite/deps/react-router-dom.js?v=3374cea7";
import { AppShell } from "/src/app/AppShell.tsx";
import { GuestListPage } from "/src/pages/GuestListPage/GuestListPage.tsx?t=1775754937755";
import { HomePage } from "/src/pages/HomePage/HomePage.tsx?t=1775755182157";
import { MessagesPage } from "/src/pages/MessagesPage/MessagesPages.tsx?t=1775754937755";
import { NAV_ITEMS } from "/src/shared/constants/navigation.constants.ts";
var _jsxFileName = "C:/Users/Ramwi/Desktop/WeAreLeaving/Leaving-Party/src/app/AppRouter.tsx";
import __vite__cjsImport6_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3374cea7"; const _jsxDEV = __vite__cjsImport6_react_jsxDevRuntime["jsxDEV"];
function withShell(element) {
	return /* @__PURE__ */ _jsxDEV(AppShell, { children: element }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 10,
		columnNumber: 10
	}, this);
}
export function AppRouter() {
	const [homeRoute, rsvpRoute, messagesRoute] = NAV_ITEMS;
	return /* @__PURE__ */ _jsxDEV(BrowserRouter, { children: /* @__PURE__ */ _jsxDEV(Routes, { children: [
		/* @__PURE__ */ _jsxDEV(Route, {
			path: homeRoute.path,
			element: withShell(/* @__PURE__ */ _jsxDEV(HomePage, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 19,
				columnNumber: 57
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 19,
			columnNumber: 9
		}, this),
		/* @__PURE__ */ _jsxDEV(Route, {
			path: rsvpRoute.path,
			element: withShell(/* @__PURE__ */ _jsxDEV(GuestListPage, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 20,
				columnNumber: 57
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 20,
			columnNumber: 9
		}, this),
		/* @__PURE__ */ _jsxDEV(Route, {
			path: messagesRoute.path,
			element: withShell(/* @__PURE__ */ _jsxDEV(MessagesPage, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 21,
				columnNumber: 61
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 21,
			columnNumber: 9
		}, this),
		/* @__PURE__ */ _jsxDEV(Route, {
			path: "/guest-list",
			element: /* @__PURE__ */ _jsxDEV(Navigate, {
				to: rsvpRoute.path,
				replace: true
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 22,
				columnNumber: 44
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 22,
			columnNumber: 9
		}, this),
		/* @__PURE__ */ _jsxDEV(Route, {
			path: "/messages",
			element: /* @__PURE__ */ _jsxDEV(Navigate, {
				to: messagesRoute.path,
				replace: true
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 23,
				columnNumber: 42
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 23,
			columnNumber: 9
		}, this),
		/* @__PURE__ */ _jsxDEV(Route, {
			path: "*",
			element: /* @__PURE__ */ _jsxDEV(Navigate, {
				to: homeRoute.path,
				replace: true
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 24,
				columnNumber: 34
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 24,
			columnNumber: 9
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 18,
		columnNumber: 7
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 17,
		columnNumber: 5
	}, this);
}
_c = AppRouter;
var _c;
$RefreshReg$(_c, "AppRouter");
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
import * as __vite_react_currentExports from "/src/app/AppRouter.tsx?t=1775755182157";
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }

  const currentExports = __vite_react_currentExports;
  queueMicrotask(() => {
    RefreshRuntime.registerExportsForReactRefresh("C:/Users/Ramwi/Desktop/WeAreLeaving/Leaving-Party/src/app/AppRouter.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("C:/Users/Ramwi/Desktop/WeAreLeaving/Leaving-Party/src/app/AppRouter.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
function $RefreshReg$(type, id) { return RefreshRuntime.register(type, "C:/Users/Ramwi/Desktop/WeAreLeaving/Leaving-Party/src/app/AppRouter.tsx" + ' ' + id); }
function $RefreshSig$() { return RefreshRuntime.createSignatureFunctionForTransform(); }

//# sourceMappingURL=data:application/json;base64,eyJtYXBwaW5ncyI6IkFBQ0EsU0FBUyxlQUFlLFVBQVUsT0FBTyxjQUFjO0FBQ3ZELFNBQVMsZ0JBQWdCO0FBQ3pCLFNBQVMscUJBQXFCO0FBQzlCLFNBQVMsZ0JBQWdCO0FBQ3pCLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsaUJBQWlCOzs7QUFFMUIsU0FBUyxVQUFVLFNBQW9CO0FBQ3JDLFFBQU8sd0JBQUMsVUFBRCxZQUFXLFNBQW1COzs7Ozs7QUFHdkMsT0FBTyxTQUFTLFlBQVk7Q0FDMUIsTUFBTSxDQUFDLFdBQVcsV0FBVyxpQkFBaUI7QUFFOUMsUUFDRSx3QkFBQyxlQUFELFlBQ0Usd0JBQUMsUUFBRDtFQUNFLHdCQUFDLE9BQUQ7R0FBTyxNQUFNLFVBQVU7R0FBTSxTQUFTLFVBQVUsd0JBQUMsVUFBRCxFQUFZOzs7O1lBQUM7R0FBSTs7Ozs7RUFDakUsd0JBQUMsT0FBRDtHQUFPLE1BQU0sVUFBVTtHQUFNLFNBQVMsVUFBVSx3QkFBQyxlQUFELEVBQWlCOzs7O1lBQUM7R0FBSTs7Ozs7RUFDdEUsd0JBQUMsT0FBRDtHQUFPLE1BQU0sY0FBYztHQUFNLFNBQVMsVUFBVSx3QkFBQyxjQUFELEVBQWdCOzs7O1lBQUM7R0FBSTs7Ozs7RUFDekUsd0JBQUMsT0FBRDtHQUFPLE1BQUs7R0FBYyxTQUFTLHdCQUFDLFVBQUQ7SUFBVSxJQUFJLFVBQVU7SUFBTTtJQUFVOzs7OztHQUFJOzs7OztFQUMvRSx3QkFBQyxPQUFEO0dBQU8sTUFBSztHQUFZLFNBQVMsd0JBQUMsVUFBRDtJQUFVLElBQUksY0FBYztJQUFNO0lBQVU7Ozs7O0dBQUk7Ozs7O0VBQ2pGLHdCQUFDLE9BQUQ7R0FBTyxNQUFLO0dBQUksU0FBUyx3QkFBQyxVQUFEO0lBQVUsSUFBSSxVQUFVO0lBQU07SUFBVTs7Ozs7R0FBSTs7Ozs7RUFDOUQ7Ozs7V0FDSyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJBcHBSb3V0ZXIudHN4Il0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgUmVhY3ROb2RlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQnJvd3NlclJvdXRlciwgTmF2aWdhdGUsIFJvdXRlLCBSb3V0ZXMgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCB7IEFwcFNoZWxsIH0gZnJvbSAnLi9BcHBTaGVsbCc7XG5pbXBvcnQgeyBHdWVzdExpc3RQYWdlIH0gZnJvbSAnLi4vcGFnZXMvR3Vlc3RMaXN0UGFnZS9HdWVzdExpc3RQYWdlJztcbmltcG9ydCB7IEhvbWVQYWdlIH0gZnJvbSAnLi4vcGFnZXMvSG9tZVBhZ2UvSG9tZVBhZ2UnO1xuaW1wb3J0IHsgTWVzc2FnZXNQYWdlIH0gZnJvbSAnLi4vcGFnZXMvTWVzc2FnZXNQYWdlL01lc3NhZ2VzUGFnZXMnO1xuaW1wb3J0IHsgTkFWX0lURU1TIH0gZnJvbSAnLi4vc2hhcmVkL2NvbnN0YW50cy9uYXZpZ2F0aW9uLmNvbnN0YW50cyc7XG5cbmZ1bmN0aW9uIHdpdGhTaGVsbChlbGVtZW50OiBSZWFjdE5vZGUpIHtcbiAgcmV0dXJuIDxBcHBTaGVsbD57ZWxlbWVudH08L0FwcFNoZWxsPjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEFwcFJvdXRlcigpIHtcbiAgY29uc3QgW2hvbWVSb3V0ZSwgcnN2cFJvdXRlLCBtZXNzYWdlc1JvdXRlXSA9IE5BVl9JVEVNUztcblxuICByZXR1cm4gKFxuICAgIDxCcm93c2VyUm91dGVyPlxuICAgICAgPFJvdXRlcz5cbiAgICAgICAgPFJvdXRlIHBhdGg9e2hvbWVSb3V0ZS5wYXRofSBlbGVtZW50PXt3aXRoU2hlbGwoPEhvbWVQYWdlIC8+KX0gLz5cbiAgICAgICAgPFJvdXRlIHBhdGg9e3JzdnBSb3V0ZS5wYXRofSBlbGVtZW50PXt3aXRoU2hlbGwoPEd1ZXN0TGlzdFBhZ2UgLz4pfSAvPlxuICAgICAgICA8Um91dGUgcGF0aD17bWVzc2FnZXNSb3V0ZS5wYXRofSBlbGVtZW50PXt3aXRoU2hlbGwoPE1lc3NhZ2VzUGFnZSAvPil9IC8+XG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiL2d1ZXN0LWxpc3RcIiBlbGVtZW50PXs8TmF2aWdhdGUgdG89e3JzdnBSb3V0ZS5wYXRofSByZXBsYWNlIC8+fSAvPlxuICAgICAgICA8Um91dGUgcGF0aD1cIi9tZXNzYWdlc1wiIGVsZW1lbnQ9ezxOYXZpZ2F0ZSB0bz17bWVzc2FnZXNSb3V0ZS5wYXRofSByZXBsYWNlIC8+fSAvPlxuICAgICAgICA8Um91dGUgcGF0aD1cIipcIiBlbGVtZW50PXs8TmF2aWdhdGUgdG89e2hvbWVSb3V0ZS5wYXRofSByZXBsYWNlIC8+fSAvPlxuICAgICAgPC9Sb3V0ZXM+XG4gICAgPC9Ccm93c2VyUm91dGVyPlxuICApO1xufVxuIl19
