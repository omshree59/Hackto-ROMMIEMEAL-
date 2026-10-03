import React from "react";
import { CompatibilityReport, RestrictionSeverity } from "@/types";
import { AlertTriangle, CheckCircle, ShieldAlert, Info } from "lucide-react";

export function CompatibilityBadge({ report, size = "md" }: { report: CompatibilityReport; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-[11px] font-medium",
    md: "px-2.5 py-1 text-xs font-semibold",
    lg: "px-3 py-1.5 text-sm font-semibold",
  };

  if (report.status === "green") {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full bg-app-green/10 text-app-green border border-app-green/20 shadow-sm ${sizeClasses[size]}`}
        title="No listed conflicts detected with current roommate profiles"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-app-green animate-pulse" />
        <CheckCircle className="w-3.5 h-3.5" />
        <span>No listed conflicts detected</span>
      </span>
    );
  }

  if (report.status === "yellow") {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full bg-app-yellow/10 text-app-yellow border border-app-yellow/20 shadow-sm ${sizeClasses[size]}`}
        title="Can be adapted using substitutions"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-app-yellow" />
        <AlertTriangle className="w-3.5 h-3.5" />
        <span>Modification suggested</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-app-red/10 text-app-red border border-app-red/20 shadow-sm ${sizeClasses[size]}`}
      title="Conflict with listed roommate allergies or diet"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-app-red" />
      <ShieldAlert className="w-3.5 h-3.5" />
      <span>Allergy conflict</span>
    </span>
  );
}

export function RestrictionSeverityBadge({ type }: { type: RestrictionSeverity }) {
  if (type === "allergy") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-app-red/10 text-app-red border border-app-red/20">
        <span>ALLERGY</span>
      </span>
    );
  }
  if (type === "intolerance") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-app-yellow/10 text-app-yellow border border-app-yellow/20">
        <span>INTOLERANCE</span>
      </span>
    );
  }
  if (type === "dislike") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-app-surface text-stone-400 border border-app-border">
        <span>DISLIKE</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-app-surface text-stone-400 border border-app-border">
      <span>DIETARY</span>
    </span>
  );
}

export function SafetyDisclaimerNotice() {
  return (
    <div className="rounded-xl border border-app-border bg-app-surface p-3 text-xs text-stone-400 flex items-start gap-2.5">
      <Info className="w-4 h-4 text-stone-500 mt-0.5 shrink-0" />
      <div className="space-y-0.5">
        <p className="font-semibold text-stone-300">ⓘ Allergy reminder</p>
        <p className="leading-relaxed text-[11px]">
          Always check physical package labels before cooking.
        </p>
      </div>
    </div>
  );
}
