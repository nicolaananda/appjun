import API_URL from "@/config/apiUrl";
import { IBook } from "@/types/entity";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export const BookCard = ({ book }: { book: IBook }) => {
  return (
    <div className="bg-blue-200 border rounded-lg p-2 my-2 transform transition-transform hover:scale-105 hover:shadow-lg">
      <div>
        <img
          src={`${API_URL}/${book.file}`}
          width={800}
          height={800}
          className="rounded-lg"
          alt={book.name}
        />
        <div className="shadow bg-blue-100 flex flex-col items-center p-2 my-2 rounded-lg">
          <h3 className="text-lg font-semibold">{book.name}</h3>
          <p className="text-sm text-gray-700">{book.author}</p>
          <div className="p-1"></div>
          <div>
            <Link to={`/${book._id}`}>
              <Button size="sm" variant="outline" className="shadow">
                Pinjam
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
