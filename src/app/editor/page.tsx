import type { Metadata } from "next";
import { EditorShell } from "@/components/editor/editor-shell";

export const metadata: Metadata = {
  title: "Editör",
};

export default function EditorPage() {
  return <EditorShell />;
}
