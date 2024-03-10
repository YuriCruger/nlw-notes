import { ChangeEvent, useEffect, useState } from "react";
import { NewNoteCard } from "../../components/new-note-card";
import { NoteCard } from "../../components/note-card";
import { toast } from "sonner";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/auth";
import { LogOutIcon, NotebookPenIcon } from "lucide-react";

type Note = {
  id: number;
  created_at: string;
  content: string;
};

export default function Notes() {
  const [search, setSearch] = useState("");
  const [noteUpdated, setNoteUpdated] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const { token, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  const newNote = async (content: string) => {
    try {
      const response = await api.post("/notes", {
        content: content,
        created_at: new Date().toISOString(),
      });

      api.defaults.headers.authorization = `Bearer ${token}`;

      if (response.status >= 200 && response.status < 300) {
        toast.success("Nota criada com sucesso!");
        setNoteUpdated((prevState) => !prevState);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "Ocorreu um erro ao tentar adicionar a nota. Por favor, tente novamente."
      );
    }
  };

  const deleteNote = async (noteId: number) => {
    try {
      const response = await api.delete("/notes", { data: { id: noteId } });

      if (response.status >= 200 && response.status < 300) {
        toast.success("Nota deletada com sucesso");
        setNoteUpdated((prevState) => !prevState);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "Ocorreu um erro ao tentar deletar a nota. Por favor, tente novamente."
      );
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get("/notes");
        setNotes(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchNotes();
  }, [noteUpdated]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearch(query);
  };

  const filteredNotes =
    search !== ""
      ? notes.filter((note) =>
          note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : notes;

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <NotebookPenIcon />
          <h1 className="font-bold text-3xl">Notes</h1>
        </div>

        <div className="flex gap-2">
          <p>Sair</p>

          <button onClick={handleSignOut}>
            <LogOutIcon />
          </button>
        </div>
      </div>
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none"
          onChange={handleSearch}
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-6">
        <NewNoteCard newNote={newNote} />
        {filteredNotes
          .slice()
          .reverse()
          .map((note) => {
            return (
              <NoteCard key={note.id} note={note} deleteNote={deleteNote} />
            );
          })}
      </div>
    </div>
  );
}
