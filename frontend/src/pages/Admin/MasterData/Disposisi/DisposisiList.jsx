import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from 'react-router-dom';
import { FilePlus2, Search } from "lucide-react";
import DisposisiTable from "./DisposisiTable";

export default function DisposisiList({ apiUrl }) {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex">
        <h1 className="text-lg font-semibold md:text-2xl">Disposisi</h1>
      </div>
      <div className="flex flex-1 p-4 rounded-lg border border-dashed shadow-sm w-full">
        <div className="flex flex-col gap-1 w-full">
          <div className="flex flex-row gap-1 w-full">
            <Link to="/disposisi/add-disp">
              <Button variant="outline" className="flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-primary hover:text-foreground hover:bg-blue-600 hover:text-white transition transform hover:scale-105 hover:shadow-lg">
                <FilePlus2 className="h-4 w-4" /> Add
              </Button>
            </Link>
            <div className="relative w-full flex justify-end">
              <div className="relative ml-auto flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                  // value={searchTerm}
                  // onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DisposisiTable apiUrl={apiUrl} />
          {/* <PaginationControls
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
          /> */}
        </div>
      </div>
    </main>
  );
}
