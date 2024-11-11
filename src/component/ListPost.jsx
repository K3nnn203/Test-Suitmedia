import { useState, useRef, useEffect } from "react";

const Dropdown = ({ options, selected, onSelect, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeDropdown);
    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center gap-2 bg-gray-100 text-black px-6 py-3 rounded-full shadow-lg focus:outline-none"
        aria-expanded={isOpen}
        aria-label={`${label} dropdown`}
      >
        <span>{selected}</span>
        <span className="w-3 h-3 border-b-2 border-r-2 border-black rotate-45 inline-block"></span>
      </button>

      {isOpen && (
        <ul className="absolute mt-2 w-48 bg-white shadow-lg rounded-md">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


const ItemCard = ({ item }) => {
  return (
    <div className="bg-white border rounded-lg shadow-lg p-4 flex flex-col h-[330px]">
      <img
        src={item.thumbnail}
        alt="thumbnail"
        className="w-full h-auto aspect-[16/9] object-cover mb-4"
        loading="lazy"
      />
      <h3 className="text-gray-600 text-sm">
        {item.date}
      </h3>
      <p className="text-lg font-semibold text-gray-800 line-clamp-3 mb-2 overflow-hidden text-ellipsis">{item.description}</p>
    </div>
  );
};

const Filter = ({ onSortChange, onItemsPerPageChange, currentSort, currentItemsPerPage }) => {
  const sortOptions = ["Newest", "Oldest"];
  const itemsPerPageOptions = [10, 20, 50];

  return (
    <div className="flex flex-row gap-[50%] w-full items-center justify-start">
      <div className="flex-shrink-0">
        <p>Showing 1 - 10 out of 100</p>
      </div>
      <div className="flex flex-row items-center gap-10">
        <div className="flex flex-row gap-4 items-center">
          <p>Show per page: </p>
          <Dropdown
            options={itemsPerPageOptions}
            selected={`${currentItemsPerPage}`}
            onSelect={onItemsPerPageChange}
            label="Items per page"
          />
        </div>
        <div className="flex flex-row gap-4 items-center">
          <p>Sort by: </p>
          <Dropdown
            options={sortOptions}
            selected={currentSort}
            onSelect={onSortChange}
            label="Sort"
          />
        </div>
      </div>
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex justify-center mt-10 mb-10">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="px-4 py-2 bg-gray-300 rounded-md"
    >
      Previous
    </button>
    <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="px-4 py-2 bg-gray-300 rounded-md"
    >
      Next
    </button>
  </div>
);


const ListPost = () => {
  const [posts, setPosts] = useState([]);
  const [currentSort, setCurrentSort] = useState("published_at");
  const [currentItemsPerPage, setCurrentItemsPerPage] = useState(10); 
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    const sort = currentSort === "published_at" ? "published_at" : "-published_at";
    // const apiUrl = `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${currentPage}&page[size]=${currentItemsPerPage}&sort=${sort}`;
    
    // const response = await fetch(apiUrl, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({})
    //   });

    const data = [
      {
        date: "5 September 2024",
        description: "Kenali Tingkatan Influencers Berdasarkan Jumlah Followers",
        thumbnail: "",
      },
      {
        date: "5 September 2024",
        description: "Jangan Asal Pilih Influencer, Berikut Cara Menyusun Strategi Influencer ...",
        thumbnail: "",
      },
      {
        date: "5 September 2024",
        description: "Jangan Asal Pilih Influencer, Berikut Cara Menyusun Strategi Influencer ...",
        thumbnail: "",
      },
      {
        date: "5 September 2024",
        description: "Jangan Asal Pilih Influencer, Berikut Cara Menyusun Strategi Influencer ...",
        thumbnail: "",
      },
    ];
    setPosts(data);
  };

  useEffect(() => {
    fetchData();
  }, [currentSort, currentItemsPerPage, currentPage]);

  const handleSortChange = (newSort) => setCurrentSort(newSort === "Newest" ? "published_at" : "-published_at");

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setCurrentItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(posts.length / currentItemsPerPage)) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <Filter
        onSortChange={handleSortChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        currentSort={currentSort === "published_at" ? "Newest" : "Oldest"}
        currentItemsPerPage={currentItemsPerPage}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {posts.map((item, index) => (
          <ItemCard key={index} item={item} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(posts.length / currentItemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

  

export { ListPost };
