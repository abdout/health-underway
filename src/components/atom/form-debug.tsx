import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

/**
 * Renders a fixed overlay at the right side of the viewport displaying:
 *  - live form values (watch)
 *  - validation errors
 *  - dirty & touched fields
 *  - a quick copy-to-clipboard button
 *
 *  Only intended for local development.
 */
const FormDebug = () => {
  if (process.env.NODE_ENV === "production") return null;

  const { watch, formState } = useFormContext();
  const [json, setJson] = useState<string>("{}");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const subscription = watch((value) => {
      setJson(JSON.stringify(value, null, 2));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <aside className="my-8 w-full bg-neutral-900/90 text-green-300 text-xs p-4 overflow-auto rounded-md">
      <div className="flex items-center justify-between mb-2 text-white">
        <h3 className="font-semibold text-sm">Form Debugger</h3>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            navigator.clipboard.writeText(json).then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            });
          }}
          className="text-xs"
        >
          {copied ? "Copied" : "Copy values"}
        </Button>
      </div>
      <pre className="whitespace-pre-wrap break-words">{json}</pre>
      <hr className="my-4 border-gray-700" />
      <h4 className="font-medium text-white mb-1">Errors</h4>
      <pre className="whitespace-pre-wrap break-words text-red-300">
        {JSON.stringify(formState.errors, null, 2)}
      </pre>
      <hr className="my-4 border-gray-700" />
      <h4 className="font-medium text-white mb-1">Dirty Fields</h4>
      <pre className="whitespace-pre-wrap break-words">
        {JSON.stringify(formState.dirtyFields, null, 2)}
      </pre>
      <hr className="my-4 border-gray-700" />
      <h4 className="font-medium text-white mb-1">Touched Fields</h4>
      <pre className="whitespace-pre-wrap break-words">
        {JSON.stringify(formState.touchedFields, null, 2)}
      </pre>
    </aside>
  );
};

export default FormDebug; 