import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as Slot } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { x as cn } from "./router-D2txYF5L.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-0alL_lQG.js
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-display font-semibold select-none transition-[scale,background-color,color,box-shadow,opacity] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-45", {
	variants: {
		variant: {
			primary: "bg-primary text-primary-fg shadow-red",
			accent: "bg-accent text-accent-fg",
			ink: "bg-ink text-ink-fg",
			surface: "bg-surface text-fg shadow-card",
			ghost: "bg-transparent text-fg",
			outline: "bg-transparent text-fg shadow-card"
		},
		size: {
			sm: "h-9 px-3 text-sm rounded-[12px]",
			md: "h-11 px-4 text-sm rounded-[14px]",
			lg: "h-12 px-5 text-base rounded-[16px]",
			pill: "h-12 px-5 rounded-full text-sm",
			icon: "size-11 rounded-full"
		},
		press: {
			true: "active:not-disabled:scale-[0.96]",
			false: ""
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md",
		press: true
	}
});
function Button({ className, variant, size, static: isStatic, asChild, press, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			press: isStatic ? false : press ?? true
		}), className),
		...props
	});
}
//#endregion
export { Button as t };
