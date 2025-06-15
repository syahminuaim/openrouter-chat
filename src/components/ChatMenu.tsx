
import React, { useState } from "react";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

type ChatMenuProps = {
  children: React.ReactNode;
  chatName: string;
  onRename: (newName: string) => void;
  onDelete: () => void;
};

export function ChatMenu({
  children,
  chatName,
  onRename,
  onDelete,
}: ChatMenuProps) {
  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [renameValue, setRenameValue] = useState(chatName);

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onSelect={() => setRenameOpen(true)}
          inset
        >
          <Pencil className="mr-2 h-4 w-4" />
          Rename
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          onSelect={() => setDeleteDialogOpen(true)}
          inset
          className="text-destructive focus:bg-destructive/20"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>

      {/* Rename Dialog */}
      {renameOpen && (
        <AlertDialog open={renameOpen} onOpenChange={setRenameOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Rename Chat</AlertDialogTitle>
              <AlertDialogDescription>
                Enter a new name for this chat.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <input
              className="w-full rounded-md border p-2 text-sm mt-2"
              autoFocus
              value={renameValue}
              maxLength={64}
              onChange={e => setRenameValue(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  if (renameValue.trim()) {
                    onRename(renameValue.trim());
                    setRenameOpen(false);
                  }
                }
              }}
            />
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                disabled={!renameValue.trim()}
                onClick={() => {
                  if (renameValue.trim()) {
                    onRename(renameValue.trim());
                    setRenameOpen(false);
                  }
                }}
              >Rename</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Delete Dialog */}
      {deleteDialogOpen && (
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Chat</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this chat? This cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                onClick={() => {
                  onDelete();
                  setDeleteDialogOpen(false);
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </ContextMenu>
  );
}

