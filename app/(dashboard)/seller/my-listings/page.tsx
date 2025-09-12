import ArtworkCards from "./_components/artwork-cards";
import { ArtworkFormDialog } from "./_components/artwork-form-dialog";

export default function page() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Foods List</h1>
        <ArtworkFormDialog />
      </div>
      <ArtworkCards />
    </div>
  );
}
