"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type Item = { id: string };

type ListSectionProps<T extends Item> = {
  items: T[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onChange: (id: string, patch: Partial<T>) => void;
  addLabel: string;
  emptyLabel: string;
  renderItem: (
    item: T,
    update: (patch: Partial<T>) => void,
  ) => React.ReactNode;
};

export function ListSection<T extends Item>({
  items,
  onAdd,
  onRemove,
  onChange,
  addLabel,
  emptyLabel,
  renderItem,
}: ListSectionProps<T>) {
  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground italic">{emptyLabel}</p>
      ) : (
        items.map((item, idx) => (
          <div key={item.id} className="space-y-3">
            {idx > 0 && <Separator />}
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 space-y-3">
                {renderItem(item, (patch) => onChange(item.id, patch))}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onRemove(item.id)}
                aria-label="Sil"
                className="text-destructive shrink-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))
      )}
      <Button type="button" variant="outline" size="sm" onClick={onAdd}>
        <Plus className="h-4 w-4" />
        {addLabel}
      </Button>
    </div>
  );
}
