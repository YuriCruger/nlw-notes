import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { XIcon } from "lucide-react";

interface NoteCardProps {
  note: {
    id: number;
    created_at: string;
    content: string;
  };
  deleteNote: (noteId: number) => void;
}

export const NoteCard = ({ note, deleteNote }: NoteCardProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex flex-col rounded-md bg-slate-800 text-left p-5 gap-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-300">
          {formatDistanceToNow(note.created_at, {
            locale: ptBR,
            addSuffix: true,
          })}
        </span>
        <p className="text-sm leading-6 text-slate-400">{note.content}</p>
        <div className="absolute bottom-0 right-0 left-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content className="fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] md:h-[60vh] w-full bg-slate-700 outline-none md:rounded-md flex flex-col overflow-hidden">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <XIcon size={20} />
          </Dialog.Close>
          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className="text-sm font-medium text-slate-300">
              {formatDistanceToNow(note.created_at, {
                locale: ptBR,
                addSuffix: true,
              })}
            </span>
            <p className="text-sm leading-6 text-slate-400">{note.content}</p>
          </div>

          <button
            onClick={() => deleteNote(note.id)}
            type="button"
            className="w-full bg-slate-800 py-4 text-sm text-slate-300 outline-none font-medium group"
          >
            Deseja{" "}
            <span className="text-red-400 group-hover:underline">
              apagar essa nota
            </span>
            ?
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
